<?php
/**
 * Runs during plugin deinstallation.
 */
class AddressMapperUninstaller {

  /**
   * Runs all uninstall functions
   */
  public static function uninstall() {
    static::destroyDatabase();
  }

  /**
   * Drops the table created in AddressMapperActivator::initializeDatabase
   */
  private static function destroyDatabase() {
    global $wpdb;

    $table_name = $wpdb->prefix.'address_mapper';

    $sql = "DROP TABLE IF EXISTS {$table_name};";
    $wpdb->query($sql);

    delete_option('address_mapper_db_version');
  }
}
