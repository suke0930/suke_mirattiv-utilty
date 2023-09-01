interface resultgetcomnet {
    name: string
    comment: string
}
class commentutl {
    private elementpath: string;
    private lengh: number;

    constructor(classname: string) {
        this.elementpath = classname;
        this.lengh = 0;

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
        const dummyelement = document.createElement('ul');
        dummyelement.innerHTML = raw_to_inner;
        return dummyelement.children.length;
    }
    /**
     * 引数と今までのthis.lenghを比較しする。
     * @param length 比較先のlengh
     * @returns コメントの更新の有無
     */
    checknewcomment(length: number) {
        if (this.lengh < length) {
            this.lengh = length;
            return true;
        } else {
            return false;
        }
    }

    getnewcomments() {

        const result: resultgetcomnet = {
            name: "",
            comment: ""
        }
        return result;
    }
}
class connectwebsocket {
    constructor(ip: string) {
    }
    send(messege: resultgetcomnet) {

    }
}
//function connectwebsocket() { }

function main() {
    const wscli = new connectwebsocket("DUMMYIP");
    const COMMENTID: string = "mrChatList__list"
    const client = new commentutl(COMMENTID);
    setInterval(() => {
        const isnew = client.checknewcomment(client.gethtmlchildlengh());
        if (isnew === true) {
            const newcomment = client.getnewcomments()
            //この下でwsで情報を送る
            wscli.send(newcomment)
        }
    }, 100)
}
main();