export interface resultgetcomnet {
    name: string
    comment: string
}
class commentutl {
    private elementpath: string;
    private lengh: number;
    private dummyelement: HTMLUListElement
    constructor(classname: string) {
        this.dummyelement = document.createElement('ul');
        this.elementpath = classname;
        if (document.getElementsByClassName(this.elementpath)?.[0]?.innerHTML) {
            // let dummyelement = document.getElementsByTagName('ul');
            this.dummyelement.innerHTML = document.getElementsByClassName(this.elementpath)[0].innerHTML;
            this.lengh = this.dummyelement.children.length + 1;
        } else {
            this.lengh = -1;
        }
    };
    /**
     * クラス名からhtmlコレクションを取得し、コレクション子のlenghを返す関数
     * @param name 取得したいクラス名
     * @returns 結果のlengh
     */
    gethtmlchildlengh() {
        const rawHTMLobj = document.getElementsByClassName(this.elementpath);
        const raw_to_inner = rawHTMLobj[0].innerHTML;
        // let dummyelement = document.getElementsByTagName('ul');
        this.dummyelement.innerHTML = raw_to_inner;

        if (this.dummyelement.children[0].textContent === 'ここにコメントが表示されます') {//コメント表示プレびゅとかいう悪魔
            //      console.log("発火")
            this.lengh = -1
            return -1;
        } else {
            return this.dummyelement.children.length;
        }

    }
    /**
     * 引数と今までのthis.lenghを比較しする。
     * @param length 比較先のlengh
     * @returns コメントの更新の有無
     */
    checknewcomment(length: number) {
        if (length != -1) {
            if (this.lengh <= length) {
                this.lengh++;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    getnewcomments() {
        const nameElement = this.dummyelement.children[0]?.children[1]?.children[0];
        const commentElement = this.dummyelement.children[0]?.children[1]?.children[1];
        const name: string = nameElement ? nameElement.innerHTML || 'null' : 'null';
        const comment: string = commentElement ? commentElement.innerHTML || 'null' : 'null';
        const result: resultgetcomnet = {
            name: name,
            comment: comment
        }
        return result;
    }
    debuglengh() {
        return this.lengh;
    }
}

//function connectwebsocket() { }
export class commentgeter {
    private waittime: number
    private client: commentutl
    /**
     * コメント取得クラスのコンストラクタ
     * @param waittime 何ミリ病に一回コメントを取得するか
     */
    constructor(waittime: number) {
        this.waittime = waittime;
        this.client = new commentutl("mrChatList__list");
    }
    /**
     * コメント取得
     * @returns コメントが来たときにpromiceと一緒にかえす
     */
    on() {
        return new Promise<resultgetcomnet>((resolve, reject) => {
            const intervalid = setInterval(() => {
                try {
                    const isnew = this.client.checknewcomment(this.client.gethtmlchildlengh());
                    if (isnew === true) {
                        const newcomment = this.client.getnewcomments();
                        //   console.log(newcomment);
                        clearInterval(intervalid);
                        resolve(newcomment);

                        //   console.log("りぞるぶしたい")
                    }
                } catch (error) {
                }
            }, this.waittime)
        })
    }
}




