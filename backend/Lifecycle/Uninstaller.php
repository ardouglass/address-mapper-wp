<?php

namespace AddressMapper\Lifecycle;

/**
 * Runs during plugin deinstallation.
 */
class Uninstaller {
  /**
   * Runs all uninstall functions
   */
  public static function uninstall() {
    static::destroyAddressTable();
    static::destroySettingsTable();
    delete_option('address_mapper_db_version');
  }

  /**
   * Drops the table created in AddressMapper\Lifecycle\Activator::createAddressTable
   */
  private static function destroyAddressTable() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'address_mapper';

    $sql = "DROP TABLE IF EXISTS {$table_name};";
    $wpdb->query($sql);
  }

  /**
   * Drops the table created in AddressMapper\Lifecycle\Activator::createSettingsTable
   */
  private static function destroySettingsTable() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'address_mapper_settings';

    $sql = "DROP TABLE IF EXISTS {$table_name};";
    $wpdb->query($sql);
  }
}
