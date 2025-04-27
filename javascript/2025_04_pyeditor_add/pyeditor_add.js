// -- ver 0.01
// -- 2025/04/27
// -- 2025/04/27

// ページが読み込まれたときに実行される関数
let aai_fail = 0;
var timer1 = null;
const ele_d_add = document.getElementById("elep_d_add");
//let input; // inputをグローバルスコープで宣言
//let executeButton; // executeButtonをグローバルスコープで宣言
const add_html = `<br /><label for="elep_ll_tgt">target:</label>
<select id="elep_ll_tgt">
    <option value="elep_pe_0" selected>ed_pe_0</option>
    <option value="elep_pe_1">ed_pe_1</option>
</select>

<!-- リストボックス: 処理内容の選択 -->
<label for="elep_ll_act">type:</label>
<select id="elep_ll_act">
    <option value="exec">exec</option>
    <option value="clr_i">in clear</option>
    <option value="cp_i">in copy</option>
    <option value="clr_o">out clear</option>
    <option value="cp_o">out copy</option>
</select>

<!-- 実行ボタン -->
<button id="elep_bt_e">exe</button>&nbsp;&nbsp;
<input type="text" id="elep_ip_url" placeholder="URL input"  size="60">
<!-- <input type="text" id="elep_ip_url" value="https://oxxpeh.pyscriptapps.com/editor/latest/sample.py"  size="60"> -->
<button id="elep_bt_g">pe_1 copy</button><br />
<label for="elep_ll_tgt">ele target:</label>
<select id="elep_ll_ele_tgt">
    <option value="elep_d_out">elep_d_out</option>
    <option value="elep_d_log" selected>elep_d_log</option>
</select>
<select id="elep_ll_ele_act">
    <option value="clr">clear</option>
    <option value="add">add elep_d_log</option>
    <option value="save">save file(pye.log)</option>
</select>
<!-- 実行ボタン -->
<button id="elep_bt_ele_e">exe</button><br />

<!-- 結果を表示するためのエリア -->
&#91id:elep_d_out&#93<br />
<div id="elep_d_out" style="height:200px;overflow-y: scroll;background-color: #E0E0E0"></div >
<br />&#91id:elep_d_log&#93<br />
<div id="elep_d_log" style="height:200px;overflow-y: scroll;background-color: #E0E0E0"></div><br />`;

function ffp_get_dt(){
    // 現在の日時を取得
    const now = new Date();
    
    // 現在の時間をフォーマット
    const hours = String(now.getHours()).padStart(2, '0'); // 時間
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 分
    const seconds = String(now.getSeconds()).padStart(2, '0'); // 秒
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // ミリ秒
    // フォーマットされた時間を作成
    const aas_dtn = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return aas_dtn
}
function ffp_wr_log(aas_log, ele_id = 'elep_d_log') {
    // 現在の日時を取得
    const currentTime = `${ffp_get_dt()}`

    // 指定されたIDの要素に時間を出力
    document.getElementById(ele_id).innerHTML += `${currentTime} ${aas_log} <br />`;
    ele_id.scrollTop = ele_id.scrollHeight;
}

// get url
function ffp_get(aas_url, ele_id_t = 'elep_pe_1', ele_id_o = 'elep_d_log') {
    return fetch(aas_url)  // Promiseを返す
    .then(res => {
        if (!res.ok) {
            throw new Error('nw err: ' + res.status);
        }
        return res.text();  // レスポンスをテキストとして取得
    })
    .then(text => {
        document.getElementById(ele_id_t).code = text;  
        // 取得したテキストを指定された要素に設定
        //document.getElementById(ele_id_o).innerHTML = "to " + ele_id_t + " copy<br />";  
        ffp_wr_log("to " + ele_id_t + " copy<br />");
        // メッセージを表示
    })
    .catch(error => {
        console.error('エラー:', error);
    });
}

