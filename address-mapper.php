<?php
/**
 * Plugin Name:       Address Mapper
 * Plugin URI:        https://github.com/ardouglass/address-mapper
 * Description:       A WordPress plugin that allows users to upload CSVs of addresses, and then query them using a custom endpoint of the WordPress REST API.
 * Author:            Andrew Douglass
 * Author URI:        https://dou.glass/
 * License:           GPL v3 or later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
  die();
}

// Autoload all the things.
require_once 'vendor/autoload.php';

use AddressMapper\Lifecycle\Activator;
use AddressMapper\Lifecycle\Uninstaller;

/**
 * The code that runs during plugin activation and deinstallation.
 */
register_activation_hook(__FILE__, [Activator::class, 'activate']);
register_uninstall_hook(__FILE__, [Uninstaller::class, 'uninstall']);

/**
 * Begins execution of the plugin.
 */
function run_address_mapper() {
  $address_mapper = new AddressMapper\Core();
  $address_mapper->run();
}

run_address_mapper();