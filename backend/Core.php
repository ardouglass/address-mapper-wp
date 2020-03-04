<?php

namespace AddressMapper;

use AddressMapper\Config;
use AddressMapper\Endpoints;

/**
 * Runs the plugin.
 */
class Core {
  /**
   * Sets up all the hooks.
   */
  public function run() {
    add_action('admin_menu', [$this, 'add_menu_item']);
    add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
    add_action('rest_api_init', [$this, 'register_endpoints']);
  }

  /**
   * Adds the menu to the primary interface.
   */
  public function add_menu_item() {
    add_menu_page(
      'Address Mapper',
      'Address Mapper',
      Config::check_user_permissions(true),
      'address_mapper',
      [$this, 'html'],
      'dashicons-location-alt',
      50
    );
  }

  /**
   * Outputs the HTML content for the scripts to hook into.
   */
  public function html() {
    ?>
    <div class="wrap">
      <div id="address-mapper-hook"></div>
    </div>
  <?php
  }

  /**
   * Loads the compiled admin scripts.
   */
  public function enqueue_scripts() {
    $current_screen_id = get_current_screen()->id;
    if ($current_screen_id == 'toplevel_page_address_mapper') {
      wp_enqueue_script(
        'address-mapper-admin-scripts',
        Config::$plugin_base_url . 'dist/address-mapper.min.js',
        [],
        null,
        true
      );

      wp_localize_script(
        'address-mapper-admin-scripts',
        'addressMapperApiSettings',
        ['nonce' => wp_create_nonce('wp_rest')]
      );
    }
  }

  /**
   * Loads the REST endpoints for the plugin.
   */
  public function register_endpoints() {
    Endpoints\Settings::google_maps_api_key_routes();
  }
}
