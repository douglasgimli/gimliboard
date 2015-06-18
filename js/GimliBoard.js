(function($) {

	$.fn.GimliBoard = function(options) {

		var settings = $.extend({}, $.fn.GimliBoard.defaults, options);

		return this.each(function() {
			
			var element = this;
			element.$selector = $(this).find($.fn.GimliBoard.staticOptions.DEALER_SELECTOR);
			element.$settings = settings;
			element.init = $.fn.GimliBoard.positioningBoardElements;

			$(window).on('load resize', function() {
				element.init();
			});
			element.init();

		});

	};
	
	$.fn.GimliBoard.defaults = {
		margin: 10,
		animation: true
	};

	$.fn.GimliBoard.positioningBoardElements = function() {
		var element = this;
		if (element.$selector.length > 0) {
			var $linePositions = new Array();
			var $cards = element.$selector.find($.fn.GimliBoard.staticOptions.CARDS_SELECTOR);
			if ($cards.attr('GimliBoard-width') == undefined) {
				$cards.attr('GimliBoard-width', $cards.width());
			}
			var $cardWidth = parseFloat($cards.attr('GimliBoard-width'));
			var $cardsPerLine = parseInt(((element.$selector.width()) / $cardWidth));
			var $lineWidthDifference = (element.$selector.width() - ((($cardsPerLine + 1) * ($cardWidth + element.$settings.margin)) + element.$settings.margin)) / ($cardsPerLine + 1);
			$cardWidth += $lineWidthDifference;

			var $left = element.$settings.margin;
			var $top = element.$settings.margin;

			var $cardHeight;

			$cards.each(function() {
				if ($linePositions.length > $cardsPerLine) {
					$top = $linePositions[$linePositions.length - 1].top + $linePositions[$linePositions.length - 1].height + element.$settings.margin;
					$left = $linePositions[$linePositions.length - 1].left;
					$linePositions.pop();
				}
				else {
					$left = ($linePositions.length * ($cardWidth + element.$settings.margin)) + element.$settings.margin;
				}

				if ($(this).attr('GimliBoard-height') == undefined) {
					$(this).attr('GimliBoard-height', $(this).height());
				}
				$cardHeight = parseFloat($(this).attr('GimliBoard-height')) * (parseFloat($(this).attr('GimliBoard-width')) / $cardWidth);

				$linePositions.push({ top: $top, left: $left, height: $cardHeight });
				$linePositions.sort(function(a, b) { return (a.height + a.top) - (b.height + b.top) });
				$linePositions.reverse();

				if (element.$settings.animation == true) {
					$(this).stop().animate({ left: $left, top:$top, width: $cardWidth, height: $cardHeight }, 500);
				}
				else {
					$(this).css({ left: $left, top:$top, width: $cardWidth, height: $cardHeight });
				}
			});

		}
	};

	$.fn.GimliBoard.staticOptions = {
		CARDS_SELECTOR: '.gimliCard',
		DEALER_SELECTOR: '.gimliDealer',
	};

})(jQuery);