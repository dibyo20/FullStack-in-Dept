const app = require("./src/app.js");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

let polls = new Map();

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("Create:Poll", ({ questions, options }, callback) => {
        if (!questions || questions.length === 0 || !options || options.length < 2) {
            return callback({
                success: false,
                message: "Please add a question and at least 2 options"
            });
        }

        const poll = {
            pollId: Math.floor(Math.random() * 1000000),
            hostId: socket.id,
            questions,
            options: options.map((option, index) => ({
                optionId: index,
                option,
                votes: 0,
            })),
            voters: new Set(),
            isClosed: false,
        };

        polls.set(String(poll.pollId), poll);

        callback({
            success: true,
            message: `Poll created successfully: ${poll.pollId}`,
            pollId: poll.pollId
        });
    });

    socket.on("join:Poll", ({ pollId, socketId }, callback) => {
        const poll = polls.get(String(pollId));

        if (!poll) {
            return callback({
                success: false,
                message: `Poll: ${pollId} does not exist`
            });
        }

        if (poll.isClosed) {
            return callback({
                success: false,
                message: `Poll: ${pollId} is closed`
            });
        }

        socket.join(String(poll.pollId));
        callback({
            success: true,
            message: `Joined poll: ${pollId}`,
            sender: socketId
        });
    });

    socket.on("vote:Poll", ({ pollId, optionName, optionId, socketId }, callback) => {
        const poll = polls.get(String(pollId));

        if (!poll) {
            return callback({
                success: false,
                message: `Poll: ${pollId} does not exist`
            });
        }

        if (poll.isClosed) {
            return callback({
                success: false,
                message: `Poll: ${pollId} is closed`
            });
        }

        const voter = socketId;
        if (poll.voters.has(voter)) {
            return callback({
                success: false,
                message: `You have already voted in poll: ${pollId}`
            });
        }

        const option = poll.options.find(option => option.name === optionName || option.id === optionId);
        if (!option) {
            return callback({
                success: false,
                message: `Option: ${optionName} does not exist`
            });
        }

        option.votes++;
        poll.voters.add(voter);

        callback({
            success: true,
            message: `Voted in poll: ${pollId}`,
            sender: voter
        });
    });

    socket.on("results:Poll", ({ pollId }, callback) => {
        const poll = polls.get(String(pollId));

        if (!poll) {
            return callback({
                success: false,
                message: `Poll: ${pollId} does not exist`
            });
        }

        if (poll.isClosed) {
            return callback({
                success: false,
                message: `Poll: ${pollId} is already closed`
            });
        }
        poll.isClosed = true;

        const Result = poll.options.map((option) => ({
            name: option.option,
            votes: option.votes
        }));

        callback({
            success: true,
            message: `Poll: ${pollId} is closed`,
            results: Result
        });
    });
});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});