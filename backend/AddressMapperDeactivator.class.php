<?php
/**
 * Runs during plugin deactivation.
 */
class AddressMapperDeactivator {

  /**
   * Runs all deactiation functions
   */
  public static function deactivate() {

  }

  /**
   * Drops the table created in AddressMapperActivator::initializeDatabase
   */
  private static function destroyDatabase() {

  }
}
