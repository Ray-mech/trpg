function checkSkillSum(data){
	var usedSkill = 0;
	for (i = 0; i < data.length; i++){
		usedSkill += Number(data[i][2]);
	}
	$("#usedSkillP").html(usedSkill);

}


$().ready(function() {
// 表示する値
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


];
checkSkillSum(data);

// handsontableの作成
var $container = $('#skill1');
$container.handsontable({
    /* オプション */
    // 表示データ
    data: data,
    // 列ヘッダー
    rowHeaders: false,
    // 行ヘッダー
    colHeaders: ["技能", "初期値", "振り値", "合計"],
    // 最大行数
    maxCols: 4,
    // 最大列数
    maxRows: 18,

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

});