import { commentgeter } from './lib/addon'
async function main() {
    setTimeout(async () => {
        const commentcli = new commentgeter(100);

        while (true === true) {
            const wscli = new WebSocket("ws://localhost:8085");
            const comment = await commentcli.on();
            console.log(comment);
            wscli.send(JSON.stringify(comment));
            setTimeout(() => {
                wscli.close();
            }, 50);

        }

    }, 2000);

}
main();