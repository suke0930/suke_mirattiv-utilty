
interface websocketopenstatus {
    status: string,
    error?: Event
}
export class easywebsocket {
    private wsip: string;
    private ws: WebSocket | undefined;
    constructor(ip: string) {
        this.ws = undefined;
        this.wsip = "ws://" + ip;
    }
    connect() {
        return new Promise<websocketopenstatus>((resolve, reject) => {
            this.ws = new WebSocket(this.wsip);
            this.ws.addEventListener('open', (event: Event) => {
                resolve({
                    status: "open"
                })
            });
            this.ws.addEventListener('error', (error: Event) => {
                resolve({
                    status: "error",
                    error: error
                })
            });
        })
    }
    /**
     * websocketでデータを送る関数
     * @param data 送りたいデータ
     * @param waittime 何ミリ秒後に送るか
     */
    send(data: string, waittime: number) {

        setTimeout(() => {
            if (this.ws !== undefined) {
                console.log(data);
                this.ws.send(data);
            }
        }, waittime);
    }
    receive(waittime: number) {
        return new Promise<string>((resolve, reject) => {
            const timeoutid = setTimeout(() => {
                reject("timeout");
            }, waittime);
            if (this.ws !== undefined) {
                this.ws.addEventListener('message', (event) => {
                    clearTimeout(timeoutid);
                    resolve(event.data.toString());
                });
            }
        })
    }
    close() {
        if (this.ws !== undefined) {
            this.ws.close();
        }
    }
}
