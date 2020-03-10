<?php

namespace AddressMapper;

/**
 * Defines constants to use in the plugin.
 */
class Config {
  /**
   * The url of the plugin's directory.
   */
  public static $plugin_base_url;

  /**
   * The slug of the endpoint urls.
   */
  public static $endpoints_slug = 'address-mapper';

  /**
   * The version of the endpoints.
   */
  public static $endpoints_version = 'v1';

  /**
   * The endpoint base route.
   */
  public static $endpoints_base;

  /**
   * Set values that can't be set as the result of a function call.
   */
  public function __construct() {
    static::$plugin_base_url = plugin_dir_url(dirname(__FILE__));
    static::$endpoints_base =
      static::$endpoints_slug . '/' . static::$endpoints_version;
  }

  /**
   * The default user capability needed to use the plugin and it's APIs
   */
  public static function check_user_permissions($raw = false) {
    $capability = 'edit_others_posts';

    // Sometimes we just need the capability so a different function can check it
    if ($raw) {
      return $capability;
    }

    // Check the capability and return true or false
    return current_user_can($capability);
  }
}

// Call the constructor so all the values will be properly defined.
new Config();
