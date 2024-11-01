<?php

/**
 * Disable the emoji's
 */
add_action('init', 'wpgenealogy_disable_emojis');

/**
 * Disable the emoji's
 */
function wpgenealogy_disable_emojis() {
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('admin_print_scripts', 'print_emoji_detection_script');
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('admin_print_styles', 'print_emoji_styles');
	remove_filter('the_content_feed', 'wp_staticize_emoji');
	remove_filter('comment_text_rss', 'wp_staticize_emoji');
	remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
	add_filter('tiny_mce_plugins', 'wpgenealogy_disable_emojis_tinymce');
	add_filter('wp_resource_hints', 'wpgenealogy_disable_emojis_remove_dns_prefetch', 10, 2);
}

/**
 * Filter function used to remove the tinymce emoji plugin.
 *
 * @param array $plugins
 * @return array Difference betwen the two arrays
 */
function wpgenealogy_disable_emojis_tinymce($plugins) {
	if (is_array($plugins)) {
		return array_diff($plugins, array('wpemoji'));
	} else {
		return array();
	}
}
/**
 * Remove emoji CDN hostname from DNS prefetching hints.
 *
 * @param array $urls URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed for.
 * @return array Difference betwen the two arrays.
 */
function wpgenealogy_disable_emojis_remove_dns_prefetch($urls, $relation_type) {
	if ('dns-prefetch' == $relation_type) {
		/** This filter is documented in wp-includes/formatting.php */
		$emoji_svg_url = apply_filters('emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/');
		$urls = array_diff($urls, array($emoji_svg_url));
	}
	return $urls;
}

if (!is_admin()) {
	// add_filter('show_admin_bar', '__return_false');
}

function wpgenealogy_disable_embeds_code_init() {
	add_filter('tiny_mce_plugins', 'wpgenealogy_disable_embeds_tiny_mce_plugin');
	// Turn off oEmbed auto discovery.
	add_filter('embed_oembed_discover', '__return_false');
	// Remove the REST API endpoint.
	remove_action('rest_api_init', 'wp_oembed_register_route');
	// Don't filter oEmbed results.
	remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
	// Remove oEmbed discovery links.
	remove_action('wp_head', 'wp_oembed_add_discovery_links');
	// Remove oEmbed-specific JavaScript from the front-end and back-end.
	remove_action('wp_head', 'wp_oembed_add_host_js');
}
add_action('init', 'wpgenealogy_disable_embeds_code_init', 9999);

function wpgenealogy_disable_embeds_tiny_mce_plugin($plugins) {
	return array_diff($plugins, array('wpembed'));
}
