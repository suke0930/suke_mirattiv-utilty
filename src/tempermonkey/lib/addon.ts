import { easyevent } from './Easyevent'
export interface resultgetcomnet {
    name: string
    comment: string
}
interface lastdatas {
    1: { data: resultgetcomnet | null, leng: number },
    2: { data: resultgetcomnet | null }
}
class commentutl {
    private elementpath: string;
    private lengh: number;
    private dummyelement: HTMLUListElement
    private dummydebug: HTMLElement
    private debugintervalid: NodeJS.Timeout | null
    private last: lastdatas
    private testmode: boolean
    constructor(classname: string) {
        /**
         * ----------------------------------------------------------
         * テストモード!!
         *  ----------------------------------------------------------
         */
        this.testmode = false;

        this.debugintervalid = null;
        this.dummyelement = document.createElement('ul');
        this.dummydebug = document.createElement('ul')
        this.elementpath = classname;

        this.last = { 1: { data: null, leng: 0 }, 2: { data: null } }

        if (document.getElementsByClassName(this.elementpath)?.[0]?.innerHTML) {
            // let dummyelement = document.getElementsByTagName('ul');
            this.dummyelement.innerHTML = document.getElementsByClassName(this.elementpath)[0].innerHTML;
            this.lengh = this.dummyelement.children.length + 1;
        } else {
            this.lengh = -1;
        }
    };
    /**
     * htmlコレクションを取得してくる
     * @returns 取得したコレクション
     */
    gethtmlchild() {
        let dummy = document.createElement('ul');
        const rawHTMLobj = document.getElementsByClassName(this.elementpath);
        if (!rawHTMLobj[0]) { console.log("まだ準備が出来てないよ！"); return null; }
        const raw_to_inner = rawHTMLobj[0].innerHTML;
        this.dummyelement.innerHTML = rawHTMLobj[0].innerHTML;
        // let dummyelement = document.getElementsByTagName('ul');
        dummy.innerHTML = raw_to_inner;
        return dummy
        //  if (this.dummyelement.children[0].textContent === 'ここにコメントが表示されます') {//コメント表示プレびゅとかいう悪魔
        //      console.log("発火")

    }
    /**
     * 引数として与えられたエレメントから新しいコメントが無いか検出する
     * @param dummyelement HTMlえれめんと
     * @returns {resultgetcomnet}新しいコメントの配列
     */
    checknewcomment(dummyelement: HTMLUListElement | null) {
        const Getcommentnull = {
            name: "null",
            comment: "null"
        }
        if (dummyelement === null) { return [] }
        let resultdata: resultgetcomnet[] = [];
        if (this.last[1].data !== null) {//lastがnullか
            const latestcomment = this.getnewcomments(dummyelement, 0);
            //それ以外
            // if (latestcomment === this.last[1].data) {//連続したコメント
            if (this.issimilarobj(latestcomment, this.getnewcomments(dummyelement, 0))) {//連続したコメント

                if (this.last[2].data === null) {//last2はnullか？
                    //last2はnull
                    //チルドレンの長さを使う
                    const lengh = dummyelement.children.length;//安全機構
                    let count = dummyelement.children.length;//チルドレンの長さ
                    if (this.last[1].leng === count) {//算出値が同じ
                        //処理を終了
                        return resultdata;
                    } else {//算出値が合わない
                        const last1eng = count - this.last[1].leng
                        if (last1eng < 0) console.warn("なんかマイナスになってるよ!?");
                        for (let index = 0; index < last1eng; index++) {
                            const data = this.getnewcomments(dummyelement, index);
                            resultdata.push(data)
                        }
                        this.last[1].leng = count;
                        //last2は変更なし
                    }

                } else {//last2はnull以外
                    //last.2を過去のコメントを遡って探す
                    const lengh = dummyelement.children.length;//安全機構
                    let count = 0;//last1 とlast2のあいだ
                    for (let index = 0; index < lengh; index++) {
                        const nowcomment = this.getnewcomments(dummyelement, index);
                        //   if (nowcomment === this.last[2].data) break;
                        if (this.issimilarobj(nowcomment, this.last[2].data))
                            count++
                    }
                    if (this.last[1].leng === count) {//算出値が同じ
                        //処理を終了
                        return resultdata;
                    } else {//算出値が合わない
                        /**まず、countはlast1とlast2の距離
                         * this.last[1].lengは前回のcount(countはlast1とlast2の距離)
                         *だから、もし新しくcountが増えて3とかになったとしても、前回までのコメントが無ければ
                         *3はなり得ない(なら前回は2とかのはず)　それ故count - this,last[1].lengはエラーになりえない 
                        */
                        const last1eng = count - this.last[1].leng
                        if (last1eng < 0) console.warn("なんかマイナスになってるよ!?")
                        for (let index = 0; index < count; index++) {
                            const data = this.getnewcomments(dummyelement, index);
                            resultdata.push(data)
                        }
                        this.last[1].leng = count;
                        //last2は変更なし
                    }

                }
            } else {//新規コメントが来た場合

                console.log("---------")
                console.log(this.last[1].data)
                console.log(this.getnewcomments(dummyelement, 1))
                console.log("---------")
                // console.log(this.last[1].data)
                // console.log(this.getnewcomments(dummyelement, 1))
                // console.log("---------")
                //console.log((this.last[1].data === this.getnewcomments(dummyelement, 1)));
                console.log(this.issimilarobj(this.last[1].data, this.getnewcomments(dummyelement, 1)));

                console.log((this.getnewcomments(dummyelement, 1).comment === "null" && this.getnewcomments(dummyelement, 1).name === "null"))


                if (this.issimilarobj(this.last[1].data, this.getnewcomments(dummyelement, 1)) || this.issimilarobj(this.getnewcomments(dummyelement, 1), Getcommentnull)) {//新規コメントが１件なら

                    resultdata.push(this.getnewcomments(dummyelement, 0));
                    this.last[1].data = this.getnewcomments(dummyelement, 0);

                    if ((this.getnewcomments(dummyelement, 1).comment === "null" && this.getnewcomments(dummyelement, 1).name === "null")) {
                        this.last[2].data = this.getnewcomments(dummyelement, 1);
                    }
                    this.last[1].leng = 0;
                } else {//１件でない場合

                    const latestcomment = this.getnewcomments(dummyelement, 0);
                    const childleng = dummyelement.children.length//安全装置
                    for (let index = 0; index < childleng; index++) {
                        const data = this.getnewcomments(dummyelement, index);
                        //     if (this.last[1].data === data) {//data1を引いた場合
                        if (this.issimilarobj(this.last[1].data, data)) {//data1を引いた場合
                            break;
                        } else {
                            resultdata.push(data);
                        }
                    }
                    if (this.issimilarobj(latestcomment, this.getnewcomments(dummyelement, 1))) {//最初の１件が連続していないかチェック
                        let count = 0;//連続していた場合
                        for (let index = 1; childleng; index++) {
                            const data = this.getnewcomments(dummyelement, index);
                            if (latestcomment !== data) {
                                break;
                            } else {
                                count++
                            }
                        }
                        this.last[1].data = latestcomment;
                        this.last[1].leng = count;
                    } else {//連続していない場合
                        this.last[1].data = latestcomment;
                        this.last[1].leng = 0;
                    }
                }
            }
        } else if (this.last[1].data === null) { //nullの場合

            if (dummyelement.children) {//チルドレンが存在するか
                if (dummyelement.children[0]) {//チルドレンの中身が存在するか
                    if (dummyelement.children[0].textContent) {//テキストは存在するか？
                        if (this.dummyelement.children[0].textContent === 'ここにコメントが表示されます') {//コメント表示プレびゅとかいう悪魔
                            //コメントはきていない
                            resultdata = [];//処理を終了
                        } else {
                            //最新のコメントが来ている

                            const latestcomment = this.getnewcomments(dummyelement, 0);
                            resultdata.push(latestcomment);
                            this.last[1].data = latestcomment;
                            this.last[1].leng = 0;
                            //      console.log(this.last[1].data)
                        }
                    }
                }
            }

        }
        return resultdata;
    }
    getnewcomments(dummyelement: HTMLUListElement, id: number, testobj?: resultgetcomnet[]) {
        if (this.testmode === false) {
            const nameElement = dummyelement.children[id]?.children[1]?.children[0];
            const commentElement = dummyelement.children[id]?.children[1]?.children[1];
            const name: string = nameElement ? nameElement.innerHTML || 'null' : 'null';
            const comment: string = commentElement ? commentElement.innerHTML || 'null' : 'null';
            const result: resultgetcomnet = {
                name: name,
                comment: comment
            }
            return result;
        } else if (this.testmode === true) {
            if (testobj) {
                const name: string = testobj[id].name || 'null'
                const comment: string = testobj[id].comment || 'null'
                const result: resultgetcomnet = {
                    name: name,
                    comment: comment
                }
                return result;
            } else {
                console.log("引数忘れてんぞ！！！");
                throw new Error("引数忘れてんぞ！！！");
                return {
                    name: "null",
                    comment: "null"
                }
            }
            return {
                name: "null",
                comment: "null"
            }
        }
        return {
            name: "null",
            comment: "null"
        }
    }

