var ultData = [
    "天性のステルス",
    "冒涜的な悪食",
    "テレポーテーション",
    "狂気の波動",
    "名状しがたい美容技術のようなもの",
    "エネルギー受信"
];

function setData(textfile){
    var data_array = textfile.split(/\r\n|\r|\n/);
    console.log(data_array);
    var ultname = ultData[data_array[3]-1]; 
    setName(data_array[0], data_array[1], ultname);

    var status = data_array[2].split(',');
    setTable(status,"#statusTable");
    var skill = data_array[4].split(',');
    setTable(skill,"#skillTable");
}

function setName(pcname,pcdetl,ultname){
    $("#pcname").html(pcname);
    $("#pcdetl").html(pcdetl);
    $("#ultname").html(ultname);
}

function setTable(status,place){
	var wak = "";
	for (i = 0; i < status.length; i++) {
		wak += "<td class='st'>";
		wak += status[i];
		wak += "</td>\n";
	}
	$(place).html(wak);
}



/*
$().ready(function() {
    setTable();
});
*/