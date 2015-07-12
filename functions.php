<?php
/**
 * This is child themes functions.php file. All modifications should be made in this file.
 *
 * All style changes should be in child themes style.css file.
 *
 * @package    Eemeli
 * @version    1.0.0
 * @author     Sami Keijonen <sami.keijonen@foxnet.fi>
 * @copyright  Copyright (c) 2015, Sami Keijonen
 * @link       https://foxland.fi
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

/**
 * Setup function. All child themes should run their setup within this function. The idea is to add/remove 
 * filters and actions after the parent theme has been set up. This function provides you that opportunity.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function eemeli_theme_setup() {

	/* Load child theme text domain. */
	load_child_theme_textdomain( 'eemeli', get_stylesheet_directory() . '/languages' );
	
	/*
	 * Add a custom background to overwrite the defaults.
	 *
	 * @link http://codex.wordpress.org/Custom_Backgrounds
	 */
	add_theme_support(
		'custom-background',
		array(
			'default-color' => 'eef2f5',
			'default-image' => ''
		)
	);
	
	/*
	 * Add a custom header to overwrite the defaults.
	 *
	 * @link http://codex.wordpress.org/Custom_Headers
	 */
	add_theme_support(
		'custom-header',
		array(
			'default-image'      => get_stylesheet_directory_uri() . '/images/header-image.jpg',
			'default-text-color' => 'f2f2f2',
			'height'             => 550
		)
	);
	
	/* Registers default headers for the theme. We need this so that we can set default image back. */
	register_default_headers(
		array(
			'eemeli-header' => array(
				'url'           => '%2$s/images/header-image.jpg',
				'thumbnail_url' => '%2$s/images/header-image.jpg',
				/* Translators: Header image description. */
				'description'   => __( 'Default Header Image', 'eemeli' )
			)
		)
	);
	
	/* Add child theme fonts to editor styles. */
	add_editor_style( eemeli_fonts_url() );
	
}
add_action( 'after_setup_theme', 'eemeli_theme_setup', 11 );

/**
 * Enqueue scripts and styles. 
 *
 * @since  1.0.0
 */
function eemeli_scripts() {
	
	/* Dequeue parent fonts. */
	wp_dequeue_style( 'toivo-lite-fonts' );
	
	/* Enqueue child theme fonts. */
	wp_enqueue_style( 'eemeli-fonts', eemeli_fonts_url(), array(), null );
	
}
add_action( 'wp_enqueue_scripts', 'eemeli_scripts', 11 );

/**
 * Filter default header background color from the Customizer. 
 *
 * @since  1.0.0
 */
function eemeli_header_background_color() {
	return '#35495d';
}
add_filter( 'toivo_lite_default_bg_color', 'eemeli_header_background_color' );

/**
 * Filter default header background color opacity from the Customizer. 
 *
 * @since  1.0.0
 */
function eemeli_header_bg_color_opacity() {
	return 80;
}
add_filter( 'toivo_lite_default_bg_opacity', 'eemeli_header_bg_color_opacity' );

/**
 * Return the Google font stylesheet URL
 *
 * @since  1.0.0
 * @return string
 */
function eemeli_fonts_url() {
	
	$fonts_url = '';
	
	/* Translators: If there are characters in your language that are not
	 * supported by Open Sans, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$open_sans = _x( 'on', 'Open Sans font: on or off', 'eemeli' );
	
	/* Translators: If there are characters in your language that are not
	 * supported by Nunito, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$nunito = _x( 'on', 'Nunito font: on or off', 'eemeli' );
	
	if ( 'off' !== $open_sans || 'off' !== $nunito ) {
		
		$font_families = array();
		
		if ( 'off' !== $open_sans )
			$font_families[] = 'Open Sans:300italic,400italic,700italic,400,700,300';
		
		if ( 'off' !== $nunito )
			$font_families[] = 'Nunito:400,700,300';
		
		$query_args = array(
			'family' => urlencode( implode( '|', $font_families ) ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);
		
		$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
	}
	
	return esc_url_raw( $fonts_url );
}