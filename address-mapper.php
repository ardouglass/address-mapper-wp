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
	die;
}

define('ADDRESS_MAPPER_PATH', plugin_dir_path(__FILE__));
define('ADDRESS_MAPPER_URL', plugin_dir_url(__FILE__));

/**
 * The code that runs during plugin activation.
 * This action is documented in backend/lifecycle/AddressMapperActivator.class.php
 */
function activate_address_mapper() {
	require_once ADDRESS_MAPPER_PATH.'backend/lifecycle/AddressMapperActivator.class.php';
	AddressMapperActivator::activate();
}
register_activation_hook(__FILE__, 'activate_address_mapper');

/**
 * The code that runs during plugin deactivation.
 * This action is documented in backend/lifecycle/AddressMapperDeactivator.class.php
 */
function deactivate_address_mapper() {
	require_once ADDRESS_MAPPER_PATH.'backend/lifecycle/AddressMapperDeactivator.class.php';
	AddressMapperDeactivator::deactivate();
}
register_deactivation_hook(__FILE__, 'deactivate_address_mapper');

/**
 * The code that runs during plugin uninstallation.
 * This action is documented in backend/lifecycle/AddressMapperUninstaller.class.php
 */
function uninstall_address_mapper() {
	require_once ADDRESS_MAPPER_PATH.'backend/lifecycle/AddressMapperUninstaller.class.php';
	AddressMapperUninstaller::uninstall();
}
register_uninstall_hook(__FILE__, 'uninstall_address_mapper');

/**
 * The core plugin class.
 */
require ADDRESS_MAPPER_PATH.'backend/lifecycle/AddressMapper.class.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 */
function run_address_mapper() {
	$address_mapper = new AddressMapper();
	$address_mapper->run();
}
run_address_mapper();
