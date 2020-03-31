function Carousel(element, min_items) {

	this.$carousel = $(element);
	this.$wrap = this.$carousel.find('.carousel-wrap');
	this.$items = this.$carousel.find('.item');
	this.items_amount = this.$items.length;

	this.min_items = min_items || 2;
	this.fuse = false;
	this.timer = '';
	this.init();

	//var self = this;
	// $(window).resize(function () {
	// 	self.destroy();
	// 	self.init();
	// });

	window.automated_carousels.push(this);
}


(function () {

	this.init = function () {
		if (this.min_items > this.items_amount && $(window).width() > 1720) return false;

		var self = this;
		this.$carousel.find(".arrow").css("visibility", "visible");
		this.autoplay();

		this.$carousel.on('click', '.arrow', function (e) {
			e.preventDefault();
			self.stopAutoplay();
			self.moveSlide($(this).data('direction'));
		});
	};

	this.destroy = function () {
		this.stopAutoplay();
		this.container.find('.arrow').removeClass('visible');
	};


	this.autoplay = function () {
		var self = this;
		this.timer = setInterval( function(){
			self.moveSlide('next')
		}, 5000);
	};


	this.stopAutoplay = function () {
		clearInterval(this.timer);
	};

	this.moveSlide = function (dir) {
		if (this.fuse) return;

		this.fuse = true;
		var self = this;
		var clone = null;
		var item_width = null;


		if (dir === 'next') {
			clone = this.$wrap.find('.item').eq(0).clone();
			item_width = this.$wrap.find('.item').eq(0).outerWidth(true);

			this.$wrap.append(clone);
			this.$wrap.animate({'left': -item_width + 'px'}, 800, function () {
				self.$wrap.find('.item').eq(0).remove();
				self.$wrap.css('left', 0);
				self.fuse = false;
			});

		} else if (dir === 'prev') {

			clone = this.$wrap.find('.item').eq(this.items_amount - 1).clone();
			item_width = this.$wrap.find('.item').eq(this.items_amount - 1).outerWidth(true);

			this.$wrap.prepend(clone);
			this.$wrap.css('left', -item_width + 'px');

			this.$wrap.animate({'left': 0}, 800, function () {
				self.$wrap.find('.item').eq(self.items_amount).remove();
				self.fuse = false;
			});
		}
	};


	this.constructor = Carousel;
}).call(Carousel.prototype);

$(document).ready(function () {

	window.automated_carousels = [];
	$('.carousel').each(function () {
		new Carousel($(this), $(this).data('min-items'));
	});
});
