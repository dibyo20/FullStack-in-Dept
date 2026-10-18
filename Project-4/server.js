const app = require('./src/app.js');
const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

const tickets = {};
let ticketCounter = 1;
let customerCounter = 1;
let agentCounter = 1;
let adminCounter = 1;

// Authentication (Helper)
function authenticateSocket(socket, requiredRole) {
    const token = socket.handshake.headers.authorization;

    if (!token) {
        return { error: "Authentication failed: Missing Authorization token." };
    }

    let user = null;

    if (token === "Bearer customer-token") {
        user = { id: `customer_${customerCounter++}`, role: "customer" };
    } else if (token === "Bearer agent-token") {
        user = { id: `agent_${agentCounter++}`, role: "agent" };
    } else if (token === "Bearer admin-token") {
        user = { id: `admin_${adminCounter++}`, role: "admin" };
    } else if (typeof token === "string" && token.startsWith("Bearer customer-")) {
        user = { id: token.replace("Bearer ", ""), role: "customer" };
    } else if (typeof token === "string" && token.startsWith("Bearer agent-")) {
        user = { id: token.replace("Bearer ", ""), role: "agent" };
    } else if (typeof token === "string" && token.startsWith("Bearer admin-")) {
        user = { id: token.replace("Bearer ", ""), role: "admin" };
    } else {
        return { error: "Authentication failed: Invalid Authorization token." };
    }

    if (!user) {
        return { error: "Authentication failed: Invalid Authorization token." };
    }

    if (requiredRole && user.role !== requiredRole) {
        return { error: "Authentication failed: Invalid Authorization token." };
    }

    return { user };
}

function sendAck(callback, data) {
    if (callback) {
        callback(data);
    }
}

const customerNS = io.of("/customer");
const agentNS = io.of("/agent");
const adminNS = io.of("/admin");

// Middleware for Authentication
customerNS.use((socket, next) => {
    const auth = authenticateSocket(socket, "customer");
    if (auth.error) {
        console.log("Customer Auth Rejected ", auth.error);
        return next(new Error(auth.error));
    }
    socket.data.user = auth.user;
    next();
});

agentNS.use((socket, next) => {
    const auth = authenticateSocket(socket, "agent");
    if (auth.error) {
        console.log("Agent Auth Rejected ", auth.error);
        return next(new Error(auth.error));
    }
    socket.data.user = auth.user;
    next();
});

adminNS.use((socket, next) => {
    const auth = authenticateSocket(socket, "admin");
    if (auth.error) {
        console.log("Admin Auth Rejected ", auth.error);
        return next(new Error(auth.error));
    }
    socket.data.user = auth.user;
    next();
});

