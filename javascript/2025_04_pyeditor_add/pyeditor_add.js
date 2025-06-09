// -- ver 0.04
// -- 2025/05/04
// -- 2025/04/27

// editor copy add

// ページが読み込まれたときに実行される関数
let aai_fail = 0;
var timer1 = null;

const ele_d_add = document.querySelector("#elep_d_add");

const add_html = `<br /><label for="elep_ll_tgt">target:</label>
<select id="elep_ll_tgt">
    <option value="elep_pe_0" selected>elep_pe_0</option>
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
    <option value="save">save file(pye.html)</option>
</select>
<!-- 実行ボタン -->
<button id="elep_bt_e2">exe</button><br />

<!-- 結果を表示するためのエリア -->
&#91id:elep_d_out&#93<br />
<div id="elep_d_out" style="height:200px;overflow-y: scroll;background-color: #E0E0E0"></div >
<br />&#91id:elep_d_log&#93<br />
<div id="elep_d_log" style="height:200px;overflow-y: scroll;background-color: #E0E0E0"></div><br />`;
const aai_rep = (document.getElementsByClassName("cl_d_pye")).length - 1;
function ffp_add_obj() {
    ele_d_add.innerHTML += `${add_html}` ;

    //tgtリスト追加
    document.querySelector("#elep_bt_g").innerHTML = `pe_${aai_rep} copy`;
    if (aai_rep > 0) {
        const ele_tgt_lb = document.querySelector("#elep_ll_tgt");
        for (let i = 1; i <= aai_rep ; i++){
            const ele_li = document.createElement('option');
            ele_li.textContent = `elep_pe_${i}`; 
            ele_li.value = `elep_pe_${i}`;
            ele_tgt_lb.appendChild(ele_li);
        }
    };
    
    document.querySelector("#elep_bt_g").addEventListener('click', function() {
    // button にイベント追加
        const aas_url = document.querySelector("#elep_ip_url").value;
        ffp_get(aas_url, `elep_pe_${aai_rep}`);
        // インプットボックスからURLを取得
    });
    document.querySelector("#elep_bt_e").addEventListener("click", function() {
    // button にイベント追加
        const aas_tgt = document.querySelector("#elep_ll_tgt").value;
        const aas_act = document.querySelector("#elep_ll_act").value;
        const ele_tgt = document.querySelector(`${aas_tgt}`);
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
    document.querySelector("#elep_bt_e2").addEventListener("click", function() {
        const aas_ele_tgt = document.querySelector("#elep_ll_ele_tgt").value;
        const aas_ele_act = document.querySelector("#elep_ll_ele_act").value;
        const ele_tgt = document.querySelector(`#${aas_ele_tgt}`);
        // window.console.log("@ -- dst ${ele_tgt} no ${aai_no}")
    
        if (aas_ele_act === "clr") {
            // テキストを取得
            ele_tgt.innerHTML = '';
            //dd_res.push(`exe: {aas_ele_tgt} {aas_ele_act}`);
            aas_logo = `exe: {aas_ele_tgt} {aas_ele_act}`;
        } else if (aas_ele_act === "add") {
            const aas_dt = ffp_get_dt();
            document.querySelector("#elep_d_log").innerHTML += `[${aas_dt}]add:`;
            document.querySelector("#elep_d_log").innerHTML += ele_tgt.innerHTML;
            document.querySelector("#elep_d_log").innerHTML += "<br />";
            //dd_res.push(`exe: ${aas_ele_tgt} ${aas_ele_act}`);
            aas_logo = `exe: {aas_ele_tgt} {aas_ele_act}`;
        } else if (aas_ele_act === "save") {
            var aas_html = `<!doctype html><html><head>`;
            aas_html += `<meta name="google" content="notranslate"></head><body>`;
            aas_html += ele_tgt.innerHTML ;
            aas_html += "</body></html>";
            const blob = new Blob([aas_html], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pys.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            aas_logo = `exe: {aas_ele_tgt} {aas_ele_act}`;
        }
        
        // 結果を表示
        ffp_wr_log(aas_logo);
    });
    // url add ->> for
    if (document.querySelector(`#elep_pe_${aai_rep}`)){
        aas_url = document.querySelector(`#elep_pe_${aai_rep}`).src;
        document.querySelector("#elep_ip_url").value = aas_url;
    };
};


function ffp_add_shk() {
    // ショートカットキー追加
    //const ele_bt_tgt = document.getElementsByClassName("absolute py-editor-run-button")[0];
    const ele_bt_tgt = document.querySelector("#elep_bt_e");
    //alert("Ctrl + @ が押されました！");
    //ffp_wr_io();
    ele_bt_tgt.click()
}

function ffp_ch_url() {
    const aas_url = document.querySelector('#elep_ip_url').value;
    console.log(`elep_pe_${aai_rep} ${aas_elet}`);
    if (aas_url && ffp_is_url(aas_url)) {
        ffp_get(aas_url, `elep_pe_${aai_rep}`).then(() => {
        document.getElementsByClassName('absolute py-editor-run-button')[0].click();
    });
    } //else {
    //    alert("invalid URL");
    //}
}

// get url
function ffp_get(aas_url, ele_id_t, ele_id_o = 'elep_d_log') {
    console.log(`elep_pe_  ${ele_id_t}`);
    return fetch(aas_url)  // Promiseを返す
    .then(res => {
        if (!res.ok) {
            throw new Error('nw err: ' + res.status);
        }
        return res.text();  // レスポンスをテキストとして取得
    })
    .then(text => {
        document.querySelector(`#${ele_id_t}`).code = text;  
        // 取得したテキストを指定された要素に設定
        //document.querySelector(`#${ele_id_o}`).innerHTML = "to " + ele_id_t + " copy<br />";  
        ffp_wr_log("to " + ele_id_t + " copy<br />");
        // メッセージを表示
    })
    .catch(error => {
        console.error('エラー:', error);
    });
}

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

function ffp_get_logo(aas_log){
    //html 
    aas_logo = aas_log.replace(/&/g, '&amp;');
    aas_logo = aas_logo.replace(/\(/g, '&#40;').replace(/\)/g, '&#41;');
    aas_logo = aas_logo.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;');
    aas_logo = aas_logo.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
    aas_logo = aas_logo.replace(/\{/g, '&#123;').replace(/}/g, '&#125;');
    aas_logo = aas_logo.replace(/\//g, '&#47;').replace(/\\/g, '&#92;');
    aas_logo = aas_logo.replace(/\-/g, '&#8722;').replace(/\=/g, '&#61;');
    aas_logo = aas_logo.replace(/\,/g, '&#44;').replace(/\./g, '&#46;')
    aas_logo = aas_logo.replace(/\|/g, '&#124;').replace(/\ /g, '&nbsp;');
    return aas_logo
}
// checkURL
function ffp_is_url(url) {
    const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return regex.test(url);
}    

// log出力
function ffp_wr_io() {
    const aas_tgt = document.querySelector("#elep_ll_tgt").value;
    const aai_no = Number(aas_tgt.charAt(aas_tgt.length - 1));
    const ele_tgt = document.querySelector(`#${aas_tgt}`);
    const ele_tgto = document.getElementsByClassName("py-editor-output")[aai_no];
    const aas_dt = ffp_get_dt();
    const aas_o = ffp_get_logo(ele_tgto.innerText);
    var aas_out = `[${aas_dt}]`
    aas_out += ` lastout:<br />`
    aas_out += `<pre><code>${aas_o}</code></pre>`
    aas_out += `in:<br />`
    aas_out += `<pre><code>${ele_tgt.code}</code></pre>`
    //console.log(aas_out)
    ele_d_log= document.querySelector("#elep_d_log")
    ele_d_log.innerHTML += aas_out;
    //document.querySelector("#elep_d_log").innerHTML += aas_out;
    ele_d_log.scrollTop = ele_d_log.scrollHeight;
}

function ffp_wr_log(aas_log, ele_id = 'elep_d_log') {
    // 現在の日時を取得
    const currentTime = `${ffp_get_dt()}`

    // 指定されたIDの要素に時間を出力
    document.querySelector(`#${ele_id}`).innerHTML += `[${currentTime}] ${aas_log} <br />`;
    ele_id.scrollTop = ele_id.scrollHeight;
}

// キー入力イベントを監視します
document.addEventListener('keydown', function(event) {
    // Ctrlキーが押されているか確認します
    if (event.ctrlKey && event.key === '@') {
        event.preventDefault(); // デフォルトの動作を防ぎます
        ffp_add_shk(); // 関数を実行します
    }
});    

window.onload = function() {
    //ffp_mk_obj();
    if (ele_d_add) { 
        if (!ele_d_add.classList.contains('not_add')) {
            // 関数YYYを実行
            ffp_add_obj();
        }
    };
    ffp_wr_log('Page load', 'elep_d_log');
    //end
};