// checkURL
function ffp_is_url(url) {
    const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return regex.test(url);
}    
function ffp_ch_url() {
    const aas_url = document.getElementById('elep_ip_url').value;
    if (aas_url && ffp_is_url(aas_url)) {
        ffp_get(aas_url).then(() => {
        document.getElementsByClassName('absolute py-editor-run-button')[0].click();
    });
    } //else {
    //    alert("invalid URL");
    //}
}
// ボタンを確認するための関数
function ffp_ch_bt() {
    const ele_bt = document.getElementsByClassName("absolute py-editor-run-button")[0];
    
    // ボタンが存在する場合
    if (ele_bt) {
        ele_bt.click(); // ボタンをクリック
        clearInterval(timer1); // ループを停止
        //ffp_ch_url(); // URLを変更する関数を呼び出す
    } else {
        // ボタンが見つからない場合
        aai_fail++;
        console.log("ボタンが見つかりません。1秒後に再試行します。");

        // 5回失敗した場合、ループを停止
        if (aai_fail >= 5) {
            clearInterval(timer1);
            console.log("ボタンが見つからなかったため、処理を終了します。");
        }
    }
}
// log出力
function ffp_wr_io() {
    const aas_tgt = document.getElementById("elep_ll_tgt").value;
    const aai_no = Number(aas_tgt.charAt(aas_tgt.length - 1));
    const ele_tgt = document.getElementById(aas_tgt);
    const ele_tgto = document.getElementsByClassName("py-editor-output")[aai_no];
    const aas_dt = ffp_get_dt();
    var aas_out = `[${aas_dt}]`
    aas_out += `lastout:<br />`
    aas_out += `<pre><code>${ele_tgto.innerText}</code></pre>`
    aas_out += `in:<br />`
    aas_out += `<pre><code>${ele_tgt.code}</code></pre>`
    //console.log(aas_out)
    ele_d_log= document.getElementById("elep_d_log")
    ele_d_log.innerHTML += aas_out;
    //document.getElementById("elep_d_log").innerHTML += aas_out;
    ele_d_log.scrollTop = ele_d_log.scrollHeight;
}

// ショートカットキー追加
function ffp_shk_r() {
    const ele_bt_tgt = document.getElementsByClassName("absolute py-editor-run-button")[0];
    //alert("Ctrl + @ が押されました！");
    //ffp_wr_io();
    ele_bt_tgt.click()
}


// キー入力イベントを監視します
document.addEventListener('keydown', function(event) {
    // Ctrlキーが押されているか確認します
    if (event.ctrlKey && event.key === '@') {
        event.preventDefault(); // デフォルトの動作を防ぎます
        ffp_shk_r(); // 関数を実行します
    }
});    

