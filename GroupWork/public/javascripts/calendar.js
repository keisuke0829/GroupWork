var yy, mm, dd, initWeek, curMonthFlg, modalDay, schCnt;
var date = new Date();
var tmpD = document.getElementById('thisMonth').innerText.split("/");
yy = tmpD[0];
mm = tmpD[1];
if (yy == date.getFullYear() && mm == date.getMonth() + 1) curMonthFlg = true;
dd = date.getDate();
date.setFullYear(yy);
date.setMonth(mm - 1);
var schObj = [];


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
	var modalLink = new Array();

	// 取得したリストを格納
	schCnt = document.getElementById('schCnt').value;
	for (idx = 0 ; idx < schCnt ; idx++) {
		var schList = document.getElementById('schList' + idx).value.split(",");
		schObj.push({
			'SCH_DATE': schList[0],
			'USER_NAME': schList[1],
			'WG_FLG': schList[2],
			'KARI_FLG': schList[3],
			'SCH_KBN': schList[4],
			'COMMENT': schList[5]
		});
		//schStore[schList[0] + schList[1] + schList[2]] = schObj;
	}

	for (i = 0 ; i < 42 ; i++) {
		tdDay[i] = document.createElement('td');
		modalLink[i] = document.createElement('a');
		modalLink[i].setAttribute('data-toggle', 'modal');
		modalLink[i].setAttribute('data-target', '#calendarModal');
		modalLink[i].setAttribute('data-day', i + 1 - initWeek);
		modalLink[i].setAttribute('data-month', mm);
		if (i >= initWeek && i < lastDay + initWeek) {
			modalLink[i].innerText = i + 1 - initWeek;
			if(dd === i + 1 - initWeek && curMonthFlg) {
				tdDay[i].className = "info";
			}
			tdDay[i].appendChild(modalLink[i]);
			var tmpDd = i - initWeek + 1;
			var curDay = yy + ('0' + mm).slice(-2) + ('0' + tmpDd).slice(-2);
			var tgtSch = schObj.filter(function(item, index){
				  return (item.SCH_DATE == curDay);
				});
			if (tgtSch.length > 0) {
				var span = document.createElement('span');
				if (tgtSch[0].WG_FLG == "1") {
					if (tgtSch[0].KARI_FLG == "0") {
						span.className = "glyphicon glyphicon-star";
					} else {
					span.className = "glyphicon glyphicon-pushpin"
					}
				}
					//span.appendChild();
				var spanBlank = document.createElement('span');
				spanBlank.innerText = " ";
				tdDay[i].appendChild(spanBlank);
				tdDay[i].appendChild(span);
			}
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

// モーダルウィンドウ呼び出し
$('#calendarModal').on('show.bs.modal', function (event) {
	var a = $(event.relatedTarget);
	var modalDay = a.data('day');
	var modal = $(this);
	var li = document.createElement('li');
	li.ClassName = "list-group-item list-group-item-success";
	li.innerText = "tao：OK";
	var modalLi = document.getElementById('list-sch');
	modalLi.appendChild(li);
	document.getElementById('schDay').value = modalDay;
	document.getElementById('wgDay').value = modalDay;
	modal.find('.modal-title').text(mm + '月' + modalDay + '日の予定詳細');
});



window.onload = function(){
	var navibar = document.getElementById('nvCalendar');
	navibar.className = "active";

	createTable();
};