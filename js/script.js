var current_image

$(document).ready(function() {
	$('#main-content *').css('opacity', 1)

	$('.nav-link, #title').on('click', function() {
		window.location.reload(true);
	})
	
	$('#eng').on('click', function() {
		window.location.href = ''; window.location.reload(true);
	})
	
	$('#de').on('click', function() {
		window.location.href = '#de'; window.location.reload(true);
	})
	
	
	////////// IMAGE LIGHTBOX //////////

	function showImageOverlay(img) {
		// show selected image
		src = $(img).attr('src')
		$('#image-overlay').attr('src', src)

		// show caption for selected image
		caption = $(img).attr('data-caption')
		$('#overlay-text').html(caption)
	}
	
	// open overlay
	$('.image-container').on('click', function() {
		current_image = $(this).find('img')
		// show overlay, disable background scroll
		$('#overlay').css('visibility', 'visible')
		overlay.setAttribute('aria-hidden', false)
		document.body.classList.toggle('noscroll', true)
	
		img = $(this).find('img')
		showImageOverlay(img)

		$('#overlay-tip').css('visibility', 'visible')
			.css('opacity', 1)

		$('#image-overlay').attr('width', '60%')
		if (window.screen.width < 767) {
			$('#image-overlay').attr('width', '90%')
		}
	})
	
	// close overlay
	$('#overlay').on('click', function() {
		// close overlay & re-enable scroll
		$('#overlay').css('visibility', 'hidden')
		$('#overlay-tip').css('visibility', 'hidden')
			.css('opacity', 0)
		document.body.classList.toggle('noscroll', false)
	
		// zoom out image
		$('#image-overlay').attr('width', '60%')
		if (window.screen.width < 767) {
			$('#image-overlay').attr('width', '90%')
		}
	})
	
	// image overlay zoom
	$('#image-overlay').on('click', function(e) {
		e.stopPropagation() // don't trigger #overlay click event
		// zoom in
		if (window.screen.width < 767) { // mobile
			if ($('#image-overlay').attr('width') == '90%') {
				$('#image-overlay').attr('width', '100%')
			} else { // zoom out
				$('#image-overlay').attr('width', '90%')
			}
			return
		} // desktop
		if ($('#image-overlay').attr('width') == '60%') {
			$('#image-overlay').attr('width', '80%')
		} else { // zoom out
			$('#image-overlay').attr('width', '60%')
		}
	})

	// navigate prev/next image
	$(document).on('keyup', function(e) {
		if ($('#overlay').css('visibility') == 'hidden') return
		// prevent default keyup behavior
		e.preventDefault()

		// current image being show in overlay
		var images = $('.image')
		var cur = images.index(current_image)
		// previous image - left arrow
		if (e.which == 37) {
			if (cur <= 0) return
			img = images[cur-1]
			current_image = img
			showImageOverlay(img)
		}
		// next image - right arrow
		else if (e.which == 39) {
			if (cur >= images.length-1) return
			img = images[cur+1]
			current_image = img
			showImageOverlay(img)
		}
		else {
			return
		}
		$('#overlay-tip').css('visibility', 'hidden')
			.css('opacity', 0)
	})
})
