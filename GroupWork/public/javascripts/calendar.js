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
	}

	for (i = 0 ; i < 42 ; i++) {
		tdDay[i] = document.createElement('td');
		modalLink[i] = document.createElement('a');
		modalLink[i].className = "modal-tgt";
		modalLink[i].setAttribute('data-toggle', 'modal');
		modalLink[i].setAttribute('data-target', '#calendarModal');
		modalLink[i].setAttribute('data-day', i + 1 - initWeek);
		modalLink[i].setAttribute('data-month', mm);
		if (i >= initWeek && i < lastDay + initWeek) {

			modalLink[i].innerText = i + 1 - initWeek;
			// 今日
			/*
			if(dd === i + 1 - initWeek && curMonthFlg) {
				tdDay[i].className = "info";
			}
			*/
			tdDay[i].appendChild(modalLink[i]);

			var tmpDd = i - initWeek + 1;
			var curDay = yy + ('0' + mm).slice(-2) + ('0' + tmpDd).slice(-2);

			var tgtWg = schObj.filter(function(item, index){
				  return (item.SCH_DATE == curDay && item.WG_FLG == '1');
			});
			var tgtSch = schObj.filter(function(item, index){
				  return (item.SCH_DATE == curDay && item.WG_FLG == '0');
			});

			// データ有りならブランク挿入
			if (tgtWg.length > 0 || tgtSch.length > 0) {
				var spanBlank = document.createElement('span');
				spanBlank.innerText = " ";
				tdDay[i].appendChild(spanBlank);
			}

			if (tgtWg.length > 0) {
				var span = document.createElement('span');
				if (tgtWg[0].WG_FLG == "1") {
					if (tgtWg[0].KARI_FLG == "0") {
						span.className = "glyphicon glyphicon-star";
					} else {
					span.className = "glyphicon glyphicon-pushpin"
					}
					tdDay[i].appendChild(span);
				}
			}
			if (tgtSch.length > 0) {
				var span = document.createElement('span');
				var schKbnCheck = 0;
				tgtSch.forEach(function(schItem) {
					if (schItem.SCH_KBN && schItem.SCH_KBN > schKbnCheck) schKbnCheck = schItem.SCH_KBN;
				});
				if (schKbnCheck == "0" || schKbnCheck == "1") {
					tdDay[i].className = "success";
				} else if (schKbnCheck == "2") {
					tdDay[i].className = "warning";
				} else if (schKbnCheck == "3") {
					tdDay[i].className = "danger";
				}
			} else {
				tdDay[i].className = "success";
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

	// スケジュールモーダル初期化
	document.getElementsByName('CB_schDel').item(0).checked = false;
	document.getElementById('TextareaSch').innerText = "";

	// WGモーダル初期化＆設定
	document.getElementsByName('CB_kari').item(0).checked = false;
	document.getElementsByName('CB_del').item(0).checked = false;
	document.getElementById('TextareaWg').innerText = "";

	document.getElementById('schDay').value = modalDay;
	var curDay = yy + ('0' + mm).slice(-2) + ('0' + modalDay).slice(-2);

	var modalLi = document.getElementById('list-sch');
	modalLi.textContent = null;
	var tgtSch = schObj.filter(function(item, index){
		  return (item.SCH_DATE == curDay && item.WG_FLG == '0');
	});
	if (tgtSch.length > 0) {
		tgtSch.forEach(function(schItem) {
			var li = document.createElement('li');
			if (schItem.SCH_KBN == "1") {
				li.className = "list-group-item list-group-item-success";
				li.innerText = schItem.USER_NAME + "(OK)：" + schItem.COMMENT;
				modalLi.appendChild(li);
			} else if (schItem.SCH_KBN == "2") {
				li.className = "list-group-item list-group-item-warning";
				li.innerText = schItem.USER_NAME + "(微妙)：" + schItem.COMMENT;
				modalLi.appendChild(li);
			} else if (schItem.SCH_KBN == "3") {
				li.className = "list-group-item list-group-item-danger";
				li.innerText = schItem.USER_NAME + "(ダメ)：" + schItem.COMMENT;
				modalLi.appendChild(li);
			}
		});
	} else {
		var li = document.createElement('li');
		li.className = "list-group-item list-group-item-info";
		li.innerText = "予定なし";
		modalLi.appendChild(li);
	}
	var li = document.createElement('li');


	// WG設定
	var tgtSchWg = schObj.filter(function(item, index){
		  return (item.SCH_DATE == curDay && item.WG_FLG == '1');
	});
	if (tgtSchWg.length > 0) {
		if (tgtSchWg[0].KARI_FLG == "1") {
			document.getElementsByName('CB_kari').item(0).checked = true;
		} else {
			document.getElementsByName('CB_kari').item(0).checked = false;
		}
		document.getElementById('TextareaWg').innerText = tgtSchWg[0].COMMENT;
	}
	document.getElementById('wgDay').value = modalDay;

	// モーダル呼び出し
	modal.find('.modal-title').text(mm + '月' + modalDay + '日の予定詳細');
});



window.onload = function(){
	var navibar = document.getElementById('nvCalendar');
	navibar.className = "active";

	createTable();
};