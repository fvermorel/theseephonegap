(function( $ ) {
	// Panorama (mouvement horizontal continuel) :
	// - durée de translation (ms)
	$.fn.panning = function(options) {
		var settings = $.extend({
			'duration'	: 10000
		}, options);
		
		return this.each(function() {
			var width		= $(this).width(),
				x			= parseInt($(this).css('left')),
				x_max		= $('body').width() + width,
				duration	= settings.duration * (x_max - x) / x_max;
			
			$(this).animate({ left: x_max + 'px' }, duration, 'linear', function() {
				$(this).css({ left: '-' + width + 'px' });
				$(this).panning(settings);
			});
		});
	};
	
	// Scintillement :
	// - durée de scintillement (ms)
	$.fn.spark = function(options) {
		var settings = $.extend({
			'duration'	: 500
		}, options);
		
		return this.each(function() {
			$(this)
				.hide()
				.fadeIn(settings.duration / 2, 'easeInCubic')
				.fadeOut(settings.duration / 2, 'easeOutCubic');
		});
	};

	// Scintillement continu :
	// - durée de scintillement (ms)
	// - décalage avant scintillement (ms)
	// - en boucle (vrai/faux)
	$.fn.sparkling = function(options) {
		var settings = $.extend({
			'duration'	: 500,
			'delay'		: 1000,
			'loop'		: false
		}, options);
		
		var length = this.length;
		
		return this.each(function(index) {
			var _self = $(this),
				_selfSpark = function() {
					_self.spark({ 'duration': settings.duration });
				};
			
			_self.hide();
			setTimeout(function() {
				_selfSpark();
				settings.loop && setInterval(_selfSpark, length * (settings.delay + settings.duration));
			}, index * (settings.delay + settings.duration));
		});
	};

	// Lecture d'un fichier multimedia (video/audio)
	$.fn.playMedia = function() {
		return this.each(function() {
			$(this).get(0).play();
		});
	};
	
		$.fn.pauseMedia = function() {
return this.each(function() {
$(this).get(0).pause();
});
};
	
	// Activation d'un widget type drag
	$.fn.setDragWidget = function() {
		return this.each(function() {
			$(this).draggable({
				cursor	: 'move',
				revert	: 'invalid',
				stack	: 'div'
			}).hover(function() {
				$(this).css('cursor', 'move')
			});
		});
	};
	
	// Activation d'un widget type drop (à réception d'un widget type drag)
	// - widget type drag
	// - fonction de callback exécutée lorsqu'un drop est activé
	$.fn.setDropWidget = function(options) {
		var settings = $.extend({
			'drag'		: undefined,
			'callback'	: undefined
		}, options);
		
		return this.each(function() {
			$(this).droppable({
				accept	: settings.drag,
				drop	: settings.callback
			});
		});
	};
})( jQuery );