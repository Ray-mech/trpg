statusArray = [];
skillPoints = [];
var data = [
    ["応急手当", 30, 0, 30],
    ["鍵開け", 1, 0, 1],
    ["隠す", 15, 0, 15],
    ["隠れる", 60, 0, 60],
    ["写真術", 10, 0, 10],
    ["変装", 1, 0, 1],
    ["機械修理", 20, 0, 20],
    ["電気修理", 10, 0, 10],
    ["運転", 20, 0, 20],
    ["重機械操作", 1, 0, 1],
    ["コンピュータ", 1, 0, 1],
    ["追跡", 10, 0, 10],
    ["登攀", 40, 0, 40],
    ["忍び歩き", 10, 0, 10],
    ["乗馬", 5, 0, 5],
    ["水泳", 25, 0, 25],
    ["跳躍", 25, 0, 25],
    ["経理", 10, 0, 10],
    ["目星", 25, 0, 25],
    ["聞き耳", 25, 0, 25],
    ["ナビゲート", 10, 0, 10],
    ["言いくるめ", 5, 0, 5],
    ["信用", 15, 0, 15],
    ["説得", 15, 0, 15],
    ["値切り", 5, 0, 5],
    ["オカルト", 5, 0, 5],
    ["精神分析", 1, 0, 1],
    ["図書館", 25, 0, 25],
    ["医学", 5, 0, 5],
    ["化学", 1, 0, 1],
    ["考古学", 1, 0, 1],
    ["人類学", 1, 0, 1],
    ["生物学", 1, 0, 1],
    ["地質学", 1, 0, 1],
    ["電子工学", 1, 0, 1],
    ["天文学", 1, 0, 1],
    ["博物学", 10, 0, 10],
    ["物理学", 1, 0, 1],
    ["薬学", 1, 0, 1],
    ["心理学", 5, 0, 5],
    ["法律", 5, 0, 5],
    ["歴史", 20, 0, 20]
];

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

        placeholder: 0,

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
  setCells(data,'#skill1');
});
