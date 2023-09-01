import { commentgeter } from './lib/addon'
async function main() {
    setTimeout(async () => {
        const commentcli = new commentgeter(100);
        while (true === true) {
            const comment = await commentcli.on();
            console.log(comment);
        }

    }, 2000);

}
main();