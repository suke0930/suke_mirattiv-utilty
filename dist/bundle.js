/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tempermonkey/lib/addon.ts":
/*!***************************************!*\
  !*** ./src/tempermonkey/lib/addon.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.commentgeter = void 0;\nvar commentutl = /** @class */ (function () {\n    function commentutl(classname) {\n        var _a, _b;\n        this.dummyelement = document.createElement('ul');\n        this.elementpath = classname;\n        if ((_b = (_a = document.getElementsByClassName(this.elementpath)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.innerHTML) {\n            // let dummyelement = document.getElementsByTagName('ul');\n            this.dummyelement.innerHTML = document.getElementsByClassName(this.elementpath)[0].innerHTML;\n            this.lengh = this.dummyelement.children.length;\n        }\n        else {\n            this.lengh = -1;\n        }\n    }\n    ;\n    /**\n     * クラス名からhtmlコレクションを取得し、コレクション子のlenghを返す関数\n     * @param name 取得したいクラス名\n     * @returns 結果のlengh\n     */\n    commentutl.prototype.gethtmlchildlengh = function () {\n        var rawHTMLobj = document.getElementsByClassName(this.elementpath);\n        var raw_to_inner = rawHTMLobj[0].innerHTML;\n        // let dummyelement = document.getElementsByTagName('ul');\n        this.dummyelement.innerHTML = raw_to_inner;\n        if (this.dummyelement.children[0].textContent === 'ここにコメントが表示されます') { //コメント表示プレびゅとかいう悪魔\n            //      console.log(\"発火\")\n            this.lengh = -1;\n            return -1;\n        }\n        else {\n            return this.dummyelement.children.length;\n        }\n    };\n    /**\n     * 引数と今までのthis.lenghを比較しする。\n     * @param length 比較先のlengh\n     * @returns コメントの更新の有無\n     */\n    commentutl.prototype.checknewcomment = function (length) {\n        if (length != -1) {\n            if (this.lengh < length) {\n                this.lengh = length;\n                return true;\n            }\n            else {\n                return false;\n            }\n        }\n        else {\n            return false;\n        }\n    };\n    commentutl.prototype.getnewcomments = function () {\n        var _a, _b, _c, _d;\n        var nameElement = (_b = (_a = this.dummyelement.children[0]) === null || _a === void 0 ? void 0 : _a.children[1]) === null || _b === void 0 ? void 0 : _b.children[0];\n        var commentElement = (_d = (_c = this.dummyelement.children[0]) === null || _c === void 0 ? void 0 : _c.children[1]) === null || _d === void 0 ? void 0 : _d.children[1];\n        var name = nameElement ? nameElement.innerHTML || 'null' : 'null';\n        var comment = commentElement ? commentElement.innerHTML || 'null' : 'null';\n        var result = {\n            name: name,\n            comment: comment\n        };\n        return result;\n    };\n    commentutl.prototype.debuglengh = function () {\n        return this.lengh;\n    };\n    return commentutl;\n}());\n//function connectwebsocket() { }\nvar commentgeter = /** @class */ (function () {\n    /**\n     * コメント取得クラスのコンストラクタ\n     * @param waittime 何ミリ病に一回コメントを取得するか\n     */\n    function commentgeter(waittime) {\n        this.waittime = waittime;\n        this.client = new commentutl(\"mrChatList__list\");\n    }\n    /**\n     * コメント取得\n     * @returns コメントが来たときにpromiceと一緒にかえす\n     */\n    commentgeter.prototype.on = function () {\n        var _this = this;\n        return new Promise(function (resolve, reject) {\n            var intervalid = setInterval(function () {\n                try {\n                    var isnew = _this.client.checknewcomment(_this.client.gethtmlchildlengh());\n                    if (isnew === true) {\n                        var newcomment = _this.client.getnewcomments();\n                        //   console.log(newcomment);\n                        clearInterval(intervalid);\n                        resolve(newcomment);\n                        //   console.log(\"りぞるぶしたい\")\n                    }\n                }\n                catch (error) {\n                }\n            }, _this.waittime);\n        });\n    };\n    return commentgeter;\n}());\nexports.commentgeter = commentgeter;\n\n\n//# sourceURL=webpack://suke_mirattiv-utilty/./src/tempermonkey/lib/addon.ts?");

/***/ }),

/***/ "./src/tempermonkey/main.ts":
/*!**********************************!*\
  !*** ./src/tempermonkey/main.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar addon_1 = __webpack_require__(/*! ./lib/addon */ \"./src/tempermonkey/lib/addon.ts\");\nfunction main() {\n    return __awaiter(this, void 0, void 0, function () {\n        var _this = this;\n        return __generator(this, function (_a) {\n            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {\n                var commentcli, comment;\n                return __generator(this, function (_a) {\n                    switch (_a.label) {\n                        case 0:\n                            commentcli = new addon_1.commentgeter(100);\n                            _a.label = 1;\n                        case 1:\n                            if (false) {}\n                            return [4 /*yield*/, commentcli.on()];\n                        case 2:\n                            comment = _a.sent();\n                            console.log(comment);\n                            return [3 /*break*/, 1];\n                        case 3: return [2 /*return*/];\n                    }\n                });\n            }); }, 2000);\n            return [2 /*return*/];\n        });\n    });\n}\nmain();\n\n\n//# sourceURL=webpack://suke_mirattiv-utilty/./src/tempermonkey/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/tempermonkey/main.ts");
/******/ 	
/******/ })()
;