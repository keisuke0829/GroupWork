var i;
var j;
var ghostLocAry = new Array(6);
for(i=0;i < 6;i++){

	// １次元配列の各番地に、配列を作成して格納する
	ghostLocAry[i] = new Array();

	for(j=0;j < 6;j++){

		// 0 で埋める
		ghostLocAry[i][j] = 'white.jpg';
	}
}
var tmp;
for (i = 1 ; i <= 6 ; i++) {
	for (j = 1 ; j <= 6 ; j++) {
		tmp = document.getElementById('' + i + '_' + j).src
		if (tmp.substr(-13,13) == 'myGhost_R.jpg') {
			ghostLocAry[parseInt(i)-1][parseInt(j)-1] = 'myGhost_R.jpg';
		} else if (tmp.substr(-9,9) == 'white.jpg') {
			ghostLocAry[parseInt(i)-1][parseInt(j)-1] = 'white.jpg';
		} else {
			ghostLocAry[parseInt(i)-1][parseInt(j)-1] = 'myGhost_B.jpg';
		}
	}
}


var clickBoard = function (event) {
	if (document.getElementById(event).src.substr(-13,7) == 'myGhost') {
		setArrow(event.substr(0,1) - 1, event.substr(-1,1) - 1);
	} else if (document.getElementById(event).src.substr(-7,3) == 'Arw') {
		setGhost(event.substr(0,1) - 1, event.substr(-1,1) - 1);
	}
}

var setGhost = function (y, x) {

}

var setArrow = function (y, x) {
	if (outIndexCheck(y, x-1)) {
		document.getElementById('' + (y+1) + '_' + x).src = '/public/images/leftArw.jpg';
	}
	if (outIndexCheck(y, x+1)) {
		document.getElementById('' + (y+1) + '_' + (x+2)).src = '/public/images/rightArw.jpg';
	}
	if (outIndexCheck(y-1, x)) {
		document.getElementById('' + y + '_' + (x+1)).src = '/public/images/upArw.jpg';
	}
	if (outIndexCheck(y+1, x)) {
		document.getElementById('' + (y+2) + '_' + (x+1)).src = '/public/images/downArw.jpg';
	}
}

var outIndexCheck = function (y, x) {
	if (0 > x || x > 5 || 0 > y || y > 5) {
		return false;
	} else {
		return true;
	}
}