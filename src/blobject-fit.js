/**
*
* blobject-fit
* Version: 1.6
*
* Copyright © 2017 Blobfolio, LLC <https://blobfolio.com>
* This work is free. You can redistribute it and/or modify
* it under the terms of the Do What The Fuck You Want To
* Public License, Version 2.
*
**/

(function(){

	//-------------------------------------------------
	// Images

	var positionsY = ['top','center','bottom'],
		positionsX = ['left','center','right'],
		positions  = ['top','center','bottom','left','right'];

	function blobjectFitImage(){
		var images = document.querySelectorAll('img') || [];
		if(!images.length)
			return;

		//all images
		for(i=0; i<images.length; i++){
			var image = images[i],
				imageFit = getComputedStyle(image).fontFamily || image.style.fontFamily || '';

			//we are specifically looking for a "font-family" attribute on the image
			if(
				!image.classList.contains('blobject-fit--checked') &&
				!image.classList.contains('blobject-fit--image')
			){
				//so we don't have to scan it again later.
				image.classList.add('blobject-fit--checked');

				//this could contain multiple definitions
				if(imageFit.indexOf(';') === -1)
					imageFit = imageFit + ';';

				var imageProps = imageFit.split(';'),
					parent = image.parentNode;

				//each font-family prop
				for(i2=0; i2<imageProps.length; i2++){
					var imageProp = imageProps[i2].replace(/[^a-zA-Z0-9\:\-]/g, '').toLowerCase();

					//a single font-family prop
					if(imageProp.indexOf(':') !== -1){
						var tmp = imageProp.split(':');

						//make sure it is a sneaky object-fit line
						if(tmp[0] === 'object-fit' && ['cover','contain'].indexOf(tmp[1]) !== -1){
							var imageClass = 'blobject-fit_object-fit_' + tmp[1],
								src = image.currentSrc || image.src;

							parent.classList.add('blobject-fit');
							parent.classList.add(imageClass);
							parent.style.backgroundImage = 'url(' + src + ')';
							image.setAttribute('data-blobject-fit-src', src);
							image.classList.add('blobject-fit--image');
						}
						//object position?
						else if(tmp[0] === 'object-position') {
							// Can we make sense of it?
							var position = false;

							// If only one thing is passed, the missing bit is center.
							if(positionsY.indexOf(tmp[1]) !== -1){
								position = tmp[1] + '-center';
							}
							else if(positionsX.indexOf(tmp[1]) !== -1){
								position = 'center-' + tmp[1];
							}
							else if((tmp[1] === 'topleft') || (tmp[1] === 'lefttop')){
								position = 'top-left';
							}
							else if((tmp[1] === 'topcenter') || (tmp[1] === 'centertop')){
								position = 'top-center';
							}
							else if((tmp[1] === 'topright') || (tmp[1] === 'righttop')){
								position = 'top-right';
							}
							else if((tmp[1] === 'centerleft') || (tmp[1] === 'leftcenter')){
								position = 'center-left';
							}
							else if(tmp[1] === 'centercenter'){
								position = 'center-center';
							}
							else if((tmp[1] === 'centerright') || (tmp[1] === 'rightcenter')){
								position = 'center-right';
							}
							else if((tmp[1] === 'bottomleft') || (tmp[1] === 'leftbottom')){
								position = 'bottom-left';
							}
							else if((tmp[1] === 'bottomcenter') || (tmp[1] === 'centerbottom')){
								position = 'bottom-center';
							}
							else if((tmp[1] === 'bottomright') || (tmp[1] === 'rightbottom')){
								position = 'bottom-right';
							}

							// We have a keyword position.
							if(position){
								parent.classList.add('blobject-fit_object-position_' + position);
							}
						}
					}//valid object fit property
				}//each object fit property
			}//object fit image
		}//each image

		return true;
	}

	//resize images
	function blobjectFitImagesResize(){
		var images = document.querySelectorAll('.blobject-fit--image') || [];
		if(!images.length)
			return;

		for(i=0; i<images.length; i++){
			var image = images[i],
				n_src = image.currentSrc || image.src,
				o_src = image.getAttribute('data-blobject-fit-src') || '',
				parent = image.parentNode;

			if(n_src !== o_src){
				parent.style.backgroundImage = 'url(' + n_src + ')';
				image.setAttribute('data-blobject-fit-src', n_src);
			}
		}
	}

	//-------------------------------------------------
	// Videos

	function blobjectFitVideo(){
		var videos = document.querySelectorAll('video') || [];
		if(!videos.length)
			return;

		//all videos
		for(i=0; i<videos.length; i++){
			var video = videos[i],
				videoFit = getComputedStyle(video).fontFamily || video.style.fontFamily || '';

			//we are specifically looking for a "font-family" attribute on the video
			if(!video.classList.contains('blobject-fit--checked')){
				//so we don't have to scan it again later.
				video.classList.add('blobject-fit--checked');

				//this could contain multiple definitions
				if(videoFit.indexOf(';') === -1)
					videoFit = videoFit + ';';

				var videoProps = videoFit.split(';');

				//each font-family prop
				for(i2=0; i2<videoProps.length; i2++){
					var videoProp = videoProps[i2].replace(/[^a-zA-Z0-9\:\-]/g, '').toLowerCase();

					//a single font-family prop
					if(videoProp.indexOf(':') !== -1){
						var tmp = videoProp.split(':');

						//make sure it is a sneaky object-fit line
						if(tmp[0] === 'object-fit' && ['cover','contain'].indexOf(tmp[1]) !== -1){
							var vw = video.videoWidth || 0,
								vh = video.videoHeight || 0,
								parent = video.parentNode,
								parentPosition = getComputedStyle(parent).position || parent.style.position || 'static';

							//wait until metadata has propagated
							if(!vw || !vh){
								/*jshint ignore:start*/
								video.addEventListener('loadedmetadata', function(e){
									vw = video.videoWidth || 0;
									vh = video.videoHeight || 0;

									if(!vw || !vh){
										return;
									}

									video.classList.add('blobject-fit--video');
									video.classList.add('blobject-fit_object-fit_' + tmp[1]);
									video.setAttribute('data-width', vw);
									video.setAttribute('data-height', vh);

									parent.classList.add('blobject-fit--video--wrapper');
									if(parentPosition === 'static'){
										parent.classList.add('blobject-fit--video--wrapper_relative');
									}

									blobjectFitVideoResize(video);
								}, false);
								/*jshint ignore:end*/
							}
							//or do it now
							else {
								video.classList.add('blobject-fit--video');
								video.classList.add('blobject-fit_object-fit_' + tmp[1]);
								video.setAttribute('data-width', vw);
								video.setAttribute('data-height', vh);

								parent.classList.add('blobject-fit--video--wrapper');
								if(parentPosition === 'static'){
									parent.classList.add('blobject-fit--video--wrapper_relative');
								}

								blobjectFitVideoResize(video);
							}
						}
					}//valid object fit property
				}//each object fit property
			}//object fit video
		}//each video

		return true;
	}

	//resize videos
	function blobjectFitVideosResize(){
		var videos = document.querySelectorAll('.blobject-fit--video.blobject-fit_object-fit_cover') || [];
		if(!videos.length){
			return;
		}

		for(i=0; i<videos.length; i++){
			blobjectFitVideoResize(videos[i]);
		}
	}

	//resize one video
	function blobjectFitVideoResize(video){
		var vw = Number(video.getAttribute('data-width')) || 0,
			vh = Number(video.getAttribute('data-height')) || 0,
			parent = video.parentNode,
			pw = Number(parent.offsetWidth) || 0,
			ph = Number(parent.offsetHeight) || 0,
			nw = 0,
			nh = 0;

		if(vw > 0 && vh > 0){
			if(pw / vw > ph / vh){
				nw = pw;
				nh = vh * (pw / vw);
				video.style.width = nw + 'px';
				video.style.height = nh + 'px';
			}
			else {
				nh = ph;
				nw = vw * (ph / vh);
				video.style.width = nw + 'px';
				video.style.height = nh + 'px';
			}
		}
	}

	//-------------------------------------------------
	// Generate Fallback Styles

	function blobjectFitStyles(){
		//take a moment to inject some styles to the header
		var css =	'.blobject-fit { background: transparent none scroll center center no-repeat; } ' +
					'.blobject-fit.blobject-fit_object-fit_cover { background-size: cover; } ' +
					'.blobject-fit.blobject-fit_object-fit_contain { background-size: contain; } ' +
					'.blobject-fit.blobject-fit_object-position_top-left { background-position: top left; }' +
					'.blobject-fit.blobject-fit_object-position_top-center { background-position: top center; }' +
					'.blobject-fit.blobject-fit_object-position_top-right { background-position: top right; }' +
					'.blobject-fit.blobject-fit_object-position_center-left { background-position: center left; }' +
					'.blobject-fit.blobject-fit_object-position_center-center { background-position: center center; }' +
					'.blobject-fit.blobject-fit_object-position_center-right { background-position: center right; }' +
					'.blobject-fit.blobject-fit_object-position_bottom-left { background-position: bottom left; }' +
					'.blobject-fit.blobject-fit_object-position_bottom-center { background-position: bottom center; }' +
					'.blobject-fit.blobject-fit_object-position_bottom-right { background-position: bottom right; }' +
					'.blobject-fit--image { visibility: hidden; height: 0; width: 0; } ' +
					'.blobject-fit--video--wrapper { overflow: hidden; } ' +
					'.blobject-fit--video--wrapper_relative { position: relative; } ' +
					'.blobject-fit--video { position: absolute; } ' +
					'.blobject-fit--video.blobject-fit_object-fit_contain { top: 0; left: 0; width: 100%; height: 100%; } ' +
					'.blobject-fit--video.blobject-fit_object-fit_cover { top: 50%; left: 50%; transform: translate(-50%, -50%); } ',
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
			blobjectFitImage();
			blobjectFitVideo();

			//bind resize for cover-videos
			window.addEventListener('resize', blobjectFitVideosResize);

			//bind resize for images, but only if picture or srcset are supported
			if(('HTMLPictureElement' in window) || ('srcset' in document.createElement('img'))){
				window.addEventListener('resize', blobjectFitImagesResize);
			}//responsive support

			//set up an interval to periodically rescan DOM
			//this will let it fix any images that are added
			//dynamically at runtime
			setInterval(function(){
				blobjectFitImage();
				blobjectFitVideo();
			}, 1000);
		}//no object fit support
	});//document ready

})();
