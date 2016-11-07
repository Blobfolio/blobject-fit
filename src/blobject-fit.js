/**
*
* blobject-fit
* Version: 1.0
*
* Copyright © 2016 Blobfolio, LLC <https://blobfolio.com>
* This work is free. You can redistribute it and/or modify
* it under the terms of the Do What The Fuck You Want To
* Public License, Version 2.
*
**/

(function(){

	//-------------------------------------------------
	// Find Images

	function blobjectFit(){
		var images = document.querySelectorAll('img');
		if(!images.length)
			return;

		//all images
		for(i=0; i<images.length; i++){
			var image = images[i],
				imageFit = getComputedStyle(image).fontFamily || image.style.fontFamily || '';

			//we are specifically looking for a "font-family" attribute on the image
			if(!image.classList.contains('blobject-fit--image')){
				//this could contain multiple definitions
				if(imageFit.indexOf(';') === -1)
					imageFit = imageFit + ';';

				var imageProps = imageFit.split(';');

				//each font-family prop
				for(i2=0; i2<imageProps.length; i2++){
					var imageProp = imageProps[i2].replace(/[^a-zA-Z0-9\:\-]/g, '').toLowerCase();

					//a single font-family prop
					if(imageProp.indexOf(':') !== -1){
						var tmp = imageProp.split(':');

						//make sure it is a sneaky object-fit line
						if(tmp[0] === 'object-fit' && ['cover','contain'].indexOf(tmp[1]) !== -1){
							var imageClass = 'blobject-fit_object-fit_' + tmp[1],
								src = image.currentSrc || image.src,
								parent = image.parentNode;

							parent.classList.add('blobject-fit');
							parent.classList.add(imageClass);
							parent.style.backgroundImage = 'url(' + src + ')';
							image.setAttribute('data-blobject-fit-src', src);
							image.classList.add('blobject-fit--image');
						}
					}//valid object fit property
				}//each object fit property
			}//object fit image
		}//each image

		return true;
	}

	//-------------------------------------------------
	// Generate Fallback Styles

	function blobjectFitStyles(){
		//take a moment to inject some styles to the header
		var css =	'.blobject-fit { background: transparent none scroll center center no-repeat; } ' +
					'.blobject-fit.blobject-fit_object-fit_cover { background-size: cover; } ' +
					'.blobject-fit.blobject-fit_object-fit_contain { background-size: contain; } ' +
					'.blobject-fit--image { visibility: hidden; height: 0; width: 0; }',
			style = document.createElement('style');

		style.textContent = css;
		document.head.appendChild(style);

		return true;
	}

	//-------------------------------------------------
	// Execute!

	document.addEventListener('DOMContentLoaded', function(){
		//only act if object-fit is unsupported
		if(!('objectFit' in document.documentElement.style)){
			blobjectFitStyles();
			blobjectFit();

			//bind resize if the browser supports srcset and/or picture
			if(('HTMLPictureElement' in window) || ('srcset' in document.createElement('img'))){
				window.addEventListener('resize', function(){
					var images = document.querySelectorAll('.blobject-fit--image');
					if(!images.length)
						return;

					for(i=0; i<images.length; i++){
						var image = images[i],
							n_src = image.currentSrc || image.src,
							o_src = image.getAttribute('data-blobject-fit-src') || '',
							parent = image.parentNode;

						if(n_src !== o_src){
							parent.style.backgroundImage = 'url(' + src + ')';
							image.setAttribute('data-blobject-fit-src', src);
						}
					}
				});//resize
			}//responsive support

			//set up an interval to periodically rescan DOM
			//this will let it fix any images that are added
			//dynamically at runtime
			setInterval(function(){
				blobjectFit();
			}, 1000);
		}//no object fit support
	});//document ready

})();
