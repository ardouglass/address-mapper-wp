<?php
/**
 * Runs during plugin activation.
 */
class AddressMapperActivator {

  private static $db_version = '1.0';

  /**
   * Runs all activation functions
   */
  public static function activate() {
    static::initializeDatabase();
  }

  /**
   * Creates the database table
   *
   * If this needs to be changed in the future, consider an upgrade function:
   * https://codex.wordpress.org/Creating_Tables_with_Plugins
   */
  private static function initializeDatabase() {
    global $wpdb;

    $table_name = $wpdb->prefix.'address_mapper';
	  $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE {$table_name} (
      id char(32) NOT NULL,
      data json NOT NULL,
      lng float(10, 6) NOT NULL,
      lat float(10, 6) NOT NULL,
      PRIMARY KEY  (id)
    ) {$charset_collate};";

    require_once(ABSPATH.'wp-admin/includes/upgrade.php');
    dbDelta($sql);

    add_option('address_mapper_db_version', self::$db_version);
  }
}
