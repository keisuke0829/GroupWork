var yyyy, mm, dd;
var date = new Date();
yyyy = date.getFullYear();
mm = date.getMonth() + 1;
dd = date.getDate();

var createTable = function(){
	var tdDay = new Array();

	for (i = 0 ; i < 35 ; i++) {
		tdDay[i] = document.createElement('td');
		tdDay[i].innerText = i + 1;
	}

	var tmpCnt = 0;
	var calendarBody = document.getElementsByClassName('calendarBody').item(0);
	for (j = 0 ; j < 5 ; j++) {
		var tr = document.createElement('tr');
		for (i = 0 + tmpCnt ; i < 7 + tmpCnt ; i++) {
			tr.appendChild(tdDay[i]);
		}
		tmpCnt = tmpCnt + 7
		calendarBody.appendChild(tr);
	}

	document.getElementById('thisMonth').innerText = mm + "月";
};

window.onload = function(){
	var navibar = document.getElementById('nvCalendar');
	navibar.className = "active";

	createTable();
};