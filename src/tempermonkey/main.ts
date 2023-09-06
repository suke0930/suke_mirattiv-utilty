import { easywebsocket } from './lib/easywebsocket'
import { commentgeter, resultgetcomnet } from './lib/addon'
let timeout = 0;
async function sendmessege(comment: resultgetcomnet) {
    setTimeout(async () => {
        timeout += 100;
        setTimeout(() => {
            timeout -= 100;
        }, 100);
        const wscli = new easywebsocket("localhost:8085");
        const status = await wscli.connect();
        switch (status.status) {
            case "open":
                try {
                    const senddata = JSON.stringify(comment);
                    wscli.send(senddata, 10);
                    const receive = await wscli.receive(3000);
                    const checkfact = JSON.parse(receive);
                    if (checkfact.data === comment.comment) {
                        console.log("正常に送信が完了しました");
                    } else {
                        console.log("送信に失敗しました。")
                    }
                } catch (error) {
                    console.log(error);
                }
                wscli.close();
                break;
            case "error":
                console.log("WSerror");
                wscli.close();
                break;
        }
    }, timeout);
}
async function main() {
    setTimeout(async () => {
        const commentcli = new commentgeter(100);
        //   commentcli.debuglengh(1000);
        commentcli.on((comment: resultgetcomnet) => {
            console.log(comment);
            sendmessege(comment);
        })


    }, 2000);
}
main();