//function ffp_mk_obj() {
//    // 入力ボックスを作成
//    input = document.createElement("input");
//    input.type = "text";
//    input.placeholder = "ここに入力";
//
//    // 実行ボタンを作成
//    executeButton = document.createElement("button");
//    executeButton.textContent = "実行";
//
//    // ボタンのクリックイベントを追加
//    executeButton.addEventListener("click", function() {
//        const inputValue = input.value;
//        alert("入力された値: " + inputValue);
//    });
//
//};
function ffp_add_obj() {
    //ele_d_py_add.appendChild(input);
    //ele_d_py_add.appendChild(executeButton);
    ele_d_add.innerHTML += `${add_html}` ;
    //const Scr = document.createElement("script");
    //        Scr.type = "py"; 
    // bodyの最後に入力ボックスとボタンを追加
    //document.body.appendChild(Div_py)
    
    // button にイベント追加
    document.getElementById('elep_bt_g').addEventListener('click', function() {
        const aas_url = document.getElementById('elep_ip_url').value;
        ffp_get(aas_url);
        // インプットボックスからURLを取得
    });
    //cp clr
    document.getElementById("elep_bt_e").addEventListener("click", function() {
        const aas_tgt = document.getElementById("elep_ll_tgt").value;
        const aas_act = document.getElementById("elep_ll_act").value;
        const ele_tgt = document.getElementById(aas_tgt);
        const aai_no = Number(aas_tgt.charAt(aas_tgt.length - 1));
        const ll_ed_o = document.getElementsByClassName("py-editor-output");
        const ll_exe = document.getElementsByClassName("absolute py-editor-run-button");
        const ele_tgto = ll_ed_o[aai_no];
        const ele_bt_tgt = ll_exe[aai_no];
        const dd_res = [];
        // window.console.log('@ -- dst ${ele_tgt} no ${aai_no} ')
    
        if (aas_act === "cp_o") {
            // テキストを取得
            const aas_text = ele_tgto.innerText;
            dd_res.push(`${aas_tgt} out get : ${aas_text}`);
            
            // クリップボードにコピー
            navigator.clipboard.writeText(aas_text).then(() => {
                dd_res.push(`${aas_tgt} out copy`);
            }).catch(err => {
                dd_res.push(`copy err: ${err}`);
            });
        } else if (aas_act === "cp_i") {
            // テキストを取得
            const aas_text = ele_tgt.code;
            dd_res.push(`${aas_tgt} out get : ${aas_text}`);
            
            // クリップボードにコピー
            navigator.clipboard.writeText(aas_text).then(() => {
                dd_res.push(`${aas_tgt} code copy`);
            }).catch(err => {
                dd_res.push(`copy err: ${err}`);
            });                
        } else if (aas_act === "clr_i") {
            // テキストを消去
            //inputElement.value = "";
            ele_tgt.code = "# ---input code ---";
            dd_res.push(`${aas_tgt} clear`);
            
        } else if (aas_act === "clr_o") {
            // テキストを消去
            //inputElement.value = "";
            ele_tgto.innerText = ""; 
            dd_res.push(`${aas_tgt} clear`);
        } else if (aas_act === "exec") {
            // クリック
            ffp_wr_io()
            ele_bt_tgt.click()
            dd_res.push(`${aas_tgt} exec`);
        }
        // 結果を表示
        ffp_wr_log(dd_res.join("<br />"));
    });
    //ele clr add save
    document.getElementById("elep_bt_ele_e").addEventListener("click", function() {
        const aas_ele_tgt = document.getElementById("elep_ll_ele_tgt").value;
        const aas_ele_act = document.getElementById("elep_ll_ele_act").value;
        const ele_tgt = document.getElementById(aas_ele_tgt);
        //const aai_no = Number(aas_tgt.charAt(aas_tgt.length - 1));
        //const ll_ed_o = document.getElementsByClassName("py-editor-output");
        //const ll_exe = document.getElementsByClassName("absolute py-editor-run-button");
        //const ele_tgto = ll_ed_o[aai_no];
        //const ele_bt_tgt = ll_exe[aai_no];
        const dd_res = [];
        // window.console.log('@ -- dst ${ele_tgt} no ${aai_no} ')
    
        if (aas_ele_act === "clr") {
            // テキストを取得
            ele_tgt.innerHTML = '';
            dd_res.push(`add: {aas_ele_tgt} {aas_ele_act}`);
        } else if (aas_ele_act === "add") {
            const aas_dt = ffp_get_dt();
            document.getElementById("elep_d_log").innerHTML += `[${aas_dt}]add:`;
            document.getElementById("elep_d_log").innerHTML += ele_tgt.innerHTML;
            document.getElementById("elep_d_log").innerHTML += "<br />";
            dd_res.push(`add: {aas_ele_tgt} {aas_ele_act}`);
        } else if (aas_ele_act === "save") {
            const aas_html = ele_tgt.innerHTML ;
            const blob = new Blob([aas_html], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pye.log';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        // 結果を表示
        ffp_wr_log(dd_res.join("<br />"));
    });
    // url add
    aas_url = document.getElementById("elep_pe_1").src;
    document.getElementById("elep_ip_url").value = aas_url;
};
window.onload = function() {
    //ffp_mk_obj();
    ffp_add_obj();
    ffp_wr_log('Page load', 'elep_d_log');
    timer1 = setInterval(ffp_ch_bt, 1000);    
    //end
};
