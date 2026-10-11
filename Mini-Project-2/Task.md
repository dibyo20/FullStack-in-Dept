# Task: Live Polling System

## Problem Statement

Build a real-time polling system where a host creates a poll and multiple users vote. All connected users should see the updated results immediately whenever someone votes.

## Requirements

1. **Create a Poll**
   - Host creates a poll with a question and multiple options.
   - Generate a unique poll ID on the server.

2. **Join a Poll**
   - Users join a poll using its ID.
   - Each poll must have its own Socket.IO room.

3. **Cast a Vote**
   - Users vote for one of the available options.
   - Reject invalid option IDs.
   - A user can vote only once per poll.

4. **Live Results**
   - Broadcast updated vote counts to everyone in that poll's room.
   - Users in other poll rooms must not receive those results.

5. **Acknowledgements**
   - Return success or an error when creating a poll, joining, or voting.

6. **Validation**
   - Reject empty questions, fewer than two options, and invalid votes.
   - Handle unknown poll IDs gracefully.

## Suggested Events

- `poll:create`
- `poll:join`
- `poll:vote`
- `poll:results`

You may design the payload formats yourself.

## Testing

Use Postman or EchoAPI with at least three simultaneous clients:

- Client A: creates a poll.
- Client B: joins and votes.
- Client C: joins and votes.

Verify that all participants see live results and that a second vote from the same user is rejected.

## Deliverables

- `server.js`
- `README.md` explaining the event payloads and how to run the project.
- Test evidence showing successful votes and rejected invalid votes.

**Constraint:** Store poll data in memory. Do not use a database or build a frontend.

## Bonus Challenge

Add a `poll:end` event so that the host can close a poll. Once closed, all new votes must be rejected.