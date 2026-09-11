/**
 * 互動功能與工具函式庫
 * 包括視窗監聽、文字打字機特效、情書切換以及認識紀念日時鐘計算
 */

// 全域打字狀態旗標
window.isWriting = false;

// 視窗大小變更監聽：若長寬皆有變化則重新整理頁面以重繪 Canvas
(function initWindowResizeHandler() {
	const $win = $(window);
	const initialWidth = $win.width();
	const initialHeight = $win.height();

	$win.resize(function () {
		const newWidth = $win.width();
		const newHeight = $win.height();
		if (newWidth !== initialWidth && newHeight !== initialHeight) {
			location.replace(location.href);
		}
	});
})();

// jQuery 打字機特效外掛
(function ($) {
	$.fn.typewriter = function () {
		return this.each(function () {
			const $element = $(this);
			const fullText = $element.html();
			let progress = 0;

			$element.html('');
			const timer = setInterval(function () {
				window.isWriting = true;
				const char = fullText.charAt(progress);

				if (char === '<') {
					// 遇到 HTML 標籤時直接快進至標籤結尾
					progress = fullText.indexOf('>', progress) + 1;
				} else {
					progress++;
				}

				// 奇數進度顯示游標下劃線 '_' 模擬打字效果
				const cursor = (progress % 2 === 1) ? '_' : '';
				$element.html(fullText.substring(0, progress) + cursor);

				if (progress >= fullText.length) {
					clearInterval(timer);
					$element.html(fullText.substring(0, progress));
					window.isWriting = false;
				}
			}, 30);
		});
	};
})(jQuery);

/**
 * 建立並初始化隨機情書播放清單
 * @returns {string[]}
 */
function createShuffledPlayList() {
	const sourceList = (typeof contents !== 'undefined') ? contents : [];
	const shuffled = _.shuffle(sourceList);
	const totalCount = shuffled.length;

	const letterCards = shuffled.map(function (letterText, index) {
		const letterNumber = totalCount - index + 1;
		return letterText + "<br/>😘給鮭魚子的第" + letterNumber + "封情書💌";
	});

	return [
		"哇~ 鮭魚子實在太厲害啦! 竟然能全部看完!! 愛妳❤️<br/><br/>現在存摺子出考題，如果答對會有小禮物喔😘<br/><br/>請問存摺子一共寫了多少情書給鮭魚子?",
		...letterCards,
		"存摺子寫了很多情書給鮭魚子，等鮭魚子看完所有的情書，存摺子會出一個考題，如果答對會有小禮物喔😘"
	];
}

/**
 * 切換顯示下一封情書
 * @param {boolean} isTypewriterMode 是否以打字機效果呈現
 */
function changeContent(isTypewriterMode) {
	if (window.isWriting) {
		alert("親愛的鮭魚子別著急🤣\r存摺子還沒寫完情書捏😘");
		return;
	}

	let playContents = [];
	try {
		const cached = localStorage.getItem("playContents");
		if (cached) {
			playContents = JSON.parse(cached);
		}
	} catch (e) {
		playContents = [];
	}

	if (!_.isArray(playContents) || playContents.length === 0) {
		playContents = createShuffledPlayList();
	}

	const nextLetter = playContents.pop();
	$("#content").html(nextLetter);

	const $code = $("#code").show();
	if (isTypewriterMode) {
		$code.typewriter();
	}

	localStorage.setItem("playContents", JSON.stringify(playContents));
}

/**
 * 數字補零工具函式
 * @param {number} value
 * @returns {string}
 */
function padZero(value) {
	return String(value).padStart(2, '0');
}

/**
 * 計算自指定日期至今的時間差並更新時鐘顯示
 * @param {Date} startDate 紀念日起始日期
 */
function timeElapse(startDate) {
	const now = new Date();
	let diffSeconds = Math.max(0, Math.floor((now.getTime() - startDate.getTime()) / 1000));

	const days = Math.floor(diffSeconds / (3600 * 24));
	diffSeconds %= (3600 * 24);

	const hours = padZero(Math.floor(diffSeconds / 3600));
	diffSeconds %= 3600;

	const minutes = padZero(Math.floor(diffSeconds / 60));
	const seconds = padZero(diffSeconds % 60);

	const clockHtml = "第 <span class=\"digit\">" + days + "</span> 天 "
		+ "<span class=\"digit\">" + hours + "</span> 小時 "
		+ "<span class=\"digit\">" + minutes + "</span> 分鐘 "
		+ "<span class=\"digit\">" + seconds + "</span> 秒"
		+ "<span class=\"digit change-content-typewriter\">👫🏻</span>"
		+ "<span class=\"more change-content-typewriter\">💬</span>"
		+ "<span class=\"title change-content\">I'm Always With You 💌</span>";

	$("#clock").html(clockHtml);
}

// 註冊時鐘上的互動按鈕點擊委派（避免計時器重複綁定造成事件堆疊與記憶體洩漏）
$(document).ready(function () {
	$(document).on("click", ".change-content-typewriter", function () {
		changeContent(true);
	});

	$(document).on("click", ".change-content", function () {
		changeContent(false);
	});
});
