/*-----------------------------------------------------------------------------------

 	Custom JS - All front-end jQuery
 
-----------------------------------------------------------------------------------*/

(function($) {
	"use strict";

	$(document).ready(function() {

		var $window = $(window),
			$html = $('html').removeClass('no-js'),
			$body = $('body');

		/* ----------------------------------------- */
		/* Isotope
		/* ----------------------------------------- */
		$(window).load(function() {
			// Isotope
			if( $.fn.isotope ) {
				if( $body.hasClass('page-template-template-portfolio-php') ) {
					var htmlFrag = '<li class="portfolio-filter"><a href="#" class="active-filter" data-portfolio-filter="">'+zillaMesh.portfolioFilterAll+'</a></li>';
					$('.portfolio-filter').parents('ul.menu').prepend(htmlFrag);
				}

				var $container = $('#portfolio-feed'),
					$filter = $('.portfolio-filter a'),
					colWidth;

				var getColWidth = function() {
					var width,
						windowWidth = $window.width();

					if( $container.length ) {
						if( windowWidth <= 400 ) {
							width = Math.floor( $container.width() );
						} else if( windowWidth <= 1080 ) {
							width = Math.floor( $container.width() / 2 );
						} else if( windowWidth <= 1480 ) {
							width = Math.floor( $container.width() / 3 );
						} else if( windowWidth <= 1880 ) {
							width = Math.floor( $container.width() / 4 );
						} else if( windowWidth <= 2280 ) {
							width = Math.floor( $container.width() / 5 );
						} else if( windowWidth <= 2680 ) {
							width = Math.floor( $container.width() / 6 );
						} else if( windowWidth <= 3080 ) {
							width = Math.floor( $container.width() / 7 );
						} else {
							width = 400;
						}
					}

					return width;
				}

				var setWidths = function(colWidth) {
					$container.children().css({ width: colWidth });
					zilla_resize_media();
				}

				colWidth = getColWidth();
				setWidths(colWidth);

				$container.isotope({
					layoutMode: 'masonry',
					masonry: {
						columnWidth: colWidth
					}
				});

				$window.smartresize(function() {
					colWidth = getColWidth();
					setWidths(colWidth);
					$container.isotope({
						masonry: {
							columnWidth: colWidth
						}
					});
				});

				if( $body.hasClass('page-template-template-portfolio-php') ) {
					$filter.click(function(e) {

						var $this = $(this),
							selector = $this.data('portfolio-filter');

						if( selector === '' ) {
							selector = "*";
						} else {
							selector = '.' + selector;
						}

						$container.isotope({ filter: selector });
						$filter.removeClass('active-filter');
						$this.addClass('active-filter');

						e.preventDefault();
						return false;
					});
				}

				if( $html.hasClass('lt-ie9') ) {
					$(window).trigger('resize');
				}
			}
		});

		/* ----------------------------------------- */
		/* Cycle
		/* ----------------------------------------- */
		if( $.fn.cycle ) {
			var $slideshows = $('.slideshow');

			$slideshows.each(function() {
				var $slideshow = $(this),
					next = $slideshow.siblings('.zilla-slide-next'),
					prev = $slideshow.siblings('.zilla-slide-prev');

				$slideshow.cycle({
					autoHeight: 0,
					fx: 'fade',
					slides: '> li',
					speed: 500,
					timeout: 0,
					next: next,
					prev: prev
				});
			});
		}

		/* --------------------------------------- */
		/* jPlayer
		/* --------------------------------------- */
		if( $.fn.jPlayer ) {
			var $jplayers = $('.jp-jplayer');

			$jplayers.each(function() {
				var $player = $(this),
					playerType = $player.data('player-type'),
					playerMedia = $player.data('media-info'),
					playerHeight = $player.data('orig-height'),
					playerWidth = $player.data('orig-width');

				if( playerType === 'video' ) {
					$player.jPlayer({
						ready: function() {
							$(this).jPlayer('setMedia', {
								poster: playerMedia.p,
								m4v: playerMedia.m,
								ogv: playerMedia.o,
							});
						},
						size: {
							width: playerWidth,
							height: playerHeight,
						},
						play: function() { // To avoid multiple jPlayers playing together.
							$(this).jPlayer("pauseOthers");
						},
						swfPath: zillaMesh.jsFolder,
						cssSelectorAncestor: playerMedia.ancestor,
						supplied: 'm4v, ogv'
					});

					// Show/Hide player controls when video playing
					$player.bind($.jPlayer.event.playing, function(e) {
						var gui = $(this).next('.jp-video').find('.jp-interface');
						$(this).add(gui).hover( function() {
							$(gui).stop().animate({ opacity: 1 }, 300);
						}, function() {
							$(gui).stop().animate({ opacity: 0}, 300);
						});
					});

					$player.bind($.jPlayer.event.pause, function(e) {
						var gui = $(this).next('.jp-video').find('.jp-interface');
						$(this).add(gui).unbind('hover');
						$(gui).stop().animate({ opacity: 1 }, 300);
					});
				} else {
					$player.jPlayer({
						ready: function() {
							$(this).jPlayer('setMedia', {
								poster: playerMedia.p,
								mp3: playerMedia.m,
								oga: playerMedia.o,
							});
						},
						size: {
							width: playerWidth,
							height: playerHeight,
						},
						play: function() { // To avoid multiple jPlayers playing together.
							$(this).jPlayer("pauseOthers");
						},
						preload: 'auto',
						swfPath: zillaMesh.jsFolder,
						cssSelectorAncestor: playerMedia.ancestor,
						supplied: 'mp3, ogg'
					});	
				}
			});
		}

		/* ------------------------------------------- */
		/* Single portfolio open/close animation
		/* ------------------------------------------- */
		$(window).load(function() {
			if( $body.hasClass('single-portfolio') ) {
				var $portfolioContent = $('#primary').find('.entry-content'),
					portfolioHeight = $portfolioContent.outerHeight(),
					$hideShow = $('#show-hide-content');

				$hideShow.on('click', function() {
					var currentHeight = $portfolioContent.outerHeight();

					if( currentHeight > 30 ) {
						$portfolioContent.animate({
							height: 30,
							paddingTop: 0,
							paddingBottom: 0
						}, 300, function() {
							$portfolioContent.toggleClass('hide-content');
							$hideShow.removeClass('rotateToOpen').addClass('rotateToClose');
							$portfolioContent.animate({
								width: 30,
								padding: 0
							}, 200);
						});
					} else {
						$portfolioContent.animate({
							width: '100%',
							paddingLeft: 50,
							paddingRight: 50
						}, 200, function() {
							$portfolioContent.animate({
								height: portfolioHeight,
								paddingBottom: 50,
								paddingTop: 40
							}, 300, function() {
								$portfolioContent.toggleClass('hide-content');
								$hideShow.addClass('rotateToOpen').removeClass('rotateToClose');
							});
						});
					}
				});
			}
		});

		/* ------------------------------------------- */
		/* Footer Animations
		/* ------------------------------------------- */
		var $footerToggle = $('#toggle-footer'),
			$footer = $('#footer'),
			$footerInner = $('#footer-inner'),
			height;

		$footerToggle.on('click', function(e) {
			e.preventDefault();

			if( $footer.hasClass('open') ) {
				$footerInner.animate({
					height: 0
				}, 400, function() {
					$footerInner.hide();
					$footer.css({
						position: 'fixed'
					}).removeClass('open');
				});
			} else {
				$footer.css({
					position: 'relative'
				}).addClass('open');

				$footer.animate({
					height: height - 30
				}, 400, function() {
					$footerInner.fadeIn(200);
					$footerInner.css({ height: 'auto' });
					$body.animate({ scrollTop: $footer.offset().top - 150 });
					$html.animate({ scrollTop: $footer.offset().top - 150 });
				});
			}
		});

		/* --------------------------------------------- */
		/* Resize Audio/Video on Resize
		/* --------------------------------------------- */
		$('#primary').fitVids();

		function zilla_resize_media() {
			var $jplayers = $('.jp-jplayer');
			
			if( $jplayers.length && $().jPlayer ) {
				var containerWidth;
			
				if( $body.hasClass('single-portfolio') ) {
					containerWidth = $('.portfolio-media').width();
				} else {
					containerWidth = $('.post-media').width();
				}
			
				$jplayers.each(function() {
					var player = $(this),
						origWidth = player.attr('data-orig-width'),
						origHeight = player.attr('data-orig-height'),
						newWidth = containerWidth,
						newHeight = Math.floor( (origHeight * newWidth) / origWidth );
			
					if( player.hasClass('jp-jplayer') ) {
						player.jPlayer('option', 'size', { width: newWidth, height: newHeight });
					}
					if( player.hasClass('embed-video') ) {
						player.width(newWidth).height(newHeight);
					}
				});
			}
		}

		// Resize the media on page load
		zilla_resize_media();


		/* --------------------------------------------- */
		/* Sexy post truncation
		/* --------------------------------------------- */
		if( $body.is('.blog, .archive, .search') ) {
			$window.load(function() {
				function truncatePosts() {
					$posts.each( function() {
						var $this = $(this),
							$content = $this.find('.entry-content'),
							postHeight = $this.outerHeight(),
							footerHeight = $this.find('.entry-meta').outerHeight(true),
							mediaHeight,
							calcHeight;

						if( $this.hasClass('format-gallery') ) {
							mediaHeight = $this.find('img:first').outerHeight() || 0;
						} else {
							mediaHeight = $this.find('.post-media').outerHeight() || 0;
						}

						calcHeight = postHeight - mediaHeight - footerHeight;

						$content
							.dotdotdot({ height: calcHeight - 44 })
							.css({ height: calcHeight });
					});
				}
				var $posts = $('.post');

				truncatePosts();

				$window.smartresize( function() {
					truncatePosts();
				});
			});
		}
	});
})(window.jQuery);