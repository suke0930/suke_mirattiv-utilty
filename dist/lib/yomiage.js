"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BouyomiChanClient = void 0;
var ws_1 = require("ws");
//const PORT = 50001;  // 棒読みちゃん直接
/**
 * コンストラクタ
 */
var BouyomiChanClient = /** @class */ (function () {
    function BouyomiChanClient(ip, port) {
        this.socket = null;
        this.HOST = ip;
        this.PORT = port; // WebSocketサーバー経由
    }
    BouyomiChanClient.prototype.talk = function (cmntStr) {
        this.cmntStr = cmntStr;
        this.socket = new ws_1.WebSocket('ws://' + this.HOST + ':' + this.PORT + '/ws/');
        this.socket.binaryType = 'arraybuffer';
        this.socket.onopen = this.socket_onopen.bind(this);
        this.socket.onerror = this.socket_onerror.bind(this);
        this.socket.onclose = this.socket_onclose.bind(this);
        this.socket.onmessage = this.socket_onmessage.bind(this);
    };
    BouyomiChanClient.prototype.socket_onopen = function (e) {
        var data = this.makeBouyomiChanDataToSend(this.cmntStr);
        this.socket.send(data.buffer);
        //     console.log("socket_onopen");
    };
    BouyomiChanClient.prototype.socket_onerror = function (e) {
        //    console.log("socket_onerror");
        console.log(e);
        this.socket.close();
    };
    BouyomiChanClient.prototype.socket_onclose = function (e) {
        //    console.log("socket_onclose");
    };
    BouyomiChanClient.prototype.socket_onmessage = function (e) {
        //  console.log("socket_onmessage");
        //console.log(e.data);
        this.socket.close();
    };
    BouyomiChanClient.prototype.makeBouyomiChanDataToSend = function (cmntStr) {
        // ... 以前の makeBouyomiChanDataToSend 関数のコードをそのままコピー
        var command = 0x0001; //[0-1]  (16Bit) コマンド          （ 0:メッセージ読み上げ）
        var speed = -1; //[2-3]  (16Bit) 速度              （-1:棒読みちゃん画面上の設定）
        var tone = -1; //[4-5]  (16Bit) 音程              （-1:棒読みちゃん画面上の設定）
        var volume = -1; //[6-7]  (16Bit) 音量              （-1:棒読みちゃん画面上の設定）
        var voice = 0; //[8-9]  (16Bit) 声質              （ 0:棒読みちゃん画面上の設定、1:女性1、2:女性2、3:男性1、4:男性2、5:中性、6:ロボット、7:機械1、8:機械2、10001～:SAPI5）
        var code = 0; //[10]   ( 8Bit) 文字列の文字コード（ 0:UTF-8, 1:Unicode, 2:Shift-JIS）
        var len = 0; //[11-14](32Bit) 文字列の長さ
        var cmntByteArray = this.stringToUtf8ByteArray(cmntStr);
        len = cmntByteArray.length;
        var bytesLen = 2 + 2 + 2 + 2 + 2 + 1 + 4 + cmntByteArray.length;
        var data = new Uint8Array(bytesLen);
        var pos = 0;
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
        for (var i = 0; i < cmntByteArray.length; i++) {
            data[pos++] = cmntByteArray[i];
        }
        return data;
    };
    BouyomiChanClient.prototype.stringToUtf8ByteArray = function (str) {
        var out = [], p = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c < 128) {
                out[p++] = c;
            }
            else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            }
            else if (((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
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
    };
    return BouyomiChanClient;
}());
exports.BouyomiChanClient = BouyomiChanClient;
