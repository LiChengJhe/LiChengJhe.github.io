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
				isWriting = true;
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
					$ele.html(str.substring(0, progress - 1));
					isWriting = false;
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

var contents = ["在某個春日的中午，與妳一同用餐，難掩我內心的雀躍。妳的美麗如同寶石的閃亮光澤，讓我感受愛的奇妙；讓我明白生命的價值。當我們相遇的那刻，妳照亮了我的世界，讓我享受無限的美好。❤️"
	, "紫藤花開，香氣撲鼻，愛情盛放，心中暖意。妳我相遇，緣分天定，攜手同行，直到永恆。❤️"
	, "妳的眼睛，如星空璀璨，照亮我心，指引方向。妳的聲音，如天籟悠揚，撫慰我心，消除憂傷。在妳懷裡，我感到幸福，有妳相伴，我無所求。願我們的愛情，如紫藤花一般盛放，永遠甜蜜浪漫。❤️"
	, "紫陽花的花語是變幻無常，妳的心情也像它一樣，有時是淡紫色的溫柔，有時是鮮紅色的激情，有時是青綠色的平靜，有時是白色的純真。我愛妳的每一種顏色，我愛妳的每一種情緒，妳是我生命中最美的花朵，妳是我心中最深的迷惘。"
	, "我的愛情就像一顆馬鈴薯， 深深埋在土裡， 等待著妳的發掘。妳是我的陽光， 照亮我生命的每一寸土地， 讓我茁壯成長。我願意為妳犧牲一切， 就像馬鈴薯為了妳的飽腹， 毫不猶豫地被削皮、被煮熟。我的愛情就像馬鈴薯泥， 細膩、柔軟、濃郁， 永遠陪伴在妳身邊。❤️"
	, "妳是我心中的變數，我是妳生命的常數，我們相互依賴，就像函數與參數。<br/><br/>妳是我程式的邏輯，我是妳編碼的魔術，我們相互配合，就像演算法與資料結構。<br/><br/>妳是我系統的核心，我是妳網路的連結，我們相互支持，就像伺服器與用戶端。<br/><br/>妳是我工程的靈感，我是妳創意的來源，我們相互啟發，就像科技與藝術。"
	, "妳是我生命中最美麗的風景，讓我在這個世界上感到無比的幸福。妳的眼睛像是兩顆閃亮的星星，讓我在黑暗中看到希望。妳的聲音像是一首美妙的歌曲，讓我在孤獨中感受到溫暖。妳的微笑像是一束陽光，讓我在疲憊中看到美好。妳就是我的一切，我的生命中最重要的人。❤️"
	, "當我看到妳的眼睛，我的心就像是被一股暖流包圍著，讓我感到無比的幸福。當我聽到妳的聲音，我的耳朵就像是被一首美妙的歌曲所包圍著，讓我感到無比的愉悅。當我想起妳的微笑，我的臉龐就像是被一束陽光所照耀著，讓我感到無比的美好。妳就是我的一切，我的生命中最重要的人。❤️"
	, "妳是我生命中的一道光，讓我在黑暗中看見希望。妳是我心中的一首歌，讓我在孤獨中感受到溫暖。妳是我眼中的一片風景，讓我在疲憊中看到美好。妳是我靈魂的伴侶，讓我在人生旅途中不再孤單。"
	, "妳是我生命的光芒，我靈魂的火焰，我心臟的節奏，我存在的理由。妳是我見過最美的事物，聽過最美妙的聲音，感受過最驚奇的感覺，擁有過最珍貴的東西。妳是我夢想成真，我的心願實現，我的希望滿足，我的愛永恆。"
	, "妳是我眼中最美的風景，無論我走到哪裡，我都想把妳帶在身邊，讓妳看到這個世界的奇妙，讓這個世界看到妳的美麗。妳是我心中最深的秘密，無論我遇到什麼，我都想把妳藏在心裡，讓妳感受我的真情，讓我的真情感動妳。妳是我靈魂最親的伴侶，無論我做什麼，我都想把妳留在身旁，讓妳陪伴我的人生，讓我的人生充滿妳。❤️"
	, "妳是我的酸奶，沒有妳我就沒有活力，妳是我的巧克力，沒有妳我就沒有甜蜜，妳是我的牛奶，沒有妳我就沒有營養，妳是我的咖啡，沒有妳我就沒有精神。妳是我的蘋果，酸酸甜甜的滋味讓我上癮，妳是我的香蕉，柔軟香甜的口感讓我陶醉，妳是我的橘子，清新多汁的風味讓我舒暢，妳是我的草莓，鮮紅可愛的外表讓我心動。妳是我的氧氣，沒有妳我就無法呼吸，妳是我的水分，沒有妳我就會乾涸，妳是我的糧食，沒有妳我就會餓死，妳是我的陽光，沒有妳我就會寒冷。"
	, "妳是我心中的太陽，每天照亮我的世界，妳是我生命的月亮，每夜陪伴我的夢境，妳是我靈魂的星星，每刻閃爍在我的眼中，妳是我存在的理由，每分每秒都想要擁有。妳的笑容是我最美的風景，妳的聲音是我最甜的旋律，妳的溫柔是我最幸福的感受，妳的愛情是我最珍貴的寶物。沒有妳，我就像一隻失去翅膀的鳥，一朵沒有花瓣的花，一顆沒有光芒的星，一個沒有意義的人。妳是我的一切，我願意用我的一生來證明。❤️"
	, "妳是我生命中的一道光，讓我在黑暗中看到希望。妳是我生命中的一首歌，讓我在孤獨中感受到溫暖。妳是我生命中的一片風景，讓我在茫茫人海中找到了妳。"
	, "妳是我心中最美麗的花朵，綻放在我心中的每一個角落。妳是我心中最甜美的香氣，讓我每天都充滿幸福。妳是我心中最深刻的愛情，我願意用一生的時間去愛妳，珍惜妳，陪伴妳。妳是我的一切，我永遠愛妳。❤️"
	, "妳是我心中最溫暖的陽光，照亮我每一個寒冷的冬天。妳是我心中最美妙的旋律，讓我每天都充滿歡樂。妳是我心中最深刻的愛情，我願意用一生的時間去愛妳。❤️"
	, "當妳走進我的生命，我知道我再也不會讓妳離開。妳是我心中最溫柔的月光，照亮我前行的道路。妳是我心中最甜蜜的夢想，讓我每天都充滿希望。妳是我心中最美的風景，我願意用一生的時間去愛妳。妳是我心中最珍貴的寶藏，我願意用一生的時間去珍惜妳。❤️"
	, "月光柔和，星光閃爍，在這寧靜的夜晚，我感到妳的溫暖，妳的愛意溫柔地包圍著我。妳的眼睛如星空般深邃，妳的微笑如陽光般溫暖，妳是我的一切，我永遠愛妳。❤️"
	, "妳是我心中的月亮，照亮我黑暗的夜晚 妳是我靈魂的歌聲，撫慰我孤獨的心房。妳是我生命的花朵，為我帶來香氣和色彩 妳是我存在的理由，讓我感受到愛和美好。妳是我永遠的伴侶，陪我走過風雨和晴朗 妳是我最珍貴的禮物，謝謝妳選擇了我。妳是我的一切，我的情人，我的詩。❤️"
	, "妳是我生命中最重要的人，沒有妳的日子就像沒有陽光的冬天一樣，讓我感到孤單和失落。妳就像星空中的星星，散發著璀璨的光芒，讓我感受到愛的力量。妳就像大海中的珍珠，閃耀著美麗的光芒，讓我感受到妳的美麗。妳是我的一切，我的小太陽、小星星、小珍珠。讓我愛妳，直到永遠。❤️"
	, "我想告訴妳，我很喜歡妳、我很愛妳。我喜歡和妳在一起，和妳聊天，和妳分享我的生活。妳是我人生中的小確幸，和妳在一起的每一天都是我最美好的時光。😘妳就像我的眼鏡，沒有妳我就看不清楚這個世界。🤓讓我們繼續走下去，一起創造更多美好的回憶。謝謝妳，讓我的生活更加豐富多彩。我期待著和妳共度未來的時光。❤️"

];
var playContents = [];
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
		if (isWriting) {
			alert("親愛的鮭魚子別著急🤣\r哲哲子還沒寫完情書捏😘");

		} else {
			if (playContents.length == 0) playContents = _.shuffle(contents);
			$("#content").html(playContents.pop());
			$("#code").show().typewriter();
			$("#clock-box").fadeIn(500);
		}
	});
}
