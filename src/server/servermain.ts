import WebSocket = require("ws");
async function main() {
    const wscli = new WebSocket.Server({ port: 8085 })
    wscli.on('connection', (socket) => {
        console.log(`New client connected`);
        socket.on('message', (message) => {
            const data =
                console.log(`Received message: `);
            console.log(JSON.parse(message.toString()));
        });
        socket.on('close', () => {
            console.log('Client disconnected');
        });
    });
}
main();
