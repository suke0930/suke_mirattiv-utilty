import { WebSocket } from 'ws';
//const PORT = 50001;  // 棒読みちゃん直接


/**
 * コンストラクタ
 */


export class BouyomiChanClient {
    private socket: any;
    private HOST: any;
    private PORT: any;
    private cmntStr: any;
    constructor(ip: string, port: string) {
        this.socket = null;
        this.HOST = ip;
        this.PORT = port;  // WebSocketサーバー経由
    }

    talk(cmntStr: string) {

        this.cmntStr = cmntStr;
        this.socket = new WebSocket('ws://' + this.HOST + ':' + this.PORT + '/ws/');
        this.socket.binaryType = 'arraybuffer';
        this.socket.onopen = this.socket_onopen.bind(this);
        this.socket.onerror = this.socket_onerror.bind(this);
        this.socket.onclose = this.socket_onclose.bind(this);
        this.socket.onmessage = this.socket_onmessage.bind(this);
    }

    socket_onopen(e: any) {
        let data = this.makeBouyomiChanDataToSend(this.cmntStr);
        this.socket.send(data.buffer);
        console.log("socket_onopen");
    }

    socket_onerror(e: any) {
        console.log("socket_onerror");
        console.log(e);
        this.socket.close();
    }

    socket_onclose(e: any) {
        console.log("socket_onclose");
    }

    socket_onmessage(e: any) {
        console.log("socket_onmessage");
        //console.log(e.data);

        this.socket.close();
    }

    makeBouyomiChanDataToSend(cmntStr: any) {

        // ... 以前の makeBouyomiChanDataToSend 関数のコードをそのままコピー
        let command = 0x0001; //[0-1]  (16Bit) コマンド          （ 0:メッセージ読み上げ）
        let speed = -1; //[2-3]  (16Bit) 速度              （-1:棒読みちゃん画面上の設定）
        let tone = -1; //[4-5]  (16Bit) 音程              （-1:棒読みちゃん画面上の設定）
        let volume = -1; //[6-7]  (16Bit) 音量              （-1:棒読みちゃん画面上の設定）
        let voice = 0; //[8-9]  (16Bit) 声質              （ 0:棒読みちゃん画面上の設定、1:女性1、2:女性2、3:男性1、4:男性2、5:中性、6:ロボット、7:機械1、8:機械2、10001～:SAPI5）
        let code = 0; //[10]   ( 8Bit) 文字列の文字コード（ 0:UTF-8, 1:Unicode, 2:Shift-JIS）
        let len = 0; //[11-14](32Bit) 文字列の長さ

        let cmntByteArray = this.stringToUtf8ByteArray(cmntStr);

        len = cmntByteArray.length;
        let bytesLen = 2 + 2 + 2 + 2 + 2 + 1 + 4 + cmntByteArray.length;
        let data = new Uint8Array(bytesLen);
        let pos = 0;
        data[pos++] = command & 0xFF;
        data[pos++] = (command >> 8) & 0xFF;
        data[pos++] = speed & 0xFF;
        data[pos++] = (speed >> 8) & 0xFF;
        data[pos++] = tone & 0xFF;
        data[pos++] = (tone >> 8) & 0xFF;
        data[pos++] = volume & 0xFF;
        data[pos++] = (volume >> 8) & 0xFF;
        data[pos++] = voice & 0xFF;
        data[pos++] = (voice >> 8) & 0xFF;
        data[pos++] = code & 0xFF;
        data[pos++] = len & 0xFF;
        data[pos++] = (len >> 8) & 0xFF;
        data[pos++] = (len >> 16) & 0xFF;
        data[pos++] = (len >> 24) & 0xFF;
        for (let i = 0; i < cmntByteArray.length; i++) {
            data[pos++] = cmntByteArray[i];
        }
        return data;
    }
    stringToUtf8ByteArray(str: any) {
        let out = [], p = 0;
        for (var i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            if (c < 128) {
                out[p++] = c;
            }
            else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            }
            else if (
                ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
                ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {

                // Surrogate Pair
                c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
                out[p++] = (c >> 18) | 240;
                out[p++] = ((c >> 12) & 63) | 128;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
            else {
                out[p++] = (c >> 12) | 224;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
        }
        return out;
    }
}







