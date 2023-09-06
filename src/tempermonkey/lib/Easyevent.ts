export class easyevent {
    private event: { [eventid: string]: Function[] | null }
    constructor() {
        this.event = {}
    }
    on(id: string, callback: Function) {
        if (this.event[id] === null || this.event[id] === undefined) {
            this.event[id] = [];
        }
        if (this.event[id] !== null) {
            //    console.log(this.event[id])
            this.event[id]!.push(callback);
        }
    }
    Emit(id: string, data?: any) {
        if (this.event[id] && this.event[id] !== null) {
            if (data === undefined) {

                const callback = this.event[id];
                if (callback) {
                    if (callback.length > 0) {
                        callback.forEach(element => {
                            element();
                        });
                    }
                }
            } else if (data !== undefined) {
                const callback = this.event[id];
                if (callback) {
                    if (callback.length > 0) {
                        callback.forEach(element => {
                            element(data);
                        });
                    }
                }
            }

        }
    }
    clear(id: string) {
        this.event[id] = null;
    }

}

const dev = new easyevent();
dev.on("test", (data: any) => {
    // console.log(data)
})
// dev.on("test", (data: string) => {
//     console.log(data + ":2")
// })
dev.Emit('test', "おっぱいちゅき")
// dev.Emit('test', "おっぱいちゅき")
