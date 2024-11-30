import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prismaService = new PrismaClient();

export function setupSocket(server: any) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

      // Handle user joining a group
      socket.on('join_group', (groupId) => {
        socket.join(`group_${groupId}`);  // Join the room with groupId
        console.log(`User joined group_${groupId}`);
      });

    // Listen for messages
    socket.on('send_message', async ({ groupId, content }) => {
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
            user: { select: { id: true, username: true } }, // Get user info along with the message
            group: { select: { id: true, name: true } } 
          },
        });

        console.log("socket message socket", message)
        // Emit the new message to all users in the group
        // io.emit('new_message', message);
          

    
        
        io.to(`group_${groupId}`).emit('new_message', {
          id: message.id,
          content: message.content,
          userId: message.userId,  // Send the actual userId from the database
          username: message.user.username,  // Send the user's name
          groupId: message.groupId,  // Send the groupId
          groupName: message.group.name,  // Send the group name
        });

        // io.emit('new_message', message);

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