    debuglengh(waittime: number, debugws: boolean) {
        let emer = true;
        this.debugintervalid = setInterval(() => {
            const rawHTMLobj = document.getElementsByClassName(this.elementpath);
            const raw_to_inner = rawHTMLobj[0].innerHTML;
            this.dummydebug.innerHTML = raw_to_inner;
            const nameElement = this.dummydebug.children[0]?.children[1]?.children[0];
            const commentElement = this.dummydebug.children[0]?.children[1]?.children[1];
            const name: string = nameElement ? nameElement.innerHTML || 'null' : 'null';
            const comment: string = commentElement ? commentElement.innerHTML || 'null' : 'null';
            if (comment === "0930" && emer === true && debugws === true) {
                const emerws = new WebSocket("ws://localhost:8085");
                setTimeout(() => {
                    emerws.send(JSON.stringify({
                        name: "emer",
                        comment: "読み上げがしんでいます！！"
                    }))
                    emer = false;
                }, 30);
            }
            console.log("---------------------------")
            console.log("now mirattiv latest comment:" + comment);
            console.log("now mirattic lengs:" + this.dummyelement.children.length.toString());
            console.log("now this.lengh:" + this.lengh.toString());
            console.log("---------------------------")
        }, waittime)
    }
    debugintervalstop() {
        if (this.debugintervalid !== null) {
            clearInterval(this.debugintervalid);
            console.log("インターバル解除")
        } else {
            console.log("nullじゃねぇか！")
        }
    }
    test_mode() {


    }
    /**
     * オブジェクトが同じ要素がどうか比べる
     * @param obj1 比較１
     * @param obj2 比較２
     * @returns boolean.trueならobj1とobj2は同じ
     */
    issimilarobj(obj1: resultgetcomnet, obj2: resultgetcomnet) {
        if (obj1.comment === obj2.comment && obj1.name === obj2.name) {
            return true;
        } else {
            return false;
        }
    }
}

//function connectwebsocket() { }
export class commentgeter {
    private waittime: number
    private client: commentutl
    private eventcli: easyevent
    /**
     * コメント取得クラスのコンストラクタ
     * @param waittime 何ミリ病に一回コメントを取得するか
     */
    constructor(waittime: number) {
        this.waittime = waittime;
        this.client = new commentutl("mrChatList__list");
        this.eventcli = new easyevent();
        this.checknewcomment();
    }
    checknewcomment() {
        const intervalid = setInterval(() => {
            const isnew = this.client.checknewcomment(this.client.gethtmlchild());
            const temp: resultgetcomnet[] = []
            if (isnew !== temp) {//更新がある場合
                isnew.forEach((data) => {
                    this.eventcli.Emit('cmt', data);
                })
            }
            //    
        }, this.waittime)
    }

    /**
     * コールバックを引数にコメントが来たらそのコールバックの中身を実行する関数
     * イベントみたいなもん
     * @param callback コールバック
     */
    on(callback: Function) {
        this.eventcli.on('cmt', callback);
    }
    debuglengh(waittime: number) {
        this.client.debuglengh(waittime, true);
    }
    debugintervalstop() {
        this.client.debugintervalstop();
    }
}




