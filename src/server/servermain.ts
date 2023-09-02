import WebSocket = require("ws");
import { pasers } from './lib/paser'
import { BouyomiChanClient } from './lib/yomiage'
interface comment {
    name: string,
    comment: string[],
    eventtype: string
}
async function main() {
    const wscli = new WebSocket.Server({ port: 8085 })
    const yomiagecli = new BouyomiChanClient("localhost", "50002");
    wscli.on('connection', (socket) => {
        console.log(`New client connected`);
        socket.on('message', (message) => {
            const rawdata = JSON.parse(message.toString())
            const paserrawdata = pasers.extractTextWithouthtmltags(rawdata.comment);
            const eventtype = pasers.whatevent(paserrawdata);
            const data: comment = {
                name: rawdata.name,
                comment: paserrawdata,
                eventtype: eventtype
            };
            console.log(data);
            const yomiagedata = converteyomiage(data);
            console.log(yomiagedata);
            yomiagecli.talk(yomiagedata);

        });
        socket.on('close', () => {
            console.log('Client disconnected');
        });
    });
}
function converteyomiage(data: comment) {
    if (data.name === "null") {
        let msgdata: string = ""
        data.comment.forEach((msg) => {
            msgdata = msgdata + msg;
        });
        return msgdata;
    } else {
        let msgdata: string = data.name + ":";
        data.comment.forEach((msg) => {
            msgdata = msgdata + msg;
        });
        return msgdata;
    }
}
main();
