const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 56001 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Nhận tin nhắn từ thiết bị thu ngân
  ws.on('message', (message) => {
    console.log(`Received order: ${message}`);
    // Gửi thông báo tới tất cả các client (bao gồm bartender)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Gửi đơn hàng tới bartender
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:56001');