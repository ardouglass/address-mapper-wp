<?php
/**
 * Runs during plugin activation.
 */
class AddressMapper {

  /**
   * Sets up all the hooks
   */
  public function run() {
    add_action('admin_menu', array($this, 'add_menu_item'));
    add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
  }

  /**
   * Adds the menu to the primary interface
   */
  public function add_menu_item() {
    add_menu_page('Address Mapper', 'Address Mapper', 'edit_pages', 'address_mapper', array($this, 'html'), 'dashicons-location-alt', 50);
  }

  /**
   * Outputs the HTML content for the scripts to hook into
   */
  public function html() { ?>
    <div class="wrap">
      <div id="address-mapper-hook"></div>
    </div>
  <?php
  }

  /**
   * Loads the compiled admin scripts
   */
  public function enqueue_scripts() {
    wp_enqueue_script('address-mapper-admin-scripts', ADDRESS_MAPPER_URL.'dist/address-mapper.min.js', array(), null, true);
  }
}