// Namespace Connections:
customerNS.on("connection", (socket) => {
    console.log(`Customer connected: ${socket.data.user.id} (${socket.id})`);

    // Create Ticket
    socket.on("ticket:create", (data, callback) => {
        if (!data || typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const subject = typeof data.subject === "string" ? data.subject.trim() : null;
        const description = typeof data.description === "string" ? data.description.trim() : null;

        if (!subject) {
            return sendAck(callback, {
                success: false,
                error: "Subject is required.",
            });
        }

        if (!description) {
            return sendAck(callback, {
                success: false,
                error: "Description is required.",
            });
        }

        const ticketId = `TICKET-${ticketCounter++}`;
        const newTicket = {
            id: ticketId,
            subject,
            description,
            customerId: socket.data.user.id,
            customerSocketId: socket.id,
            agentId: null,
            agentSocketId: null,
            status: "open",
            createdAt: new Date().toISOString(),
            message: [],
        };

        tickets[ticketId] = newTicket;

        socket.join(`ticket:${ticketId}`);

        agentNS.to("agents").emit("ticket:available", {
            ticketId: newTicket.id,
            subject: newTicket.subject,
            description: newTicket.description,
            customerId: newTicket.customerId,
            createdAt: newTicket.createdAt,
        });

        sendAck(callback, {
            success: true,
            message: "Ticket created successfully.",
            ticketId: newTicket.id,
            ticket: newTicket,
        });
    });

    // Ticket Message
    socket.on("ticket:message", (data, callback) => {
        if (!data || typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const ticket = tickets[data.ticketId];
        if (!ticket) {
            return sendAck(callback, { success: false, error: "Ticket not found." });
        }

        if (ticket.customerId !== socket.data.user.id) {
            return sendAck(callback, {
                success: false,
                error: "You are not authorized to send messages for this ticket.",
            });
        }

        const messageText =
            typeof data.message === "string" ? data.message.trim() : null;

        if (!messageText) {
            return sendAck(callback, {
                success: false,
                error: "Message cannot be empty.",
            });
        }

        const messagePayload = {
            ticketId: ticket.id,
            senderId: socket.data.user.id,
            role: socket.data.user.role,
            message: messageText,
            timestamp: new Date().toISOString(),
        };

        ticket.message.push(messagePayload);

        customerNS.to(`ticket:${ticket.id}`).emit("ticket:message", messagePayload);
        agentNS.to(`ticket:${ticket.id}`).emit("ticket:message", messagePayload);

        sendAck(callback, {
            success: true,
            message: "Message sent successfully.",
            timestamp: messagePayload.timestamp,
        });
    });

    // Customer -> Assigned Agent Only
    socket.on("ticket:private-reply", (data, callback) => {
        if (!data || typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const ticket = tickets[data.ticketId];
        if (!ticket) {
            return sendAck(callback, { success: false, error: "Ticket not found." });
        }

        if (ticket.customerId !== socket.data.user.id) {
            return sendAck(callback, {
                success: false,
                error: "You are not authorized to send messages for this ticket.",
            });
        }

        if (!ticket.agentSocketId) {
            return sendAck(callback, {
                success: false,
                error: "No agent assigned to this ticket.",
            });
        }

        const messageText =
            typeof data.message === "string" ? data.message.trim() : null;
        if (!messageText) {
            return sendAck(callback, {
                success: false,
                error: "Message cannot be empty.",
            });
        }

        const replyPayload = {
            ticketId: ticket.id,
            senderId: socket.data.user.id,
            role: socket.data.user.role,
            message: messageText,
            isPrivate: true,
            timestamp: new Date().toISOString(),
        };

        agentNS.to(ticket.agentSocketId).emit("ticket:private-reply", replyPayload);

        sendAck(callback, {
            success: true,
            message: "Private reply sent to agent.",
            timestamp: replyPayload.timestamp,
        });
    });

    // Ticket History
    socket.on("ticket:history", (data, callback) => {
        if (!data || typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const ticket = tickets[data.ticketId];
        if (!ticket) {
            return sendAck(callback, { success: false, error: "Ticket not found." });
        }

        if (ticket.customerId !== socket.data.user.id) {
            return sendAck(callback, {
                success: false,
                error: "You are not authorized to view this ticket's history.",
            });
        }

        sendAck(callback, { success: true, ticket: ticket });
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log(`Customer disconnected: ${socket.data.user.id}`);
        Object.values(tickets).forEach((ticket) => {
            if (ticket.customerSocketId === socket.id) {
                ticket.customerSocketId = null;
            }
        });
    });
});

agentNS.on("connection", (socket) => {
    console.log(`Agent connected: ${socket.data.user.id} (${socket.id})`);

    socket.join("agents");

    // Claim Ticket
    socket.on("ticket:claim", (data, callback) => {
        if (!data || typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const ticket = tickets[data.ticketId];
        if (!ticket) {
            return sendAck(callback, { success: false, error: "Ticket not found." });
        }

        if (ticket.status !== "open") {
            return sendAck(callback, {
                success: false,
                error: `Ticket is already claimed by ${ticket.agentId || "another agent"}.`,
            });
        }

        ticket.status = "claimed";
        ticket.agentId = socket.data.user.id;
        ticket.agentSocketId = socket.id;

        socket.join(`ticket:${ticket.id}`);

        const claimedPayload = {
            ticketId: ticket.id,
            agentId: socket.data.user.id,
            status: "claimed",
            claimedAt: new Date().toISOString(),
        };

        customerNS.to(`ticket:${ticket.id}`).emit("ticket:claimed", claimedPayload);
        agentNS.to(`ticket:${ticket.id}`).emit("ticket:claimed", claimedPayload);

        sendAck(callback, {
            success: true,
            message: "Ticket claimed successfully.",
            ticketId: ticket.id,
        });
    });

    // Ticket Message
    socket.on("ticket:message", (data, callback) => {
        if (typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const ticket = tickets[data.ticketId];
        if (!ticket) {
            return sendAck(callback, { success: false, error: "Ticket not found." });
        }

        if (ticket.agentId !== socket.data.user.id) {
            return sendAck(callback, {
                success: false,
                error: "You are not authorized to send messages for this ticket.",
            });
        }

        const messageText =
            typeof data.message === "string" ? data.message.trim() : null;
        if (!messageText) {
            return sendAck(callback, {
                success: false,
                error: "Message cannot be empty.",
            });
        }

        const messagePayload = {
            ticketId: ticket.id,
            senderId: socket.data.user.id,
            role: socket.data.user.role,
            message: messageText,
            timestamp: new Date().toISOString(),
        };

        ticket.message.push(messagePayload);

        customerNS.to(`ticket:${ticket.id}`).emit("ticket:message", messagePayload);
        agentNS.to(`ticket:${ticket.id}`).emit("ticket:message", messagePayload);

        sendAck(callback, {
            success: true,
            message: "Message sent successfully.",
            messagePayload,
        });
    });

    // Private Reply to Customer
    socket.on("ticket:private-reply", (data, callback) => {
        if (!data || typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const ticket = tickets[data.ticketId];
        if (!ticket) {
            return sendAck(callback, { success: false, error: "Ticket not found." });
        }

        if (ticket.agentId !== socket.data.user.id) {
            return sendAck(callback, {
                success: false,
                error: "You are not authorized to send messages for this ticket.",
            });
        }

        const messageText = data.messageText;
        if (!messageText) {
            return sendAck(callback, {
                success: false,
                error: "Message cannot be empty.",
            });
        }

        const replyPayload = {
            ticketId: ticket.id,
            senderId: socket.data.user.id,
            role: socket.data.user.role,
            message: messageText,
            isPrivate: true,
            timestamp: new Date().toISOString(),
        };

        customerNS
            .to(ticket.customerSocketId)
            .emit("ticket:private-reply", replyPayload);

        sendAck(callback, {
            success: true,
            message: "Private reply sent to customer.",
            timestamp: replyPayload.timestamp,
        });
    });

    // Ticket Close
    socket.on("ticket:close", (data, callback) => {
        if (!data || typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const ticket = tickets[data.ticketId];
        if (!ticket) {
            return sendAck(callback, { success: false, error: "Ticket not found." });
        }

        if (ticket.agentId !== socket.data.user.id) {
            return sendAck(callback, {
                success: false,
                error: "You are not authorized to close this ticket.",
            });
        }

        ticket.status = "closed";

        const closedPayload = {
            ticketId: ticket.id,
            closedBy: socket.data.user.id,
            timestamp: new Date().toISOString(),
        };

        customerNS.to(`ticket:${ticket.id}`).emit("ticket:closed", closedPayload);
        agentNS.to(`ticket:${ticket.id}`).emit("ticket:closed", closedPayload);

        sendAck(callback, {
            success: true,
            message: "Ticket closed successfully.",
            timestamp: closedPayload.timestamp,
        });
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log(`Agent disconnected: ${socket.data.user.id}`);

        Object.values(tickets).forEach((ticket) => {
            if (ticket.agentSocketId === socket.id && ticket.status === "claimed") {
                ticket.agentSocketId = null;
                ticket.agentId = null;
                ticket.status = "open";

                customerNS.to(`ticket:${ticket.id}`).emit("ticket:reopened", {
                    ticketId: ticket.id,
                    message: "Agent disconnected. Ticket is reopened.",
                    timestamp: new Date().toISOString(),
                });

                agentNS.to("agents").emit("ticket:available", {
                    ticketId: ticket.id,
                    subject: ticket.subject,
                    description: ticket.description,
                    customerId: ticket.customerId,
                    timestamp: new Date().toISOString(),
                });
            }
        });
    });
});

adminNS.on("connection", (socket) => {
    console.log(`Admin connected: ${socket.data.user.id} (${socket.id})`);

    // Admin announcement
    socket.on("admin:announce", (data, callback) => {
        if (!data || typeof data !== "object") {
            return sendAck(callback, {
                success: false,
                error: "Payload must be an object.",
            });
        }

        const text =
            typeof data.text === "string"
                ? data.text.trim()
                : typeof data.message === "string"
                    ? data.message.toString()
                    : null;
        if (!text) {
            return sendAck(callback, {
                success: false,
                error: "Announcement text is required and can not be empty.",
            });
        }

        const announcement = {
            adminId: socket.data.user.id,
            text: text,
            message: text,
            timestamp: new Date().toISOString(),
        };

        customerNS.emit("admin:announcement", announcement);
        agentNS.emit("admin:announcement", announcement);
        adminNS.emit("admin:announcement", announcement);

        sendAck(callback, {
            success: true,
            announcement: announcement,
        });
    });

    // Get ticket list
    socket.on("admin:ticket-list", (data, callback) => {
        sendAck(callback, {
            success: true,
            tickets: Object.values(tickets),
        });
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log(`Admin disconnected: ${socket.data.user.id}`);
    });
});


httpServer.listen(3000, () => {
    console.log("Socket server is running on port 3000");
});