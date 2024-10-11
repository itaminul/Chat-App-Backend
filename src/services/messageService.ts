import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();
export const sendMessages = async (message: any) => {
  // Create the message in the database
  const createdMessage = await prismaService.messages.create({
    data: {
      messageSenderId: 1,
      messageType: "df",
      fileUrl: "dafaf",
      senderId: message.sender,
      recipientId: message.recipient,
      content: message.content,
    },
  });

  const messageData = await prismaService.messages.findUnique({
    where: {
      id: createdMessage.id,
    },
    include: {
      sender: true, // Include sender details
      recipient: true, // Include recipient details
    },
  });

  // Optionally, emit the message via sockets if needed
  // (You can do this here or in the route handler)

  return messageData;
};
