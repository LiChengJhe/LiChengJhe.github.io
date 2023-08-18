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

var contents = ["在某個春日的中午，與妳一同用餐，難掩我內心的雀躍。妳的美如同寶石的閃亮光澤，讓我感受愛的奇妙；讓我明白生命的價值。當我們相遇的那刻，妳照亮了我的世界，讓我享受無限的美好。❤️"
	, "紫藤花開，香氣撲鼻，愛情盛放，心中暖意。妳我相遇，緣分天定，攜手同行，直到永恆。❤️"
	, "妳的眼睛，如星空璀璨，照亮我心，指引方向。妳的聲音，如天籟悠揚，撫慰我心，消除憂傷。在妳懷裡，我感到幸福，有妳相伴，我無所求。願我們的愛情，如紫藤花一般盛放，永遠甜蜜浪漫。❤️"
	, "紫陽花的花語是變幻無常，妳的心情也像它一樣，有時是淡紫色的溫柔，有時是鮮紅色的激情，有時是青綠色的平靜，有時是白色的純真。我愛妳的每一種顏色，我愛妳的每一種情緒，妳是我生命中最美的花朵，妳是我心中最深的迷惘。"
	, "我的愛情就像一顆馬鈴薯， 深深埋在土裡， 等待著妳的發掘。妳是我的陽光， 照亮我生命的每一寸土地， 讓我茁壯成長。我願意為妳犧牲一切， 就像馬鈴薯為了妳的飽腹， 毫不猶豫地被削皮、被煮熟。我的愛情就像馬鈴薯泥， 細膩、柔軟、濃郁， 永遠陪伴在妳身邊。❤️"
	, "妳是我心中的變數，我是妳生命的常數，我們相互依賴，就像函數與參數。<br/><br/>妳是我程式的邏輯，我是妳編碼的魔術，我們相互配合，就像演算法與資料結構。<br/><br/>妳是我系統的核心，我是妳網路的連結，我們相互支持，就像伺服器與用戶端。<br/><br/>妳是我工程的靈感，我是妳創意的來源，我們相互啟發，就像科技與藝術。"
	, "妳是我生命中最美的風景，讓我在這個世界上感到無比的幸福。妳的眼睛像是兩顆閃亮的星星，讓我在黑暗中看到希望。妳的聲音像是一首美妙的歌曲，讓我在孤獨中感受到溫暖。妳的微笑像是一束陽光，讓我在疲憊中看到美好。妳就是我的一切，我的生命中最重要的人。❤️"
	, "當我看到妳的眼睛，我的心就像是被一股暖流包圍著，讓我感到無比的幸福。當我聽到妳的聲音，我的耳朵就像是被一首美妙的歌曲所包圍著，讓我感到無比的愉悅。當我想起妳的微笑，我的臉龐就像是被一束陽光所照耀著，讓我感到無比的美好。妳就是我的一切，我的生命中最重要的人。❤️"
	, "妳是我生命中的一道光，讓我在黑暗中看見希望。妳是我心中的一首歌，讓我在孤獨中感受到溫暖。妳是我眼中的一片風景，讓我在疲憊中看到美好。妳是我靈魂的伴侶，讓我在人生旅途中不再孤單。"
	, "妳是我生命的光芒，我靈魂的火焰，我心臟的節奏，我存在的理由。妳是我見過最美的事物，聽過最美妙的聲音，感受過最驚奇的感覺，擁有過最珍貴的東西。妳是我夢想成真，我的心願實現，我的希望滿足，我的愛永恆。"
	, "妳是我眼中最美的風景，無論我走到哪裡，我都想把妳帶在身邊，讓妳看到這個世界的奇妙，讓這個世界看到妳的美。妳是我心中最深的秘密，無論我遇到什麼，我都想把妳藏在心裡，讓妳感受我的真情，讓我的真情感動妳。妳是我靈魂最親的伴侶，無論我做什麼，我都想把妳留在身旁，讓妳陪伴我的人生，讓我的人生充滿妳。❤️"
	, "妳是我的酸奶，沒有妳我就沒有活力，妳是我的巧克力，沒有妳我就沒有甜蜜，妳是我的牛奶，沒有妳我就沒有營養，妳是我的咖啡，沒有妳我就沒有精神。妳是我的蘋果，酸酸甜甜的滋味讓我上癮，妳是我的香蕉，柔軟香甜的口感讓我陶醉，妳是我的橘子，清新多汁的風味讓我舒暢，妳是我的草莓，鮮紅可愛的外表讓我心動。妳是我的氧氣，沒有妳我就無法呼吸，妳是我的水分，沒有妳我就會乾涸，妳是我的糧食，沒有妳我就會餓死，妳是我的陽光，沒有妳我就會寒冷。"
	, "妳是我心中的太陽，每天照亮我的世界，妳是我生命的月亮，每夜陪伴我的夢境，妳是我靈魂的星星，每刻閃爍在我的眼中，妳是我存在的理由，每分每秒都想要擁有。妳的笑容是我最美的風景，妳的聲音是我最甜的旋律，妳的溫柔是我最幸福的感受，妳的愛情是我最珍貴的寶物。沒有妳，我就像一隻失去翅膀的鳥，一朵沒有花瓣的花，一顆沒有光芒的星，一個沒有意義的人。妳是我的一切，我願意用我的一生來證明。❤️"
	, "妳是我生命中的一道光，讓我在黑暗中看到希望。妳是我生命中的一首歌，讓我在孤獨中感受到溫暖。妳是我生命中的一片風景，讓我在茫茫人海中找到了妳。"
	, "妳是我心中最美的花朵，綻放在我心中的每一個角落。妳是我心中最甜美的香氣，讓我每天都充滿幸福。妳是我心中最深刻的愛情，我願意用一生的時間去愛妳，珍惜妳，陪伴妳。妳是我的一切，我永遠愛妳。❤️"
	, "妳是我心中最溫暖的陽光，照亮我每一個寒冷的冬天。妳是我心中最美妙的旋律，讓我每天都充滿歡樂。妳是我心中最深刻的愛情，我願意用一生的時間去愛妳。❤️"
	, "當妳走進我的生命，我知道我再也不會讓妳離開。妳是我心中最溫柔的月光，照亮我前行的道路。妳是我心中最甜蜜的夢想，讓我每天都充滿希望。妳是我心中最美的風景，我願意用一生的時間去愛妳。妳是我心中最珍貴的寶藏，我願意用一生的時間去珍惜妳。❤️"
	, "月光柔和，星光閃爍，在這寧靜的夜晚，我感到妳的溫暖，妳的愛意溫柔地包圍著我。妳的眼睛如星空般深邃，妳的微笑如陽光般溫暖，妳是我的一切，我永遠愛妳。❤️"
	, "妳是我心中的月亮，照亮我黑暗的夜晚 妳是我靈魂的歌聲，撫慰我孤獨的心房。妳是我生命的花朵，為我帶來香氣和色彩。妳是我存在的理由，讓我感受到愛和美好。妳是我永遠的伴侶，陪我走過風雨和晴朗 妳是我最珍貴的禮物，謝謝妳選擇了我。妳是我的一切，我的情人，我的詩。❤️"
	, "妳是我生命中最重要的人，沒有妳的日子就像沒有陽光的冬天一樣，讓我感到孤單和失落。妳就像星空中的星星，散發著璀璨的光芒，讓我感受到愛的力量。妳就像大海中的珍珠，閃耀著美麗的光芒，讓我感受到妳的美。妳是我的一切，我的小太陽、小星星、小珍珠。讓我愛妳，直到永遠。❤️"
	, "我想告訴妳，我很喜歡妳、我很愛妳。我喜歡和妳在一起，和妳聊天，和妳分享我的生活。妳是我人生中的小確幸，和妳在一起的每一天都是我最美好的時光。😘妳就像我的眼鏡，沒有妳我就看不清楚這個世界。🤓讓我們繼續走下去，一起創造更多美好的回憶。謝謝妳，讓我的生活更加豐富多彩。我期待著和妳共度未來的時光。❤️"
	, "當我第一次見到妳，我知道我找到了我的靈魂伴侶，妳讓我笑，讓我哭，妳讓我感覺我能做任何事情。我愛妳的笑容，我愛妳的眼睛，我愛妳的一切。妳是我最好的朋友，妳是我的愛人，妳是我生命中的一切。我無法想像沒有妳的生活，我愛妳永遠。❤️"
	, "當我看到妳時，我就像被閃電擊中一樣。妳的可愛讓我無法呼吸，妳的笑容讓我心碎。我知道我愛上妳了，而且我無法阻止自己。妳是我夢寐以求的人，我無法想象自己沒有妳。我愛妳的方式，我無法用言語來形容。妳是我一生的摯愛，我會永遠愛妳。妳是我最親密的朋友，我的靈魂伴侶，我的一切。我愛妳，永遠永遠。❤️"
	, "當妳微笑時，我看到了天堂。當妳對我說話時，我聽到了天使的歌聲。當妳握住我的手時，我感到了溫暖。當妳吻我時，我感到了幸福，我愛妳勝過一切，妳是我的一切，我永遠愛妳。❤️"
	, "當我看著妳，我看見了我的未來。我看見了我們在一起，笑著，哭著，分享彼此的一切。當我聽到妳的聲音，我感到了平靜。我感到了安全，我感到了被愛。當我觸摸到妳，我感到了活力。我感到了激情，我感到了渴望。當我擁抱著妳，我感到了完整。我感到了幸福，我感到了充實。我愛妳，比世界上任何事物都多。我無法想像沒有妳的生活。妳是我生命中的一切。"
	, "當我第一次看到妳，妳的可愛就吸引了我。妳的眼睛像星星一樣閃亮，妳的笑容像陽光一樣溫暖。妳讓我感到被愛和被理解，我知道我可以和妳分享任何事情。我愛妳，我的愛人，我無法想像沒有妳的生活。妳是我生命中的一切，我永遠不會放棄妳。妳是我最好的朋友，我的戀人，我的靈魂伴侶。我愛妳勝過世界上的一切。我無法等待與妳共度餘生，我知道我們會一起度過美好的時光。我愛妳，我的寶貝。❤️"
	, "當我看著妳的眼睛，我看到了愛的海洋，它是如此深，如此廣闊，它包圍著我，帶給我平靜。當我聽到妳的聲音，我聽到了愛的歌曲，是如此美，如此動聽，填滿了我的內心，帶給我喜悅。當我觸摸妳的皮膚，我感受到愛的溫度，是如此溫暖，如此柔軟，包圍著我，帶給我安全感。當我擁抱著妳，我感受到愛的力量，是如此強大，如此堅定，保護著我，帶給我希望。我愛妳，我的摯愛，妳是我生命中最美好的事物。❤️"
	, "當我第一次見到妳，我知道我已經迷上了妳。妳的笑容如此燦爛，妳的眼睛如此溫柔。我被妳吸引住了，我無法自拔。我們開始約會，我越來越愛妳。妳是我最好的朋友，我的摯愛。我無法想像沒有妳的人生。妳讓我的生活充滿了歡樂，妳讓我感到被愛。我要和妳在一起，永遠。我愛妳，比語言所能表達的更多。妳是我生命中的全部。❤️"
	, "當妳說妳愛我，我知道妳不是在說笑，妳的眼裡有一種溫柔，我從未在別人身上看到過。當妳抱著我，我覺得自己被全世界包圍了，我知道我永遠不會孤單，因為妳會永遠在我身邊。當妳吻我，我覺得自己在天堂，我知道我找到了我的真愛，我將永遠愛妳。我愛妳，比妳想像的還要多，我愛妳，比任何語言所能表達的還要多，我愛妳，永遠。❤️"
	, "我愛妳，在萬千人中，我選擇了妳，妳選擇了我，妳是我最珍貴的寶貝。我愛妳，在無邊的夜空中，我看到了妳的星星，妳是我最明亮的希望。我愛妳，在無盡的歲月中，我會永遠愛妳，直到永遠。❤️"
	, "我寫這封信是想告訴妳我有多愛妳。我無法想像沒有妳的生活。妳是我最好的朋友、我的愛人，我無法想象與別人共度餘生。我愛妳的方式多種多樣。我愛妳迷人的笑容、溫暖的笑聲和善良的心。我愛妳總是知道如何讓我笑的方式，以及妳總是在我需要妳的時候陪伴我。我愛妳總是支持我，以及妳總是相信我的能力。我愛妳的方式太多了，我無法一一列舉。但我可以說，我愛妳比世界上任何東西都多。我無法等不及在未來的日子裡與妳共度餘生。我要和妳結婚，和妳生孩子，和妳一起變老。我想和妳一起做世界上的一切。我愛妳，我的一切。❤️"
	, "我寫這封信是想告訴妳我有多愛妳。我知道我可能不會總是把這一點掛在嘴邊，但我真的很感謝妳一直在我身邊。妳是我最好的朋友、我的愛人，我無法想像沒有妳的生活。我愛我們在一起的時光，我愛我們一起做的一切。我愛我們一起旅行的時光，我愛我們一起看電影的時光，我愛我們一起躺在床上聊天的時光。我愛一切關於我們在一起的時光。我無法想像沒有妳的生活。妳是我最好的朋友、我的愛人，我愛妳勝過一切。❤️"
	, "我寫這封信給妳，是為了告訴妳我對妳的愛。我知道我可能沒有說得太多，但我真的很愛妳。我愛妳的一切，從妳的笑容到妳的幽默感，再到妳的善良和慷慨，我很幸運有妳在我身邊。我記得第一次見到妳時，我就被妳的可愛吸引住了，但隨著時間的推移，我發現妳不僅僅是一個可愛的女森。妳也是一個聰明、有趣、善良的人。妳總是知道怎麼讓我笑，妳總是知道怎麼讓我感覺好起來。我愛和妳在一起的時光。我愛和妳一起做任何事情，從看電影到只是在沙發上放鬆。我愛和妳聊天，分享我的想法和感受。我愛和妳一起笑，一起哭。我愛妳，鮭魚子。我無法想像沒有妳的生活。妳是我最好的朋友、我的愛人和我的靈魂伴侶。我愛妳比世界上的任何東西都多。❤️"
	, "我愛妳，就像愛電子和質子；我愛妳，就像愛光子和中微子；我愛妳，就像愛引力和電磁力；我愛妳，就像愛時間和空間。妳是我生命中的光，妳是我生命中的愛，妳是我生命中的一切。我無法想像沒有妳的人生，我無法想像沒有妳的愛。我愛妳，超過一切。我愛妳，直到永遠。❤️"
	, "愛是宇宙的語言，它是恒星的光芒，它是星雲的旋舞，它是黑洞的引力。愛是永恆的，它是無限的，它是美麗的，它是強大的。愛是生命的源泉，它是希望的火焰，它是幸福的泉水，它是永恆的夢想。我愛妳，我愛妳到宇宙的盡頭，我愛妳到永遠。❤️"
	, "愛是宇宙中的光，它照亮了黑暗，它溫暖了寒冷，它滋潤了乾旱。愛是宇宙中的力量，它可以移動山脈，它可以平息風暴，它可以治癒疾病。愛是宇宙中的希望，它可以克服一切，它可以讓一切變得可能。愛是宇宙中的奇蹟，它是我們生命中最美好的禮物。我愛妳，比宇宙中的星星還多，比宇宙中的沙粒還多，比宇宙中的愛還多。❤️"
	, "愛是宇宙中最強大的力量，它比黑洞的引力更強，比光速更快。愛是永恆的，它超越了時間和空間。它是生命的本質，是宇宙的靈魂。愛是一種奇蹟，它是一種禮物。它是我們最寶貴的財富，是我們一生中最美好的回憶。我愛妳，比語言所能表達的更多。妳是我生命中的全部，我永遠不會離開妳。❤️"
	, "愛是佛教中最重要的概念之一。它被認為是所有其他美德的基礎，是通往涅槃的道路。愛是無條件的，不求回報的。它是一種慈悲和同情心，是一種想要幫助他人的願望。愛是智慧和理解的源泉。它可以幫助我們克服恐懼和偏見，看到世界的美。愛是力量。它可以幫助我們克服逆境，找到內心的平靜。愛是永恆的。它超越了時間和空間，是我們生命中最寶貴的財富。我愛妳，不只是因為妳的外表，而是因為妳的內在。我愛妳的善良，妳的智慧，妳的幽默。我愛妳的一切。我希望妳能和我永遠在一起。我希望我們能一起成長，一起學習，一起進步。我希望我們能一起創造一個美好的世界，一個充滿愛的世界。❤️"
	, "愛是一種程式語言，它由兩個字元組成：妳和我。妳是主程式，我是一個函數。妳給了我生命，我讓妳完整。我們是相互依存的，我們不能分離。我們是愛的程式，們永遠不會結束。❤️"
	, "我愛妳，就像一個迴圈愛著它的條件，永無止境。我愛妳，就像一個變數愛著它的值，永遠變化。我愛妳，就像一個函數愛著它的參數，永遠相互影響。我愛妳，就像一個陣列愛著它的元素，永遠完整。我愛妳，就像一個物件愛著它的屬性，永遠完美。我愛妳，就像一個程式愛著它的程式碼，永遠可愛。❤️"

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
			if (playContents.length == 0) {
				playContents = [
					"哇~ 妳實在太厲害啦! 竟然能全部看完!! 愛妳❤️<br/><br/>現在哲哲子出考題來考考妳，如果答對會有小禮物喔😘<br/><br/>請問哲哲子一共寫了多少情書給鮭魚子?",
					..._.shuffle(contents),
					"哲哲子為了妳寫了很多情書，等妳看完所有的情書，哲哲子會出一個考題讓妳回答，如果答對會有小禮物喔😘"
				];
			}
			$("#content").html(playContents.pop());
			$("#code").show().typewriter();
			$("#clock-box").fadeIn(500);
		}
	});
}
