<?php

namespace AddressMapper\Lifecycle;

/**
 * Runs during plugin activation.
 */
class Activator {
  private static $db_version = '1.1';

  /**
   * Runs all activation functions
   */
  public static function activate() {
    static::createAddressTable();
    static::createSettingsTable();
    update_option('address_mapper_db_version', static::$db_version);
  }

  /**
   * Creates the database table for addresses that have been mapped
   *
   * If this needs to be changed in the future, consider an upgrade function:
   * https://codex.wordpress.org/Creating_Tables_with_Plugins
   */
  private static function createAddressTable() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'address_mapper';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE {$table_name} (
      id char(32) NOT NULL,
      data json NOT NULL,
      lng float(10, 6) NOT NULL,
      lat float(10, 6) NOT NULL,
      PRIMARY KEY  (id)
    ) {$charset_collate};";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
  }

  /**
   * Creates the database table for settings
   *
   * If this needs to be changed in the future, consider an upgrade function:
   * https://codex.wordpress.org/Creating_Tables_with_Plugins
   */
  private static function createSettingsTable() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'address_mapper_settings';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE {$table_name} (
      key_name varchar(255) NOT NULL,
      key_value varchar(255) NOT NULL,
      PRIMARY KEY  (key_name)
    ) {$charset_collate};";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
  }
}
