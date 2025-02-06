module.exports = (io, socket, prisma) => {
    const updateUserStatus = async (userId, isActive) => {
      await prisma.user.update({
        where: { id: userId },
        data: { isActive },
      });
      io.emit('user_status_change', { userId, isActive });
    };
  
    socket.on('join_group', async (groupId) => {
      socket.join(`group_${groupId}`);
      console.log(`User ${socket.user.id} joined group ${groupId}`);
    });
  
    socket.on('leave_group', async (groupId) => {
      socket.leave(`group_${groupId}`);
      console.log(`User ${socket.user.id} left group ${groupId}`);
    });
  
    socket.on('send_message', async ({ groupId, content }) => {
      try {
        console.log("content new", content);
        const message = await prisma.message.create({
          data: {
            content,
            userId: socket.user.id,
            groupId,
          },
          include: { user: { select: { id: true, username: true } } },
        });
        io.to(`group_${groupId}`).emit('new_message', message);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });
  
    socket.on('disconnect', async () => {
      await updateUserStatus(socket.user.id, false);
      console.log(`User ${socket.user.id} disconnected`);
    });
  
    // Set user as active when they connect
    updateUserStatus(socket.user.id, true);
  };

/*
class SocketManager {
    constructor(io, socket, prisma) {
      this.io = io;
      this.socket = socket;
      this.prisma = prisma;
    }
  
    // Method to update the user's status in the database and emit the change
    async updateUserStatus(userId, isActive) {
      try {
        await this.prisma.user.update({
          where: { id: userId },
          data: { isActive },
        });
        this.io.emit('user_status_change', { userId, isActive });
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    }
  
    // Method to handle user joining a group
    async handleJoinGroup(groupId) {
      try {
        this.socket.join(`group_${groupId}`);
        console.log(`User ${this.socket.user.id} joined group ${groupId}`);
      } catch (error) {
        console.error('Error joining group:', error);
      }
    }
  
    // Method to handle user leaving a group
    async handleLeaveGroup(groupId) {
      try {
        this.socket.leave(`group_${groupId}`);
        console.log(`User ${this.socket.user.id} left group ${groupId}`);
      } catch (error) {
        console.error('Error leaving group:', error);
      }
    }
  
    // Method to handle sending a message in a group
    async handleSendMessage({ groupId, content }) {
      try {
        const message = await this.prisma.message.create({
          data: {
            content,
            userId: this.socket.user.id,
            groupId,
          },
          include: { user: { select: { id: true, username: true } } },
        });
        this.io.to(`group_${groupId}`).emit('new_message', message);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  
    // Method to handle sending a private message
    async handleSendPrivateMessage({ receiverId, content }) {
      try {
        const message = await this.prisma.privateMessage.create({
          data: {
            content,
            senderId: this.socket.user.id,
            receiverId,
          },
          include: {
            sender: { select: { id: true, username: true } },
            receiver: { select: { id: true, username: true } },
          },
        });
        // Emit to both sender and receiver
        this.io.to(`user_${this.socket.user.id}`).emit('new_private_message', message);
        this.io.to(`user_${receiverId}`).emit('new_private_message', message);
      } catch (error) {
        console.error('Error sending private message:', error);
      }
    }
  
    // Method to handle user disconnection
    async handleDisconnect() {
      try {
        await this.updateUserStatus(this.socket.user.id, false);
        console.log(`User ${this.socket.user.id} disconnected`);
      } catch (error) {
        console.error('Error during disconnect:', error);
      }
    }
  
    // Method to set the user as active when they connect
    async handleConnect() {
      try {
        await this.updateUserStatus(this.socket.user.id, true);
        this.socket.join(`user_${this.socket.user.id}`);
      } catch (error) {
        console.error('Error setting user as active:', error);
      }
    }
  
    // Register event listeners
    registerEvents() {
      this.socket.on('join_group', (groupId) => this.handleJoinGroup(groupId));
      this.socket.on('leave_group', (groupId) => this.handleLeaveGroup(groupId));
      this.socket.on('send_message', (data) => this.handleSendMessage(data));
      this.socket.on('send_private_message', (data) => this.handleSendPrivateMessage(data));
      this.socket.on('disconnect', () => this.handleDisconnect());
    }
  }
  
  export default (io, socket, prisma) => {
    const socketManager = new SocketManager(io, socket, prisma);
    socketManager.registerEvents();
    
    // Handle user connection
    socketManager.handleConnect();
  };
  */