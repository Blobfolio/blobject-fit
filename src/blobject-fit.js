/**
 * Blobject-fit
 *
 * @version 1.5.1
 * @author Blobfolio, LLC <hello@blobfolio.com>
 * @package blobject-fit
 * @license WTFPL <http://www.wtfpl.net>
 *
 * @see https://blobfolio.com
 * @see https://github.com/Blobfolio/blobject-fit
**/

(function() {

	var positionsY = ['top', 'center', 'bottom'];
	var positionsX = ['left', 'center', 'right'];

	/**
	 * Fit Images
	 *
	 * @returns {void} Nothing.
	 */
	function blobjectFitImage() {
		var images = document.querySelectorAll('img') || [];
		if (!images.length) {
			return;
		}

		// All images.
		for (var i = 0; i < images.length; i++) {
			var image = images[i];
			var imageFit = getComputedStyle(image).fontFamily || image.style.fontFamily || '';

			// We are specifically looking for a "font-family" attribute
			// on the image.
			if (
				!image.classList.contains('blobject-fit--checked') &&
				!image.classList.contains('blobject-fit--image')
			) {
				// So we don't have to scan it again later.
				image.classList.add('blobject-fit--checked');

				// This could contain multiple definitions.
				if (-1 === imageFit.indexOf(';')) {
					imageFit = imageFit + ';';
				}

				var imageProps = imageFit.split(';');
				var parent = image.parentNode;

				// Each font-family prop.
				for (var i2 = 0; i2 < imageProps.length; i2++) {
					var imageProp = imageProps[i2].replace(/[^a-zA-Z0-9:-]/g, '').toLowerCase();

					// A single font-family prop.
					if (-1 !== imageProp.indexOf(':')) {
						var tmp = imageProp.split(':');

						// Make sure it is a sneaky object-fit line.
						if (
							('object-fit' === tmp[0]) &&
							(-1 !== ['cover', 'contain'].indexOf(tmp[1]))
						) {
							var imageClass = 'blobject-fit_object-fit_' + tmp[1];
							var src = image.currentSrc || image.src;

							parent.classList.add('blobject-fit');
							parent.classList.add(imageClass);
							parent.style.backgroundImage = 'url(' + src + ')';
							image.setAttribute('data-blobject-fit-src', src);
							image.classList.add('blobject-fit--image');
						}
						// Object position?
						else if ('object-position' === tmp[0]) {
							// Can we make sense of it?
							var position = false;

							// If only one thing is passed, the missing
							// bit is center.
							if (-1 !== positionsY.indexOf(tmp[1])) {
								position = tmp[1] + '-center';
							}
							else if (-1 !== positionsX.indexOf(tmp[1])) {
								position = 'center-' + tmp[1];
							}
							else if (
								('topleft' === tmp[1]) ||
								('lefttop' === tmp[1])
							) {
								position = 'top-left';
							}
							else if (
								('topcenter' === tmp[1]) ||
								('centertop' === tmp[1])
							) {
								position = 'top-center';
							}
							else if (
								('topright' === tmp[1]) ||
								('righttop' === tmp[1])
							) {
								position = 'top-right';
							}
							else if (
								('centerleft' === tmp[1]) ||
								('leftcenter' === tmp[1])
							) {
								position = 'center-left';
							}
							else if ('centercenter' === tmp[1]) {
								position = 'center-center';
							}
							else if (
								('centerright' === tmp[1]) ||
								('rightcenter' === tmp[1])
							) {
								position = 'center-right';
							}
							else if (
								('bottomleft' === tmp[1]) ||
								('leftbottom' === tmp[1])
							) {
								position = 'bottom-left';
							}
							else if (
								('bottomcenter' === tmp[1]) ||
								('centerbottom' === tmp[1])
							) {
								position = 'bottom-center';
							}
							else if (
								('bottomright' === tmp[1]) ||
								('rightbottom' === tmp[1])
							) {
								position = 'bottom-right';
							}

							// We have a keyword position.
							if (position) {
								parent.classList.add('blobject-fit_object-position_' + position);
							}
						}
					} // Valid object fit property.
				} // Each object fit property.
			} // Object fit image.
		} // Each image.

		return true;
	}

	/**
	 * Resize Images
	 *
	 * @returns {void} Nothing.
	 */
	function blobjectFitImagesResize() {
		var images = document.querySelectorAll('.blobject-fit--image') || [];
		if (!images.length) {
			return;
		}

		for (var i = 0; i < images.length; i++) {
			var image = images[i];
			var n_src = image.currentSrc || image.src;
			var o_src = image.getAttribute('data-blobject-fit-src') || '';
			var parent = image.parentNode;

			if (n_src !== o_src) {
				parent.style.backgroundImage = 'url(' + n_src + ')';
				image.setAttribute('data-blobject-fit-src', n_src);
			}
		}
	}

	/**
	 * Fit Videos
	 *
	 * @returns {void} Nothing.
	 */
	function blobjectFitVideo() {
		var videos = document.querySelectorAll('video') || [];
		if (!videos.length) {
			return;
		}

		// All videos
		for (var i = 0; i < videos.length; i++) {
			var video = videos[i];
			var videoFit = getComputedStyle(video).fontFamily || video.style.fontFamily || '';

			// We are specifically looking for a "font-family" attribute
			// on the video.
			if (!video.classList.contains('blobject-fit--checked')) {
				// So we don't have to scan it again later.
				video.classList.add('blobject-fit--checked');

				// This could contain multiple definitions.
				if (-1 === videoFit.indexOf(';')) {
					videoFit = videoFit + ';';
				}

				var videoProps = videoFit.split(';');

				// Each font-family prop.
				for (var i2 = 0; i2 < videoProps.length; i2++) {
					var videoProp = videoProps[i2].replace(/[^a-zA-Z0-9:-]/g, '').toLowerCase();

					// A single font-family prop.
					if (-1 !== videoProp.indexOf(':')) {
						var tmp = videoProp.split(':');

						// Make sure it is a sneaky object-fit line.
						if (
							('object-fit' === tmp[0]) &&
							(-1 !== ['cover', 'contain'].indexOf(tmp[1]))
						) {
							var vw = video.videoWidth || 0;
							var vh = video.videoHeight || 0;
							var parent = video.parentNode;
							var parentPosition = getComputedStyle(parent).position || parent.style.position || 'static';

							// Wait until metadata has propagated.
							if (!vw || !vh) {
								video.addEventListener('loadedmetadata', function() {
									vw = video.videoWidth || 0;
									vh = video.videoHeight || 0;

									if (!vw || !vh) {
										return;
									}

									video.classList.add('blobject-fit--video');
									video.classList.add('blobject-fit_object-fit_' + tmp[1]);
									video.setAttribute('data-width', vw);
									video.setAttribute('data-height', vh);

									parent.classList.add('blobject-fit--video--wrapper');
									if ('static' === parentPosition) {
										parent.classList.add('blobject-fit--video--wrapper_relative');
									}

									blobjectFitVideoResize(video);
								}, false);
							}
							// Or do it now.
							else {
								video.classList.add('blobject-fit--video');
								video.classList.add('blobject-fit_object-fit_' + tmp[1]);
								video.setAttribute('data-width', vw);
								video.setAttribute('data-height', vh);

								parent.classList.add('blobject-fit--video--wrapper');
								if ('static' === parentPosition) {
									parent.classList.add('blobject-fit--video--wrapper_relative');
								}

								blobjectFitVideoResize(video);
							}
						}
					} // Valid object fit property.
				} // Each object fit property.
			} // Object fit video.
		} // Each video.

		return true;
	}

	/**
	 * Resize Videos
	 *
	 * @returns {void} Nothing.
	 */
	function blobjectFitVideosResize() {
		var videos = document.querySelectorAll('.blobject-fit--video.blobject-fit_object-fit_cover') || [];
		if (!videos.length) {
			return;
		}

		for (var i = 0; i < videos.length; i++) {
			blobjectFitVideoResize(videos[i]);
		}
	}

	/**
	 * Resize Videos
	 *
	 * @param {DOMElement} video Element.
	 * @returns {void} Nothing.
	 */
	function blobjectFitVideoResize(video) {
		var vw = Number(video.getAttribute('data-width')) || 0;
		var vh = Number(video.getAttribute('data-height')) || 0;
		var parent = video.parentNode;
		var pw = Number(parent.offsetWidth) || 0;
		var ph = Number(parent.offsetHeight) || 0;
		var nw = 0;
		var nh = 0;

		if (0 < vw && 0 < vh) {
			if (pw / vw > ph / vh) {
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

	/**
	 * Generate Fallback Styles
	 *
	 * @returns {void} Nothing.
	 */
	function blobjectFitStyles() {
		// Take a moment to inject some styles to the header.
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
					'.blobject-fit--video.blobject-fit_object-fit_cover { top: 50%; left: 50%; transform: translate(-50%, -50%); } ';

		var style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);
	}

	/**
	 * Run the Polyfill!
	 *
	 * @returns {void} Nothing.
	 */
	document.addEventListener('DOMContentLoaded', function() {
		// Only act if object-fit is unsupported.
		if (!('objectFit' in document.documentElement.style)) {
			blobjectFitStyles();
			blobjectFitImage();
			blobjectFitVideo();

			// Bind resize for cover-videos
			window.addEventListener('resize', blobjectFitVideosResize);

			// Bind resize for images, but only if picture or srcset are
			// supported.
			if (('HTMLPictureElement' in window) || ('srcset' in document.createElement('img'))) {
				window.addEventListener('resize', blobjectFitImagesResize);
			}

			// Set up an interval to periodically rescan the DOM. This
			// will help fix any elements that are added at runtime.
			setInterval(function() {
				blobjectFitImage();
				blobjectFitVideo();
			}, 1000);
		} // No object fit support.
	}); // Document ready.

})();
