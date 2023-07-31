/*
 * http://love.hackerzhou.me
 */

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function () {
	var newWidth = $win.width();
	var newHeight = $win.height();
	if (newWidth != clientWidth && newHeight != clientHeight) {
		location.replace(location);
	}
});

(function ($) {
	$.fn.typewriter = function () {
		this.each(function () {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function () {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
					$ele.html(str.substring(0, progress-1));
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date) {
	const current = Date();
	let seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	const days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	let hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	let minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	const result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小時 <span class=\"digit\">" + minutes + "</span> 分鐘 <span class=\"digit\">" + seconds + "</span> 秒<span class=\"digit change-content\">👫🏻</span><span class=\"more change-content\">💬</span><span class=\"title change-content\">I'm Always With You 💌</span>";
	$("#clock").html(result);


	$(".change-content").click(function () {
		const contents = ["在某個春日的中午，與妳一同用餐，難掩我內心的雀躍。妳的美麗如同寶石的閃亮光澤，讓我感受愛的奇妙；讓我明白生命的價值。當我們相遇的那刻，妳照亮了我的世界，讓我享受無限的美好。"
			, "紫藤花開，香氣撲鼻，愛情盛放，心中暖意。妳我相遇，緣分天定，攜手同行，直到永恆。"
			, "妳的眼睛，如星空璀璨，照亮我心，指引方向。妳的聲音，如天籟悠揚，撫慰我心，消除憂傷。在妳懷裡，我感到幸福，有妳相伴，我無所求。願我們的愛情，如紫藤花一般盛放，永遠甜蜜浪漫。"
			, "紫陽花的花語是變幻無常，妳的心情也像它一樣，有時是淡紫色的溫柔，有時是鮮紅色的激情，有時是青綠色的平靜，有時是白色的純真。我愛妳的每一種顏色，我愛妳的每一種情緒，妳是我生命中最美的花朵，妳是我心中最深的迷惘。"
			, "我的愛情就像一顆馬鈴薯， 深深埋在土裡， 等待著妳的發掘。妳是我的陽光， 照亮我生命的每一寸土地， 讓我茁壯成長。我願意為妳犧牲一切， 就像馬鈴薯為了妳的飽腹， 毫不猶豫地被削皮、被煮熟。我的愛情就像馬鈴薯泥， 細膩、柔軟、濃郁， 永遠陪伴在妳身邊。"
			, "妳是我心中的變數，我是妳生命的常數，我們相互依賴，就像函數與參數;<br/>妳是我程式的邏輯，我是妳編碼的魔術，我們相互配合，就像演算法與資料結構;<br/>妳是我系統的核心，我是妳網路的連結，我們相互支持，就像伺服器與用戶端;<br/>妳是我工程的靈感，我是妳創意的來源，我們相互啟發，就像科技與藝術。"
		];
		$("#content").html(contents[random(0, contents.length - 1)]);
		$("#code").show().typewriter();
		$("#clock-box").fadeIn(500);
	});
}
