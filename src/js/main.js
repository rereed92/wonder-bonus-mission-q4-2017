(function($) {

    var boxes = $('.box')
	var offset = .9;

	hideBoxes(boxes, offset);

	$(window).scroll(function()
	{
		if (window.requestAnimationFrame)
		{
			window.requestAnimationFrame(function() { 
				showBoxes(boxes, offset); 
			});
		}
		else 
		{
			setTimeout(function() { 
				showBoxes(boxes, offset); 
			}, 100)
		}
	});

})(jQuery);


function hideBoxes(boxes, offset) 
{
	boxes.each(function() 
	{
		if ($(this).offset().top > $(window).scrollTop()+$(window).height() * offset) {
			$(this).find('.box__content').addClass('box__content--hidden');
		}
	});
}


function showBoxes(boxes, offset) 
{
	boxes.each(function() 
	{
		if ($(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.box__content').hasClass('box__content--hidden')) { 
			$(this).find('.box__content').removeClass('box__content--hidden').addClass('box__content--bounce');
		}
	});
}