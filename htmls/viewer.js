statusArray = [];
skillPoints = [];

function calcStatus(){
	var str = Number($('#statusform [name=str]').val());
	var con = Number($('#statusform [name=con]').val());
	var pow = Number($('#statusform [name=pow]').val());
	var dex = Number($('#statusform [name=dex]').val());
	var app = Number($('#statusform [name=app]').val());
	var siz = Number($('#statusform [name=siz]').val());
	var int = Number($('#statusform [name=int]').val());
	var edu = Number($('#statusform [name=edu]').val());
	var statusArr1 = [str, con, pow, dex, app, siz, int, edu];
	var statusSum = str+con+pow+dex+app+siz+int+edu;
	$("#status-sum").html(statusSum);
	var san  = pow * 5;
	var luck = app * 5;
	var idea = int * 5;
	var know = edu * 5; if (know >= 100) {know = 99;}
	var hp   = Math.ceil((con + siz) / 2);
	var mp   = pow;
	var db = "";
	var dbc = str + siz;
	if (dbc<=12){db="-1d6";}
	else if (dbc<=16){db="-1d4";}
	else if (dbc<=24){db="+0";}
	else if (dbc<=32){db="+1d4";}
	else {db="+1d6";}
	var skill = int*10 + edu*20;
	var statusArr2 =[hp, mp, san, idea, luck, know, db, skill];
	statusArray = statusArr1 + statusArr2;

	var wak = "";
	for (i = 0; i < statusArr2.length; i++) {
		wak += "<td class='st'>";
		wak += statusArr2[i];
		wak += "</td>\n";
	}
	$("#table2").html(wak);
	$("#skillP").html(skill);
}

function yokocalc(tableID) {
  if (!document.getElementById || !document.getElementsByTagName || (window.opera && !document.createEvent))
    return; //非対応ブラウザはなにもしない

  var table = document.getElementById(tableID); //<table id="ID名">を取得:DOM
  var tr = table.getElementsByTagName("tr"); //<table>内の<tr>を全部取得（配列）:DOM

  var td, sum, num;

  for (var i = 1; i < tr.length; i++) { //<tr>の数だけ繰り返し（最初の1列目はスキップ）

    td = tr[i].getElementsByTagName("td"); //i番目の<tr>内にある<td>を全部取得（配列）:DOM
    sum = 0; //<td>の合計値
    num = 0; //計算用の一時変数

    for (var j = 1; j < td.length -1; j++) { //<td>の数-1 だけ繰り返し（最後の<td>は結果表示用）
      if (td[j].firstChild) { //<td>内に文字が入ってるか
        num = td[j].firstChild.data; //<td>内の文字を取得:DOM
        num = Number(num) ||0; //数値に変換
      } else {
        num = 0; //セルの中身がない時は0として扱う
      }
      sum = sum + num;
    }

    sum = document.createTextNode(sum); //sumをテキストノードに変換する:DOM

    td[j].appendChild(sum); //sumを最後の<td>に挿入:DOM
  }
}

function checkSkillSum(data){
	var usedSkill = 0;
	skillPoints = [];
	for (i = 0; i < data.length; i++){
		usedSkill += Number(data[i][2]);
		skillPoints.push(Number(data[i][3]));
	}
	$("#usedSkillP").html(usedSkill);

}

function setCells(data,place){
    // 表示する値

    checkSkillSum(data);

    // handsontableの作成
    var $container = $(place);
    $container.handsontable({
        // 表示データ
        data: data,
        // 列ヘッダー
        rowHeaders: false,
        // 行ヘッダー
        colHeaders: ["技能", "初期値", "振り値", "合計"],
        // 最大行数
        maxCols: 4,
        // 最大列数
        maxRows: 42,

        afterChange: function(change, source) {
    		onRow  = change[0][0];
    		onData = change[0][3];
    		data[onRow][3] = Number(onData) + data[onRow][1];
    		$container.handsontable('render');
    		checkSkillSum(data);
    	},

        cells: function(row, col, prop) {
    	    var cellProperties = {};
    	    if (col != 2 ) {
    	        cellProperties.readOnly = true;

    	    }
    	    return cellProperties;
    	}
    });
}

function saveCs(){
	var saveData = "";
	var name = $('#nameform [name=nameinput]').val();
	var detl = $('#nameform [name=detlinput]').val();
	var ult  = $('input[name=ultradio]:checked').val()

	saveData += name + "\n";
	saveData += detl + "\n";
	saveData += statusArray + "\n";
	saveData += ult  + "\n";
	saveData += skillPoints;
	console.log(saveData);

	var blob = new Blob([ saveData ], { "type" : "text/plain" });
    if (window.navigator.msSaveBlob) { 
        window.navigator.msSaveBlob(blob, "cs.txt"); 
        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(blob, "cs.txt"); 
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
}

$().ready(function() {
  calcStatus();
  setCells(data1,'#skill1');
});
