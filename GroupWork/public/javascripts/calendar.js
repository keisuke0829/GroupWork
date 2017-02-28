var yy, mm, dd, initWeek;
var date = new Date();
var tmpD = document.getElementById('thisMonth').innerText.split("/");
yy = tmpD[0];
mm = tmpD[1];
dd = date.getDate();
date.setFullYear(yy);
date.setMonth(mm - 1);

var createTable = function(){
	// 年月日情報取得
	var tmpDate = date;
	tmpDate.setDate(1);
	// １日の曜日
	initWeek = tmpDate.getDay();
	tmpDate.setMonth(tmpDate.getMonth() + 1);
	tmpDate.setDate(0);
	// 今月の最終日
	var lastDay = tmpDate.getDate();
	//
	var tblCnt = lastDay + initWeek;

	// テーブル作成
	var tdDay = new Array();

	for (i = 0 ; i < 42 ; i++) {
		tdDay[i] = document.createElement('td');
		if (i >= initWeek && i < lastDay + initWeek) {
			tdDay[i].innerText = i + 1 - initWeek;
		}
	}

	var tmpCnt = 0;
	var calendarBody = document.getElementsByClassName('calendarBody').item(0);
	var maxRow = 5;
	if (tblCnt > 35) maxRow = 6;
	for (j = 0 ; j < maxRow ; j++) {
		var tr = document.createElement('tr');
		for (i = 0 + tmpCnt ; i < 7 + tmpCnt ; i++) {
			tr.appendChild(tdDay[i]);
		}
		tmpCnt = tmpCnt + 7
		calendarBody.appendChild(tr);
	}
};

window.onload = function(){
	var navibar = document.getElementById('nvCalendar');
	navibar.className = "active";

	createTable();
};