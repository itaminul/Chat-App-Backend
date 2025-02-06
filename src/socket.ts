import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prismaService = new PrismaClient();

export function setupSocket(server: any) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages
    socket.on('send_message', async ({ groupId=1, content }) => {
      try {
        console.log("Received message content:", content);

        if (!groupId) {
          console.error("No groupId provided");
          return; // Prevent saving if no groupId is provided
        }

        // Create a new message in the database
        const message = await prismaService.message.create({
          data: {
            content,
            userId: 1, // Assuming you have user info on the socket
            groupId,
          },
          include: { 
            user: { select: { id: true, username: true } } // Get user info along with the message
          },
        });

        // Emit the new message to all clients in the group
        io.to(`group_${groupId}`).emit('new_message', {
          id: message.id,
          content: message.content,
          user: message.user, // Send the user's id and username
          timestamp: message.createdAt, // Optionally, include the timestamp
        });

        console.log("Message saved and emitted:", message);
      } catch (error) {
        console.error('Error saving and emitting message:', error);
      }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}
