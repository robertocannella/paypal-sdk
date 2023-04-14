<?php

/*
 * Plugin Name: RC PayPal
 * Description: Adds PayPal SDK Support
 * Version : 1.0
 */

if ( !defined('ABSPATH') )  exit; // exit if accessed directly

class PayPalFunctionality{

    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'adminAssets']);
    }
    function adminAssets(){
        wp_enqueue_script('rc-paypal',plugin_dir_url(__FILE__) . 'build/index.js', null);
    }
}

$payPalFunctionality = new PayPalFunctionality();

