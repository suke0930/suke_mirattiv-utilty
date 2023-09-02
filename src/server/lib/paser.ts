import { parse } from 'node-html-parser';
// HTMLからタグを取り除いてテキストを抽出し、配列に格納する関数
export class pasers {
    static extractTextWithouthtmltags(htmlText: string): string[] {
        const root = parse(htmlText);
        const textItems: string[] = [];
        function traverse(node: any) {
            if (node.nodeType === 3) {
                // テキストノードの場合、配列に追加
                const text = node.text.trim();
                if (text.length > 0) {
                    textItems.push(text);
                }
            } else if (node.childNodes) {
                // 子ノードがある場合、再帰的に処理
                node.childNodes.forEach((child: any) => {
                    traverse(child);
                });
            }
        }
        traverse(root);
        return textItems;
    }
    static whatevent(data: string[]) {
        if (data[0] === "が入室しました") {
            return "join";
        } else if (data[2] === "を") {
            return "gift"
        } else { return "msg" }
    }
}
// // テスト用のHTMLテキスト
// const htmlText = '<a href="/user/124893624" target="_blank"><span>スケ三郎が</span><span class="_accent_1m6ac_45">小さなハート</span><span><!-- react-text: 422 -->を<!-- /react-text --><span class="_accent_1m6ac_45"><span>1個</span></span><!-- react-text: 425 -->贈りました<!-- /react-text --></span></a>';
// const htmlText2 = '<a href="/user/124893624" target="_blank"><span>スケ三郎が</span><span class="_accent_1m6ac_45">初見です スタンプギフト</span><span><!-- react-text: 1681 -->を<!-- /react-text --><span class="_accent_1m6ac_45"><span>1個</span></span><!-- react-text: 1684 -->贈りました<!-- /react-text --></span></a>'
// // HTMLタグを取り除いたテキストを配列に格納
// const textItems = extractTextWithoutTags(htmlText);
// const textItems2 = extractTextWithoutTags(htmlText2);

// // 結果を表示
// console.log(textItems);
// console.log(textItems2);