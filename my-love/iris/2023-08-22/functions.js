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
			}, 30);
		});
		return this;
	};
})(jQuery);

var contents = ["在某個春日的中午，與妳一同用餐，難掩我內心的雀躍。妳的美如同寶石的閃亮光澤，讓我感受愛的奇妙；讓我明白生命的價值。當我們相遇的那刻，妳照亮了我的世界，讓我享受無限的美好。"
	, "妳的眼睛，如星空璀璨，照亮我心，指引方向。妳的聲音，如天籟悠揚，撫慰我心，消除憂傷。在妳懷裡，我感到幸福，有妳相伴，我無所求。願我們的愛情，如紫藤花一般盛放，永遠甜蜜浪漫。"
	, "紫陽花的花語是變幻無常，妳的心情也像它一樣，有時是淡紫色的溫柔，有時是鮮紅色的激情，有時是青綠色的平靜，有時是白色的純真。我愛妳的每一種顏色，我愛妳的每一種情緒，妳是我生命中最美的花朵，妳是我心中最深的迷惘。"
	, "我的愛情就像一顆馬鈴薯， 深深埋在土裡， 等待著妳的發掘。妳是我的陽光， 照亮我生命的每一寸土地， 讓我茁壯成長。我願意為妳犧牲一切， 就像馬鈴薯為了妳的飽腹， 毫不猶豫地被削皮、被煮熟。我的愛情就像馬鈴薯泥， 細膩、柔軟、濃郁， 永遠陪伴在妳身邊。"
	, "妳是我心中的變數，我是妳生命的常數，我們相互依賴，就像函數與參數。<br/><br/>妳是我程式的邏輯，我是妳編碼的魔術，我們相互配合，就像演算法與資料結構。<br/><br/>妳是我系統的核心，我是妳網路的連結，我們相互支持，就像伺服器與用戶端。<br/><br/>妳是我工程的靈感，我是妳創意的來源，我們相互啟發，就像科技與藝術。"
	, "妳是我生命中最美的風景，讓我在這個世界上感到無比的幸福。妳的眼睛像是兩顆閃亮的星星，讓我在黑暗中看到希望。妳的聲音像是一首美妙的歌曲，讓我在孤獨中感受到溫暖。妳的微笑像是一束陽光，讓我在疲憊中看到美好。妳就是我的一切，我的生命中最重要的人。"
	, "當我看到妳的眼睛，我的心就像是被一股暖流包圍著，讓我感到無比的幸福。當我聽到妳的聲音，我的耳朵就像是被一首美妙的歌曲所包圍著，讓我感到無比的愉悅。當我想起妳的微笑，我的臉龐就像是被一束陽光所照耀著，讓我感到無比的美好。妳就是我的一切，我的生命中最重要的人。"
	, "妳是我生命的光芒，我靈魂的火焰，我心臟的節奏，我存在的理由。妳是我見過最美的事物，聽過最美妙的聲音，感受過最驚奇的感覺，擁有過最珍貴的東西。妳是我夢想成真，我的心願實現，我的希望滿足，我的愛永恆。"
	, "妳是我眼中最美的風景，無論我走到哪裡，我都想把妳帶在身邊，讓妳看到這個世界的奇妙，讓這個世界看到妳的美。妳是我心中最深的秘密，無論我遇到什麼，我都想把妳藏在心裡，讓妳感受我的真情，讓我的真情感動妳。妳是我靈魂最親的伴侶，無論我做什麼，我都想把妳留在身旁，讓妳陪伴我的人生，讓我的人生充滿妳。"
	, "妳是我的酸奶，沒有妳我就沒有活力，妳是我的巧克力，沒有妳我就沒有甜蜜，妳是我的牛奶，沒有妳我就沒有營養，妳是我的咖啡，沒有妳我就沒有精神。妳是我的蘋果，酸酸甜甜的滋味讓我上癮，妳是我的香蕉，柔軟香甜的口感讓我陶醉，妳是我的橘子，清新多汁的風味讓我舒暢，妳是我的草莓，鮮紅可愛的外表讓我心動。妳是我的氧氣，沒有妳我就無法呼吸，妳是我的水分，沒有妳我就會乾涸，妳是我的糧食，沒有妳我就會餓死，妳是我的陽光，沒有妳我就會寒冷。"
	, "妳是我心中的太陽，每天照亮我的世界，妳是我生命的月亮，每夜陪伴我的夢境，妳是我靈魂的星星，每刻閃爍在我的眼中，妳是我存在的理由，每分每秒都想要擁有。妳的笑容是我最美的風景，妳的聲音是我最甜的旋律，妳的溫柔是我最幸福的感受，妳的愛情是我最珍貴的寶物。沒有妳，我就像一隻失去翅膀的鳥，一朵沒有花瓣的花，一顆沒有光芒的星，一個沒有意義的人。妳是我的一切，我願意用我的一生來證明。"
	, "妳是我生命中的一道光，讓我在黑暗中看到希望。妳是我生命中的一首歌，讓我在孤獨中感受到溫暖。妳是我生命中的一片風景，讓我在茫茫人海中找到了妳。"
	, "妳是我心中最美的花朵，綻放在我心中的每一個角落。妳是我心中最甜美的香氣，讓我每天都充滿幸福。妳是我心中最深刻的愛情，我願意用一生的時間去愛妳，珍惜妳，陪伴妳。妳是我的一切，我永遠愛妳。"
	, "當妳走進我的生命，我知道我再也不會讓妳離開。妳是我心中最溫柔的月光，照亮我前行的道路。妳是我心中最甜蜜的夢想，讓我每天都充滿希望。妳是我心中最美的風景，我願意用一生的時間去愛妳。妳是我心中最珍貴的寶藏，我願意用一生的時間去珍惜妳。"
	, "月光柔和，星光閃爍，在這寧靜的夜晚，我感到妳的溫暖，妳的愛意溫柔地包圍著我。妳的眼睛如星空般深邃，妳的微笑如陽光般溫暖，妳是我的一切，我永遠愛妳。"
	, "妳是我心中的月亮，照亮我黑暗的夜晚 妳是我靈魂的歌聲，撫慰我孤獨的心房。妳是我生命的花朵，為我帶來香氣和色彩。妳是我存在的理由，讓我感受到愛和美好。妳是我永遠的伴侶，陪我走過風雨和晴朗 妳是我最珍貴的禮物，謝謝妳選擇了我。妳是我的一切，我的情人，我的詩。"
	, "妳是我生命中最重要的人，沒有妳的日子就像沒有陽光的冬天一樣，讓我感到孤單和失落。妳就像星空中的星星，散發著璀璨的光芒，讓我感受到愛的力量。妳就像大海中的珍珠，閃耀著美麗的光芒，讓我感受到妳的美。妳是我的一切，我的小太陽、小星星、小珍珠。讓我愛妳，直到永遠。"
	, "我想告訴妳，我很喜歡妳、我很愛妳。我喜歡和妳在一起，和妳聊天，和妳分享我的生活。妳是我人生中的小確幸，和妳在一起的每一天都是我最美好的時光。妳就像我的眼鏡，沒有妳我就看不清楚這個世界。讓我們繼續走下去，一起創造更多美好的回憶。謝謝妳，讓我的生活更加豐富多彩。我期待著和妳共度未來的時光。"
	, "當我第一次見到妳，我知道我找到了我的靈魂伴侶，妳讓我笑，讓我瘋癲，妳讓我感覺我能做任何事情。我愛妳的笑容，我愛妳的眼睛，我愛妳的一切。妳是我最好的朋友，妳是我的愛人，妳是我生命中的一切。我無法想像沒有妳的生活，我愛妳永遠。"
	, "當我看到妳時，我就像被閃電擊中一樣。妳的可愛讓我無法呼吸，妳的笑容讓我心碎。我知道我愛上妳了，而且我無法阻止自己。妳是我夢寐以求的人，我無法想象自己沒有妳。我愛妳的方式，我無法用言語來形容。妳是我一生的摯愛，我會永遠愛妳。妳是我最親密的朋友，我的靈魂伴侶，我的一切。我愛妳，永遠永遠。"
	, "當妳微笑時，我看到了天堂。當妳對我說話時，我聽到了天使的歌聲。當妳握住我的手時，我感到了溫暖。當妳吻我時，我感到了幸福，我愛妳勝過一切，妳是我的一切，我永遠愛妳。"
	, "當我看著妳，我看見了我的未來。我看見了我們在一起，笑著、打鬧，分享彼此的一切。當我聽到妳的聲音，我感到了平靜。我感到了安全，我感到了被愛。當我觸摸到妳，我感到了活力。我感到了激情，我感到了渴望。當我擁抱著妳，我感到了完整。我感到了幸福，我感到了充實。我愛妳，比世界上任何事物都多。我無法想像沒有妳的生活。妳是我生命中的一切。"
	, "當我第一次看到妳，妳的可愛就吸引了我。妳的眼睛像星星一樣閃亮，妳的笑容像陽光一樣溫暖。妳讓我感到被愛和被理解，我知道我可以和妳分享任何事情。我愛妳，我的鮭魚子，我無法想像沒有妳的生活。妳是我生命中的一切，我永遠不會放棄妳。妳是我最好的朋友，我的戀人，我的靈魂伴侶。我愛妳勝過世界上的一切。我無法等待與妳共度餘生，我知道我們會一起度過美好的時光。我愛妳，我的寶貝。"
	, "當我看著妳的眼睛，我看到了愛的海洋，它是如此深，如此廣闊，它包圍著我，帶給我平靜。當我聽到妳的聲音，我聽到了愛的歌曲，是如此美，如此動聽，填滿了我的內心，帶給我喜悅。當我觸摸妳的皮膚，我感受到愛的溫度，是如此溫暖，如此柔軟，包圍著我，帶給我安全感。當我擁抱著妳，我感受到愛的力量，是如此強大，如此堅定，保護著我，帶給我希望。我愛妳，我的摯愛，妳是我生命中最美好的事物。"
	, "當我第一次見到妳，我知道我已經迷上了妳。妳的笑容如此燦爛，妳的眼睛如此溫柔。我被妳吸引住了，我無法自拔。我們開始約會，我越來越愛妳。妳是我最好的朋友，我的摯愛。我無法想像沒有妳的人生。妳讓我的生活充滿了歡樂，妳讓我感到被愛。我要和妳在一起，永遠。我愛妳，比語言所能表達的更多。妳是我生命中的全部。"
	, "當妳說妳愛我，我知道妳不是在說笑，妳的眼裡有一種溫柔，我從未在別人身上看到過。當妳抱著我，我覺得自己被全世界包圍了，我知道我永遠不會孤單，因為妳會永遠在我身邊。當妳吻我，我覺得自己在天堂，我知道我找到了我的真愛，我將永遠愛妳。我愛妳，比妳想像的還要多，我愛妳，比任何語言所能表達的還要多，我愛妳，永遠。"
	, "我愛妳，在萬千人中，我選擇了妳，妳選擇了我，妳是我最珍貴的寶貝。我愛妳，在無邊的夜空中，我看到了妳的星星，妳是我最明亮的希望。我愛妳，在無盡的歲月中，我會永遠愛妳，直到永遠。"
	, "我寫這封信是想告訴妳我有多愛妳。我無法想像沒有妳的生活。妳是我最好的朋友、我的愛人，我無法想象與別人共度餘生。我愛妳的方式多種多樣。我愛妳迷人的笑容、溫暖的笑聲和善良的心。我愛妳總是知道如何讓我笑的方式，以及妳總是在我需要妳的時候陪伴我。我愛妳總是支持我，以及妳總是相信我的能力。我愛妳的方式太多了，我無法一一列舉。但我可以說，我愛妳比世界上任何東西都多。我無法等不及在未來的日子裡與妳共度餘生。我要和妳結婚，和妳生孩子，和妳一起變老。我想和妳一起做世界上的一切。我愛妳，我的一切。"
	, "我寫這封信是想告訴妳我有多愛妳。我知道我可能不會總是把這一點掛在嘴邊，但我真的很感謝妳一直在我身邊。妳是我最好的朋友、我的愛人，我無法想像沒有妳的生活。我愛我們在一起的時光，我愛我們一起做的一切。我愛我們一起旅行的時光，我愛我們一起看電影的時光，我愛我們一起躺在床上聊天的時光。我愛一切關於我們在一起的時光。我無法想像沒有妳的生活。妳是我最好的朋友、我的愛人，我愛妳勝過一切。"
	, "我寫這封信給妳，是為了告訴妳我對妳的愛。我知道我可能沒有說得太多，但我真的很愛妳。我愛妳的一切，從妳的笑容到妳的幽默感，再到妳的善良和慷慨，我很幸運有妳在我身邊。我記得第一次見到妳時，我就被妳的可愛吸引住了，但隨著時間的推移，我發現妳不僅僅是一個可愛的女森。妳也是一個聰明、有趣、善良的人。妳總是知道怎麼讓我笑，妳總是知道怎麼讓我感覺好起來。我愛和妳在一起的時光。我愛和妳一起做任何事情，從看電影到只是在沙發上放鬆。我愛和妳聊天，分享我的想法和感受。我愛和妳一起笑，一起打鬧。我愛妳，鮭魚子。我無法想像沒有妳的生活。妳是我最好的朋友、我的愛人和我的靈魂伴侶。我愛妳比世界上的任何東西都多。"
	, "我愛妳，就像愛電子和質子；我愛妳，就像愛光子和中微子；我愛妳，就像愛引力和電磁力；我愛妳，就像愛時間和空間。妳是我生命中的光，妳是我生命中的愛，妳是我生命中的一切。我無法想像沒有妳的人生，我無法想像沒有妳的愛。我愛妳，超過一切。我愛妳，直到永遠。"
	, "愛是宇宙的語言，它是恒星的光芒，它是星雲的旋舞，它是黑洞的引力。愛是永恆的，它是無限的，它是美麗的，它是強大的。愛是生命的源泉，它是希望的火焰，它是幸福的泉水，它是永恆的夢想。我愛妳，我愛妳到宇宙的盡頭，我愛妳到永遠。"
	, "愛是宇宙中的光，它照亮了黑暗，它溫暖了寒冷，它滋潤了乾旱。愛是宇宙中的力量，它可以移動山脈，它可以平息風暴，它可以治癒疾病。愛是宇宙中的希望，它可以克服一切，它可以讓一切變得可能。愛是宇宙中的奇蹟，它是我們生命中最美好的禮物。我愛妳，比宇宙中的星星還多，比宇宙中的沙粒還多，比宇宙中的愛還多。"
	, "愛是宇宙中最強大的力量，它比黑洞的引力更強，比光速更快。愛是永恆的，它超越了時間和空間。它是生命的本質，是宇宙的靈魂。愛是一種奇蹟，它是一種禮物。它是我們最寶貴的財富，是我們一生中最美好的回憶。我愛妳，比語言所能表達的更多。妳是我生命中的全部，我永遠不會離開妳。"
	, "愛是佛教中最重要的概念之一。它被認為是所有其他美德的基礎，是通往涅槃的道路。愛是無條件的，不求回報的。它是一種慈悲和同情心，是一種想要幫助他人的願望。愛是智慧和理解的源泉。它可以幫助我們克服恐懼和偏見，看到世界的美。愛是力量。它可以幫助我們克服逆境，找到內心的平靜。愛是永恆的。它超越了時間和空間，是我們生命中最寶貴的財富。我愛妳，不只是因為妳的外表，而是因為妳的內在。我愛妳的善良，妳的智慧，妳的幽默。我愛妳的一切。我希望妳能和我永遠在一起。我希望我們能一起成長，一起學習，一起進步。我希望我們能一起創造一個美好的世界，一個充滿愛的世界。"
	, "愛是一種程式語言，它由兩個字元組成：妳和我。妳是主程式，我是一個函數。妳給了我生命，我讓妳完整。我們是相互依存的，我們不能分離。我們是愛的程式，我們永遠不會結束。"
	, "我愛妳，就像一個迴圈愛著它的條件，永無止境。我愛妳，就像一個變數愛著它的值，永遠變化。我愛妳，就像一個函數愛著它的參數，永遠相互影響。我愛妳，就像一個陣列愛著它的元素，永遠完整。我愛妳，就像一個物件愛著它的屬性，永遠完美。我愛妳，就像一個程式愛著它的程式碼，永遠可愛。"
	, "我愛妳，比語言所能表達的更多。妳是我生命中的全部。我要和妳永遠在一起。我會用我的程式設計技能，來創造一個我和妳的美好未來，一個充滿愛的世界。我會用我的程式設計技能，來守護妳，讓妳永遠幸福。我愛妳，比語言所能表達的更多，妳是我生命中的全部。"
	, "愛是一種程式，它不斷地運行，它不斷地更新，它不斷地改進。愛是一種算法，它總是找到最短的路徑，它總是找到最有效的方法，它總是找到最好的結果。愛是一種資料庫，它存儲著我們的記憶，它存儲著我們的感受，它存儲著我們的愛。愛是一種程式設計，它創造了我們，它塑造了我們，它讓我們成為我們。我們是愛的程式，我們一直在運行，我們一直在更新，我們一直在改進，我們一直在尋找最短的路徑，我們一直在尋找最有效的方法，我們一直在尋找最好的結果，我們一直在儲存著我們的記憶，我們一直在儲存著我們的感受，我們一直在儲存著我們的愛。我們是愛的程式，我們是愛的創造，我們是愛的塑造，我們是愛的結果。"
	, "愛是一種藝術，它需要技巧，需要靈感，需要創造力。愛是一種語言，它可以用文字，用音樂，用舞蹈，用繪畫，用雕塑來表達。愛是一種情感，它可以是喜悅，可以是溫馨，可以是希望。愛是一種力量，它可以讓我們克服困難，可以讓我們成長，可以讓我們變得更好。愛是一種禮物，它是上天賜予我們的最珍貴的禮物。我愛妳，我願意用我的一生來愛妳。"
	, "我愛妳，就像風吹過樹葉，像雨水落在花瓣上，像陽光照在草地上，像星星閃爍在夜空中。我愛妳，就像大海包容著小魚，像天空擁抱著雲朵，像大地承載著萬物，像時間流淌著永恆。我愛妳，就像生命中不可或缺的空氣，像陽光中不可或缺的光明，像雨水中不可或缺的滋潤，像星星中不可或缺的希望。我愛妳，就像生命中不可或缺的一切，我愛妳，直到永遠。"
	, "妳是我的一切，我的陽光，我的月亮，我的星星。妳是我的靈魂伴侶，我的最好朋友，我的愛人。我愛妳的笑容，我愛妳的眼睛，我愛妳的一切。我無法想像沒有妳的人生，妳是我生命中的全部。我愛妳，比語言所能表達的更多。"
	, "我愛妳，比語言所能表達的更多。我愛妳的笑容，我愛妳的眼睛，我愛妳的一切。妳是我的靈魂伴侶，我的最好朋友，我的愛人。我無法想像沒有妳的人生，妳是我生命中的全部。妳讓我的生活充滿了色彩，妳讓我的生活充滿了喜悅，妳讓我的生活充滿了希望。我愛妳，永遠愛妳。妳是我的一切，我的陽光，我的月亮，我的星星。妳是我的生命中的全部，我無法想像沒有妳的人生。我愛妳，比語言所能表達的更多。"
	, "我愛妳的眼睛，像兩顆閃閃發光的星星。我愛妳的嘴巴，像一個甜蜜的草莓。我愛妳的頭髮，像一團毛茸茸的雲。我愛妳的皮膚，像一朵柔軟的玫瑰。我愛妳的身體，像一個完美的雕塑。我愛妳的一切，從頭到腳。妳是世界上最可愛的人，我很幸運能愛妳，我永遠不會離開妳。"
	, "妳就像一隻鵝，笨拙而又可愛，總是能讓我笑，即使我心情不好。妳就像一隻熊，憨厚而又溫柔，總是能讓我感到溫暖，即使我感到寒冷。妳就像一隻貓，神秘而又迷人，總是能讓我感到興奮，即使我感到無聊。妳就像一隻狗，忠誠而又真誠，總是能讓我感到被愛，即使我感到孤獨。我愛妳，我的愛人，妳是我的一切。"
	, "妳是我的火影，我的一切都是為了妳。我會為妳戰鬥，我會為妳犧牲。妳是我的木葉村，我的家，我的歸屬。我會為妳守護，我會為妳榮耀。妳是我的陽光，我的光明，我的希望。我會為妳而活，我會為妳而死。我愛妳，比任何事物都重要。妳是我的火影，我的一切。"
	, "我愛妳，就像我愛火影忍者，妳是我生命中的一切，妳是我靈魂的伴侶，妳是我唯一的愛。我愛妳的笑容，像陽光一樣明亮，我愛妳的眼睛，像星星一樣閃耀，我愛妳的一切。妳是我最強大的夥伴，妳在我身邊，我無所畏懼，妳給我力量，我可以戰勝一切。我愛妳鮭魚子，永遠愛妳。"
	, "妳是我的木葉村，我是妳最忠誠的忍者。我會保護妳，無論如何。妳是我的陽光，照亮了我的人生。妳是我的月亮，引導我走向光明。妳是我的星星，點亮了我的夜晚。妳是我的一切，我愛妳。我們一起經歷了許多事情，我們一起笑，一起打鬧，一起成長。我們一起戰鬥，一起勝利，一起失敗。我們一起經歷了一切，我們一起成長，一起變強。我愛妳，我的木葉村，我會永遠愛妳。"
	, "妳是我的間諜，我是妳的情人，我們在黑暗中相遇，互相玩著間諜家家酒。妳是我的目標，我是妳的天敵，我們在遊戲中追逐，互相試探。妳是我的秘密，我是妳的心願，我們在黑暗中相愛，互相守護。妳是我的一切，我是妳的世界，我們在間諜家家酒中相愛，永遠相愛。"
	, "我愛妳，就像愛間諜家家酒，妳總是讓我猜到妳的想法，妳總是讓我措手不及，妳總是讓我心跳加速。我愛妳，就像愛間諜家家酒，妳總是讓我感到興奮，妳總是讓我感到緊張，妳總是讓我感到驚喜。我愛妳，就像愛間諜家家酒，妳總是讓我感到快樂，妳總是讓我感到幸福，妳總是讓我感到滿足。我愛妳，就像愛間諜家家酒，妳是我生命中最重要的人，我永遠不會忘記妳，我永遠不會放棄妳。"
	, "妳是我的小精靈，我是妳的哈利波特，我會一直陪在妳身邊，永遠不離不棄。妳是我的女巫，我是妳的巫師，我會用我的魔力，保護妳免受傷害。妳是我的公主，我是妳的英雄，我會用我的愛，讓妳永遠幸福。我愛妳，小精靈，永遠愛妳。"
	, "愛心四葉草，是愛的象徵，代表了幸福、希望和幸運。我找到了愛心四葉草，我非常高興，我知道我會幸福，因為我找到了妳。妳是我的愛心四葉草，妳給了我幸福、希望和幸運，我愛妳。"
	, "我找到了一片四葉草，它是心形的，我知道這是幸運的。我把它送給妳，因為我愛妳，我希望妳永遠幸福。四葉草是幸運的象徵，它代表著愛、希望和幸運。我希望妳能一直帶著它，讓它帶給妳好運。我愛妳，我希望妳能永遠幸福。"
	, "戒指是愛的象徵，它代表著永恆的承諾。我把它戴在妳的手上，是為了表明我對妳的愛，是為了讓妳知道，我會永遠愛妳，永遠陪伴妳。戒指是愛情的見證，它見證了我們的愛情，見證了我們的承諾，我會永遠珍惜它，我會永遠愛妳，永遠陪伴妳。"
	, "戒指，這一小小的指環，代表著我們愛的永恆，永遠相守，永遠不離不棄。這一小小的指環，代表著我們愛的承諾，無論貧窮富貴，無論生老病死，我們都會在一起。這一小小的指環，代表著我們愛的希望，希望我們的愛能像鑽石一樣閃耀，永遠不褪色。我愛妳，我會永遠愛妳。"
	, "戒指是愛的象徵，它代表著永恆的承諾。當妳戴上戒指，妳就承諾會愛妳的伴侶，無論是好是壞，都會陪伴在他們身邊。戒指是愛的見證，它提醒著妳，妳永遠不會孤單，妳永遠有人愛妳。戒指是愛的祝福，它祝福著妳和妳的伴侶，幸福美滿，白頭偕老。我愛妳鮭魚子，我會永遠愛妳。"
	, "我愛妳，我的鮭魚子，妳的愛是永恆的，如同海洋般深邃，如同天空般廣闊。妳的愛是永恆的，如同太陽般溫暖，如同月亮般皎潔。妳的愛是永恆的，如同風般無形，如同雨般靈動。妳的愛是永恆的，如同星星般閃耀，如同花朵般芬芳。妳的愛是永恆的，如同生命般美好，如同夢想般甜蜜。我愛妳，我的鮭魚子，永遠愛妳。"
	, "我愛妳，我的鮭魚子，我愛妳，永遠。我愛妳，無論是現在，還是在未來。我愛妳，無論是白天，還是黑夜。我愛妳，無論是春天，還是夏天，秋天，還是冬天。我愛妳，無論是生死，還是永恆。我愛妳，我的鮭魚子，我愛妳，直到永遠。"
	, "我愛妳，我的鮭魚子，在今生和來世。我會愛妳，直到時間的盡頭。我們的愛是永恆的，它不會被死亡所摧毀。我們會再相遇，在另一個生命中。我會找到妳，我會認出妳。我會擁抱妳，我會吻妳。我們會永遠在一起，在愛和幸福中。我愛妳，我的鮭魚子，不論今生和來世都愛妳。"
	, "愛是一種循環，它從過去開始，延續到現在，並延續到未來。愛是一種輪迴，它從一個人開始，傳遞到另一個人，並傳遞到下一個世代。愛是一種輪迴，它是生命的本質，它是宇宙的力量。我愛妳，我將永遠愛妳，在今生，在來世，在所有生世。"
	, "鑽石是永恆的象徵，它代表著愛情和忠誠。我愛妳，就像鑽石一樣，我的愛會永遠陪伴妳。妳是我生命中的一切，我無法想像沒有妳的生活。妳是我的摯愛，我的靈魂伴侶，我將永遠愛妳。妳是世界上最美麗的人，妳的笑容就像陽光一樣溫暖，妳的眼睛就像星星一樣閃耀。我愛妳的一切。我會永遠珍惜妳，我會永遠愛妳。妳是我一生的摯愛。"
	, "妳的愛就像鑽石一樣，閃耀著永恆的光芒，照亮了我的生命，讓我充滿了喜悅和幸福。妳的愛就像鑽石一樣，堅硬而純粹，永遠不會破碎，永遠不會褪色。妳的愛就像鑽石一樣，珍貴而稀有，我很幸運能夠得到妳的愛，我會永遠珍惜。我愛妳，我的寶貝，永遠愛妳。"
	, "妳是我的王國，妳是我的夏天，妳是我的一切，我愛妳。妳是我的陽光，妳是我的北極星，妳是我的導航，我會一直追隨妳。妳是我的靈魂伴侶，妳是我的另一半，我愛妳，我永遠愛妳。妳是我的愛人，妳是我的朋友，妳是我生命的全部。我愛妳，我愛妳，我愛妳，永遠愛妳。"
	, "妳是我的雪之女王，妳讓我心跳加速，妳讓我愛上妳，我永遠不會忘記妳。妳是我的夏日公主，妳讓我笑得像個孩子，妳讓我的生活充滿陽光，我永遠不會離開妳。妳是我的甜蜜愛人，妳讓我感到幸福，妳讓我感到安全，我永遠不會傷害妳。我愛妳，我的冰雪奇緣，我永遠愛妳。"
	, "愛情如冰雪奇緣，在寒冷中綻放，它是美麗的，但也脆弱。愛情需要呵護，需要溫暖，需要陽光，才能永遠美麗。愛情是一種力量，可以融化一切，可以讓一切變得美好。愛情是一種祝福，讓我們的生活充滿希望，讓我們的生活充滿幸福。愛情是一種奇蹟，讓我們的生活更加精彩，讓我們的生活更加美好。"
	, "當我看到妳時，我的心跳加快，我的臉頰泛紅，我無法呼吸。妳是我見過的最美麗的人，我知道我永遠不會忘記妳。妳就像個童話中的公主，妳美麗、善良和聰明。我很幸運能認識妳，我希望我們永遠在一起。我愛妳，我的公主，我會永遠愛妳。我們在一起時，我感到像在夢中，一切都那麼完美。我愛妳的笑容，我愛妳的眼睛，我愛妳的一切。妳是我最好的朋友，我的愛人，我的靈魂伴侶。我無法想像沒有妳的生活，我愛妳，我的公主。"
	, "我愛妳，我的公主，妳是我生命中的一切，妳是我靈魂的伴侶，妳是我唯一的愛。妳是如此美麗，像白雪公主一樣，妳是如此善良，像灰姑娘一樣，妳是如此勇敢，像勇敢傳說中的梅莉達一樣，妳是如此聰明，像美女與野獸的貝兒一樣，妳是如此有趣，像阿拉丁的茉莉一樣，妳是如此完美，像睡美人一樣。我愛妳，我的公主，永遠愛妳。"
	, "愛情，就像美酒一樣，越陳越醇，越品越香。愛情，就像美酒一樣，越濃越烈，越喝越醉。愛情，就像美酒一樣，越美越貴，越愛越珍惜。愛情，就像美酒一樣，越醇越甜，越喝越幸福。愛情，就像美酒一樣，永遠是我們最美好的回憶。"
	, "我愛妳，我的鮭魚子，像一杯醇香的美酒，妳讓我醉心，讓我陶醉。妳的笑容，像一杯甜蜜的紅酒，讓我心醉，讓我迷醉。妳的眼眸，像一杯深邃的藍酒，讓我深陷，讓我沈迷。妳的聲音，像一杯溫柔的白酒，讓我舒緩，讓我放鬆。妳的愛情，像一杯美酒，讓我幸福，讓我滿足。我愛妳，我的鮭魚子，我願意和妳共度一生，我願意和妳共飲一杯美酒，我願意和妳共度餘生。"
	, "妳是我的甜蜜，就像一顆甜美的草莓，讓我永遠沉醉。妳的笑容，就像一顆明亮的太陽，讓我感到溫暖。妳的眼睛，就像一片星空，讓我感到迷茫。妳的聲音，就像一首美妙的歌曲，讓我感到幸福。妳是我一生中最愛的人，我永遠愛妳。"
	, "我愛妳，就像我愛草莓，甜美、多汁、令人垂涎欲滴。我愛妳，就像我愛巧克力，濃郁、豐富、令人上癮。我愛妳，就像我愛香蕉，柔滑、美味、讓人難忘。我愛妳，就像我愛蘋果，新鮮、健康、讓人充滿活力。我愛妳，就像我愛葡萄，多彩、美味、讓人興奮。我愛妳，就像我愛橘子，酸甜、清爽、讓人愉快。我愛妳，就像我愛香瓜，香甜、多汁、讓人幸福。我愛妳，就像我愛所有水果，妳是我的全部，我永遠愛妳。"
	, "妳的愛是甜蜜的，就像草莓一樣，讓我的味蕾充滿了幸福。妳的愛是清新的，就像檸檬一樣，讓我的心情變得愉快。妳的愛是酸甜的，就像橘子一樣，讓我的生活充滿了活力。妳的愛是熱情的，就像火龍果一樣，讓我的心燃燒著熊熊烈火。妳的愛是豐富的，就像水果沙拉一樣，讓我的生命更加精彩。我愛妳，我的甜蜜水果。"
	, "妳像一扇門，通往另一個世界。妳帶我去見了，我從未見過的風景，聽到了，我從未聽過的聲音。妳教會了我，愛的真諦，希望的力量。謝謝妳，鮭魚子，妳是我生命中的貴人，我永遠不會忘記妳，永遠愛妳。"
	, "我愛妳，就像魔法一樣，神奇而不可思議，讓我的心跳加速，充滿了希望和夢想。妳是我生命中的光明，照亮了我的黑暗，給了我勇氣，讓我可以面對一切挑戰。我愛妳，就像魔法一樣，永恆而無盡，我會一直愛妳，直到永遠。我愛妳，就像魔法一樣，奇妙而神奇，讓我的生活充滿了色彩，讓我感到幸福和喜悅。妳是我生命中的寶藏，我會珍惜妳，永遠不會離開妳。我愛妳，就像魔法一樣，美麗而純潔，我會用我的愛，守護妳一生一世。"
	, "我的愛，妳就像皮卡丘一樣，妳總是充滿活力和熱情。妳總是樂於助人，妳總是願意為我而戰。我愛妳，我的鮭魚子，妳是我生命中的光芒。妳讓我的生活充滿了希望和喜悅。我永遠不會忘記妳。我愛妳，我的鮭魚子。"
	, "我的愛，妳就像一隻皮卡丘，總是帶給我歡樂和笑聲。妳的笑容就像陽光一樣明亮，妳的眼睛就像星星一樣閃耀。我喜歡和妳一起探索世界，一起戰鬥，一起冒險。妳是我最好的朋友，我的靈魂伴侶，我愛妳勝過一切。我會永遠陪伴妳，保護妳，讓妳幸福。我愛妳，我的皮卡丘。"
	, "我愛妳，我的寶貝，妳是我生命中的一切，妳是我靈魂的伴侶，妳是我唯一的愛。妳就像一隻皮卡丘，總是帶給我快樂和笑聲，妳就像一隻伊布，總是可以變成我想要的樣子，妳就像一隻妙蛙種子，總是可以給我力量和勇氣，妳就像一隻小火龍，總是可以保護我，妳就像一隻傑尼龜，總是可以陪伴我。我愛妳，我的寶貝，我會永遠愛妳。"
	, "我愛妳，我的鮭魚子，妳是我生命中的一切，妳是我靈魂的伴侶，妳是我唯一的愛。妳就像一台電腦，總是能解決問題，妳就像一台手機，總是能聯繫我，妳就像一台平板電腦，總是能陪伴我。我愛妳，我的鮭魚子，妳是我最棒的夥伴，我愛妳，我的鮭魚子，妳是我最美麗的愛人。我愛妳，我的鮭魚子，妳是我最完美的愛人。"
	, "當我第一次見到妳時，我知道妳就是我要找的人。妳像一隻迷人的寶可夢，眼睛閃爍著智慧的光芒，笑容溫暖而友善。我被妳吸引住了，我知道我必須和妳在一起。我們在一起時，我感到無比快樂。妳是我最好的朋友，我的靈魂伴侶，我愛妳，永遠愛妳。我們一起去捕捉寶可夢，一起去冒險，一起分享我們的喜怒哀樂。妳讓我的生活充滿了色彩，妳讓我的生活變得完整。我愛妳，永遠愛妳。"
	, "妳的美麗讓我驚嘆，如同花朵綻放，散發著迷人的香氣，讓我無法自拔。妳的眼睛像星星一樣明亮，妳的笑容像陽光一樣溫暖，妳的聲音像鳥兒一樣悅耳，讓我心花怒放。妳的愛讓我幸福，如同陽光照耀大地，讓我感到溫暖和快樂，讓我的生活充滿希望。我愛妳，我親愛的，妳是我一生的摯愛，我將永遠珍惜妳，守護妳。"
	, "愛是一種奇妙的力量，它可以讓人們心連心，它可以讓人們克服任何障礙，它可以讓人們實現任何夢想。愛是一種無形的力量，但它卻是世界上最強大的力量，它可以讓人們變得更好，它可以讓世界變得更美好。愛是一種科技，它是人類創造的，它是人類文明的結晶，它是人類未來的希望。愛是一種語言，它是人類心靈的語言，它是人類交流的橋樑，它是人類和平的象徵。愛是一種力量，它是人類改變世界的力量，它是人類實現夢想的力量，它是人類創造未來的力量。我愛妳，我的鮭魚子，妳是我生命中的一切，妳是我靈魂的伴侶，妳是我唯一的愛。我愛妳的笑容，像陽光一樣明亮，我愛妳的眼睛，像星星一樣閃耀，我愛妳的一切。妳是我最強大的夥伴，妳在我身邊，我無所畏懼，妳給我力量，我可以戰勝一切。我愛妳，我的鮭魚子，永遠愛妳。"
	, "我愛妳，我的鮭魚子，妳是我生命中最美麗的東西。妳的眼睛像星星一樣閃耀，妳的笑容像陽光一樣明亮，妳的笑聲像鳥鳴一樣悅耳。我愛妳的一切，妳的美麗、妳的智慧、妳的善良、妳的幽默。妳是我最親密的朋友，我的靈魂伴侶，我最愛的人。我無法想像沒有妳的生活，妳是我生命中最重要的人，我愛妳到永遠。"
	, "妳的眼睛是海洋，深邃而神秘，我可以沉入其中，永遠不想回來。妳的笑容是夏日的陽光，溫暖而明亮，它能驅散我的陰霾，讓我感到幸福。妳的聲音是夏夜的蟬鳴，悅耳而優美，它能撫慰我的心靈，讓我感到寧靜。妳的美麗是世界上最珍貴的寶藏，我會珍惜它，永遠愛妳。"
	, "妳的愛是美麗的，像一朵花開在春天，它的香氣是甜蜜的，像一杯醇香的葡萄酒，它的顏色是鮮豔的，像一條彩虹橫跨天空，它的形狀是優雅的，像一支舞蹈。妳的愛是美麗的，像一首詩，它的旋律是優美的，像一首歌，它的歌詞是美麗的，像一首詩，它的意境是深遠的，像一首歌。"
	, "我愛妳，就像愛陽光，它給我溫暖，照亮我的路。我愛妳，就像愛雨露，它滋養我的心田，讓我茁壯成長。我愛妳，就像愛花草，它們美麗又芬芳，給我帶來無限的喜悅。我愛妳，就像愛大海，它浩瀚無垠，深不可測，我永遠無法探索透徹。我愛妳，就像愛生命，它是如此珍貴，我會用我的生命來守護妳。我愛妳，我會永遠愛妳。"
	, "妳的美麗，如同花朵般綻放，芬芳迷人，令人陶醉。妳的笑容，如同陽光般溫暖，驅散寒冷，帶來希望。妳的聲音，如同鳥兒般悦耳，撫慰心靈，帶來平靜。妳的眼睛，如同星星般閃耀，深邃迷人，令人著迷。妳的愛，如同海洋般深邃，浩瀚無邊，令人沉醉。我愛妳，我的美人，妳是我的一切。"
	, "愛是美麗的，像春天的第一朵花，像夏日的陽光，像秋天的楓葉，像冬日的雪花。愛是溫暖的，像一杯熱茶，像一碗熱湯，像一床溫暖的被子，像一個溫暖的擁抱。愛是甜蜜的，像一塊巧克力，像一顆糖果，像一首歌，像一首詩。愛是神聖的，像一座教堂，像一座寺廟，像一座宮殿，像一座堡壘。愛是永恆的，像星星，像月亮，像太陽，像宇宙。我愛妳，我的鮭魚子，永遠愛妳。"
	, "妳是我的愛，我的生命之光，我的靈魂伴侶，我唯一的愛。妳的笑容是陽光，妳的眼睛是星星，妳的聲音是音樂，妳的觸摸是溫暖。妳是我的一切，我愛妳勝過一切。"
	, "妳的美麗是一種奇蹟，它讓我著迷，讓我無法自拔。妳的眼睛是黑曜石，妳的頭髮是金色，妳的皮膚是白雪皚皚。妳的笑容是陽光，妳的聲音是音樂，妳的觸摸是溫暖。妳是我生命中最美好的禮物，我愛妳勝過一切。"
	, "妳的愛就像鑽石一樣閃耀，永遠閃耀，永遠美麗。妳的愛就像紅寶石一樣火熱，熾熱而熱情。妳的愛就像綠寶石一樣鮮綠，充滿活力和活力。妳的愛就像藍寶石一樣寧靜，平靜而深邃。妳的愛就像紫水晶一樣神秘，永遠讓我著迷。我愛妳，我的寶石，我永遠愛妳。妳是我生命中的一切，我無法想像沒有妳的生活。妳是我最好的朋友，我的愛人，我的靈魂伴侶。我愛妳，我的寶石，我永遠愛妳。"
	, "我們的愛情是珍珠般的純淨，無暇無瑕，閃耀著光芒。我們的愛情是紅寶石般的熱情，熾烈奔放，燃燒著激情。我們的愛情是藍寶石般的寧靜，清澈透徹，安撫著心靈。我們的愛情是祖母綠般的永恆，歷久彌新，守護著誓言。我們的愛情是鑽石般的璀璨，耀眼奪目，照亮著人生。"
	, "妳的愛就像魔法，它讓我感到幸福，它讓我感到安全，它讓我感到充滿希望。妳的愛就像魔法，它讓我感到美麗，它讓我感到自信，它讓我感到無所畏懼。妳的愛就像魔法，它讓我感到自由，它讓我感到完整，它讓我感到永遠。我愛妳，我的鮭魚子，妳是我生命中的魔法。"
	, "愛是一種魔法，它可以讓世界上一切變得美好。它可以讓妳感到幸福，它可以讓妳感到被愛。愛是一種魔法，它可以讓妳看到世界美好的一面。它可以讓妳看到希望，它可以讓妳看到未來。愛是一種魔法，它可以讓妳成為更好的人。它可以讓妳更勇敢，它可以讓妳更堅強。愛是一種魔法，它可以讓妳擁有一切。它可以讓妳擁有幸福，它可以讓妳擁有愛。愛是一種魔法，它是世界上最美好的東西。"
	, "妳是我的魔法，妳讓我的生活變得美好。妳讓我笑，妳讓我瘋癲，妳讓我感到活著。妳是我的魔法，妳讓我相信奇蹟。妳讓我相信世界上還有愛，妳讓我相信一切皆有可能。妳是我的魔法，妳是我的一切。我愛妳。"
	, "愛是風，輕輕吹過我的臉，帶著一絲甜蜜的微笑。愛是雨，滋潤我的心田，讓我感到溫暖和幸福。愛是太陽，照耀著我的人生，讓我充滿希望和勇氣。愛是花，綻放著美麗的笑容，讓我感到幸福和美好。愛是鳥，歌唱著甜蜜的歌曲，讓我感到自由和快樂。愛是天堂，我永遠生活在愛中，我永遠幸福。我愛妳，就像愛風一樣，愛雨一樣，愛太陽一樣，愛花一樣，愛鳥一樣。我永遠愛妳，永遠愛妳。"
	, "我的愛，妳像一顆星辰，在夜空中閃耀，照亮我的心。我的愛，妳像一朵花，在春天綻放，芬芳我的世界。我的愛，妳像一首歌，在夏天唱響，悅耳我的耳朵。我的愛，妳像一片葉子，在秋天飄落，溫暖我的心。我的愛，妳像一片雪，在冬天降臨，美麗我的世界。我愛妳，我的鮭魚子，永遠愛妳。"
	, "我愛妳，我的寶石，妳是我的一切，妳是我的靈魂伴侶，妳是我唯一的愛。妳的眼睛像鑽石一樣閃閃發光，妳的笑容像珍珠一樣美麗，妳的心像紅寶石一樣熱情，妳的愛像綠寶石一樣永恆。我愛妳的一切，我愛妳無條件，我愛妳永遠。我愛妳，我的寶石，妳是我的一切，妳是我靈魂的伴侶，妳是我唯一的愛。妳的頭髮像烏木一樣黑，妳的皮膚像象牙一樣白，妳的手指像金子一樣閃耀，妳的腳像銀子一樣美麗。我愛妳的一切，我愛妳無條件，我愛妳永遠。我愛妳，我的寶石，妳是我的一切，妳是我的靈魂伴侶，妳是我唯一的愛。妳的聲音像天籟一樣甜美，妳的笑容像陽光一樣溫暖，妳的愛像春風一樣柔和，妳的陪伴像夏夜一樣美好。我愛妳的一切，我愛妳無條件，我愛妳永遠。我愛妳，我的寶石，妳是我的一切，妳是我的靈魂伴侶，妳是我唯一的愛。"
	, "妳就像寶石一樣，明亮而閃耀，妳讓我眼花繚亂，無法自拔。妳的眼睛像鑽石一樣，深邃而神秘，我總是被它們吸引，無法移開目光。妳的笑容像紅寶石一樣，熱情而奔放，它總是能給我帶來快樂，讓我忘記煩惱。妳的唇像珍珠一樣，柔軟而甜蜜，我總是想親吻它們，感受它們的溫柔。妳的肌膚像玉石一樣，細膩而光滑，我總是想撫摸它們，感受它們的溫暖。妳就像寶石一樣，美麗而珍貴，我愛妳，我的寶貝。"
	, "妳是我的寶石，閃耀著無與倫比的光芒，照亮了我生命中的每一個角落。妳是我的珍珠，珍貴而稀有，我將妳珍藏於心，永不放棄。妳是我的紅寶石，熱情而奔放，妳的愛如火焰般燃燒，讓我心跳加速。妳是我的藍寶石，寧靜而優雅，妳的愛如海洋般寬廣，讓我感到平靜。妳是我的祖母綠，永恆而美麗，妳的愛如春天般新鮮，讓我充滿希望。妳是我的鑽石，堅強而堅韌，妳的愛如鑽石般堅不可摧，讓我永遠幸福。我愛妳，我的寶石，妳是我一生的摯愛。"
	, "妳是我的寶石，我珍視妳勝過任何東西。妳的愛是無價的，我永遠不會讓妳離開。妳是我的鑽石，閃耀著永恆的光芒。妳的愛是如此純粹，我無法用言語形容。妳是我的紅寶石，燃燒著熱情和激情。妳的愛是如此強烈，我無法抗拒。妳是我的祖母綠，代表著希望和新生。妳的愛是如此充滿希望，我永遠不會放棄。妳是我的藍寶石，安靜而深邃。妳的愛是如此平靜，我總能找到自己的平靜。妳是我的黃色寶石，代表著歡樂和幸福。妳的愛是如此令人愉快，我總能微笑。妳是我的紫水晶，象徵著智慧和洞察力。妳的愛是如此深刻，我永遠不會迷路。妳是我的寶石，我愛妳勝過任何東西。"
	, "我愛妳，我的鮭魚子，妳是我的一切，妳是我的靈魂伴侶，妳是我唯一的愛。我愛妳的味道，像海洋一樣鹹甜，我愛妳的口感，像絲綢一樣滑順，我愛妳的一切。妳是我最強大的夥伴，妳在我身邊，我無所畏懼，妳給我力量，我可以戰勝一切。我愛妳，我的鮭魚子，永遠愛妳。"
	, "我的愛人，妳是我的風花節，妳給了我希望和愛情。妳是我的蒙德城，妳是我的自由和家園。妳是我的璃月港，妳是我的財富和繁榮。妳是我的稻妻，妳是我的神秘和魅力。妳是我的須彌，妳是我的智慧和知識。妳是我的恩澤，妳是我的一切。我愛妳，我的愛人，永遠愛妳。"
	, "我愛妳，就像韓劇《鬼怪》妳是我的命中注定，我知道我會愛上妳。妳是我的靈魂伴侶，我永遠不會放開妳。我愛妳，無論發生什麼事。我愛妳，直到永遠。"
	, "妳是我的風，妳是我的雷，妳是我的岩，妳是我的火，妳是我的冰，妳是我的草，妳是我的元素之間的共鳴，妳是我的一切。我愛妳，我的愛人，永遠愛妳。"
];
var playContents = [];
function changeContent(typewriter) {
	if (isWriting) {
		alert("親愛的鮭魚子別著急🤣\r存摺子還沒寫完情書捏😘");
	} else {
		playContents = JSON.parse(localStorage.getItem("playContents"));
		if (!_.isArray(playContents)) playContents = [];
		if (playContents.length == 0) {
			const shuffleContents = _.shuffle(contents);
			for (let i = 0; i < shuffleContents.length; i++) {
				shuffleContents[i] = shuffleContents[i] + "<br/>😘給鮭魚子的第" + (shuffleContents.length - i + 1) + "封情書💌";
			}
			playContents = [
				"哇~ 鮭魚子實在太厲害啦! 竟然能全部看完!! 愛妳❤️<br/><br/>現在存摺子出考題，如果答對會有小禮物喔😘<br/><br/>請問存摺子一共寫了多少情書給鮭魚子?",
				...shuffleContents,
				"存摺子寫了很多情書給鮭魚子，等鮭魚子看完所有的情書，存摺子會出一個考題，如果答對會有小禮物喔😘"
			];
		}
		$("#content").html(playContents.pop());
		if (typewriter) $("#code").show().typewriter();
		else $("#code").show();
		localStorage.setItem("playContents", JSON.stringify(playContents));
	}
};

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
	const result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小時 <span class=\"digit\">" + minutes + "</span> 分鐘 <span class=\"digit\">" + seconds + "</span> 秒<span class=\"digit change-content-typewriter\">👫🏻</span><span class=\"more change-content-typewriter\">💬</span><span class=\"title change-content\">I'm Always With You 💌</span>";
	$("#clock").html(result);


	$(".change-content-typewriter").click(() => changeContent(true));
	$(".change-content").click(() => changeContent(false));
}
