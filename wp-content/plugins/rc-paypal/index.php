<?php

/*
 * Plugin Name: RC PayPal
 * Description: Adds PayPal SDK Support. Needed for donations page
 * Version: 1.0
 * Author: Roberto Cannella
 * Author URI:
 *
 */

if ( !defined('ABSPATH') )  exit; // exit if accessed directly

class PayPalFunctionality{

    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'adminAssets']);
        add_action( 'admin_menu', [$this, 'rc_paypal_init_menu']);

    }
    function adminAssets(){
        wp_enqueue_script('rc-paypal',plugin_dir_url(__FILE__) . 'build/index.js',null);
    }

    function rc_paypal_init_menu() {
        wp_enqueue_script('rc-paypal-admin',plugin_dir_url(__FILE__) . 'build/admin.js', ['wp-element']);
        add_menu_page(
        /* Page title */
            __( 'Donations', 'rc-paypal' ),

            /* Menu title */
            __( 'Donations', 'rc-paypal' ),

            /* Capability required to access the page */
            'manage_options',

            /* Menu slug */
            'rc-paypal-plugin',

            /* Function to call to load the admin template */
            array( $this, 'load_admin_template' )
        );

    }
    // Load the admin template
    public function load_admin_template() {
        // Load the template file using the plugin_dir_path function
        $template = plugin_dir_path( __FILE__ ) . 'templates/app.php';
        // Check if the file exists
        if ( file_exists( $template ) ) {
            // Include the template file
            include( $template );
        }
    }
}

$payPalFunctionality = new PayPalFunctionality();





