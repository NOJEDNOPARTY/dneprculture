var common = {
	init: function() {
		common.navigationFixation();
		common.wow();
		common.main();
		common.accordion();
		common.carousel();
		common.submit();
	},
	navigationFixation: function(){
		function fixPanel() {
			$('body').css({'padding-top': $('.header').outerHeight()})
			if($(window).scrollTop() > 0){
				$('.header').addClass('fixed');
			}else {
				$('.header').removeClass('fixed');
			}
		};
		fixPanel();
		$(window).scroll(function() {
			fixPanel();
		});
		$( window ).resize(function() {
			fixPanel();
		});
	},
	wow: function() {
		let wow = new WOW({
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animate__animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true,       // act on asynchronously loaded content (default is true)
			callback:     function(box) {},
			scrollContainer: null,    // optional scroll container selector, otherwise use window,
			resetAnimation: true,     // reset animation on end (default is true)
		});
		wow.init();
	},
	main: function(){

		// menu-trigger

		$('.menu-trigger').click(function(event){
			event.preventDefault();
			$('.header').toggleClass('open');
			$('body').toggleClass('hidden');
		});

		$('.header-nav-link-back').click(function(event){
			event.preventDefault();
			$(this).closest('.header-nav-submenu').removeClass('active');
		});

		
		$('.header-nav-link-trigger').click(function(event){
			event.preventDefault();
			$(this).closest('.header-nav-link-wrap').find('.header-nav-submenu:first').addClass('active');
		});

		// b-lazy

		var bLazy = new Blazy({ 
			breakpoints: [{
				width: 767, 
				src: 'data-src-small'
			}, 
			{
				width: 4000, src: 'data-src-medium'
			}]
		});


		$('.form-row select').click(function(){
			$(this).toggleClass('active');
		});

		$('.link-select .link-select-active').click(function(event){
			event.preventDefault();
			$(this).closest('.link-select').toggleClass('active');
			$(this).closest('.link-select').find('.link-select-hidden').fadeToggle('fast');
		});

		// click in another place

		jQuery(function($){
			$(document).mouseup(function (e){ 
				var popup = $(".popup");
				var popupLayout = $(".popup-layout");
				var select = $('select');
				let linkSelect = $(".link-select");
				if (!popup.is(e.target) && popupLayout.is(e.target) 
					&& popup.has(e.target).length === 0) { 
					$('.popup-wrapper').removeClass('active');
					$('body').removeClass('hidden');
				}
				if (!linkSelect.is(e.target)
					&& linkSelect.has(e.target).length === 0) {
					linkSelect.removeClass('active');
					linkSelect.find('.link-select-hidden').fadeOut('fast');
				}

				if (!select.is(e.target) 
					&& select.has(e.target).length === 0) { 
						select.removeClass('active');
				}
			});
		});


		// popups call
		$('.call-popup').click(function(event){
			event.preventDefault();
			var popup  = '#' + $(this).attr('data-popup');
			$(popup).addClass('active')
			$('.header').removeClass('open');
			$('body').addClass('hidden');

		});
		
		$('.popup-close').click(function(){
			$(this).closest('.popup-wrapper').removeClass('active');
			$('body').removeClass('hidden');
		});

		// phone mask
		$('.tel-trigger').mask("+380(99) 999-99-99");

		

	},
	accordion: function(){
		$(document).on('click', '.accordion__trigger', function(event){
			event.preventDefault();
		
			let accordionItem = $(this).closest('.accordion');
			if(accordionItem.hasClass('open') == false) {
				accordionItem.addClass('open');
				accordionItem.find('.accordion-content').slideToggle('fast');
			}else {
				accordionItem.removeClass('open');
				accordionItem.find('.accordion-content').slideToggle('fast');
			}
		});

		$(document).on('click', '.cldnr-head', function(event){
			if($(window).width() < 993){
				event.preventDefault();
			
				let cldnrItem = $(this).closest('.cldnr');
				if(cldnrItem.hasClass('open') == false) {
					cldnrItem.addClass('open');
					cldnrItem.find('.cldnr-content').slideToggle('fast');
				}else {
					cldnrItem.removeClass('open');
					cldnrItem.find('.cldnr-content').slideToggle('fast');
				}
			}
		});
		
	},
	carousel: function(){

		var bannerSlider = $('.banner-slider');

		bannerSlider.owlCarousel({
			loop:false,
			items: 1,
			loop: true,
			margin: 0,
			nav: true,
			dots: true,
			autoHeight: true,
			autoplay:true,
			autoplayTimeout: 4000
		});

		let slidesLength = bannerSlider.find('.owl-item').not('.cloned').length;
		$('.banner-count-length').text(slidesLength);
		bannerSlider.on('translated.owl.carousel', function(event) {
			$('.banner-count-current').text(event.item.index - 1);
		})


		$('.gallery-slider').owlCarousel({
			loop:true,
			items:3,
			margin:30,
			nav:true,
			dots: false,
			responsive:{
				0:{
					items:1,
					margin:20
				},
				600:{
					items:2,
					margin:20
				},
				1000:{
					items:3,
					margin:30,
				}
			}
		});


		$('.owl-carousel').on('translated.owl.carousel', function(event) {
			var bLazy = new Blazy({});
		})

		
	},
	submit: function(){
		let formSubmitButton = document.querySelectorAll('.submit-btn');

		formSubmitButton.forEach(function (button) {
			button.addEventListener("click", function (e) {
				let inputItems = button.closest('form').querySelectorAll('[required]');
				inputItems.forEach((item) => {
					item.classList.add('was-validate');
				});
			});
		});

		
	},
};

(function() {
	common.init();
}());


