<?php
/**
 * Plugin Name:     Dekode Test
 * Plugin URI:      #
 * Description:     Adds a custom gutenberg block
 * Author:          Erik F. Saetren
 * Author URI:      vikentek.no
 * Text Domain:     dekode-test
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 */


 function efsRegisterBlockAssets(){
    wp_register_script('dekode-ski-resort-block-js', plugins_url('assets/js/dekode-ski-resort-block.js', __FILE__), array('wp-blocks', 'wp-element', 'wp-components', 'wp-block-editor', 'jquery'));
    wp_register_style( 'dekode-ski-resort-block-css', plugins_url('assets/css/dekode-ski-resort-block.css', __FILE__));
    
    wp_localize_script(
        'dekode-ski-resort-block-js',
        'ski_resort_ajax_obj',
        array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('ski_resort_query'),
        )
    );
 }
 add_action('init', 'efsRegisterBlockAssets'); 
 

 function efsRegisterDekodeBlock(){
    register_block_type('dekode/ski-resort', [
        'editor_script' => 'dekode-ski-resort-block-js',
        'editor_style'  => 'dekode-ski-resort-block-css',
        'style'  => 'dekode-ski-resort-block-css'
    ]);
 }
 add_action('init', 'efsRegisterDekodeBlock');

 
// Include the FnuggConnector class
include_once dirname(__FILE__) . '/classes/fnugg-connector.php';

?>
