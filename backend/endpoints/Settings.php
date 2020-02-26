<?php

namespace AddressMapper\Endpoints;

use AddressMapper\Config;

/**
 * Settings REST routes.
 */
class Settings {
  private static $class_url_base = '/settings';

  /**
   * Registers the Google Maps API Key routes.
   */
  public static function google_maps_api_key_routes() {
    // passing the static function like a normal callable does not work for some reason
    $permission_callback = function () {
      return Config::check_user_permissions();
    };

    register_rest_route(
      Config::$endpoints_base,
      static::$class_url_base . '/google-maps-api-key',
      [
        [
          'methods' => 'GET',
          'callback' => [static::class, 'get_google_maps_api_key'],
          'permission_callback' => $permission_callback
        ],
        [
          'methods' => 'POST',
          'callback' => [static::class, 'set_google_maps_api_key'],
          'permission_callback' => $permission_callback
        ]
      ]
    );
  }

  /**
   * Fetches the Google Maps API key out of the database.
   */
  public static function get_google_maps_api_key($request) {
    global $wpdb;

    // Get the value of the google maps api key from the database
    $result = $wpdb->get_var(
      $wpdb->prepare(
        'SELECT key_value
        FROM ' .
          $wpdb->prefix .
          'address_mapper_settings
        WHERE key_name = %s',
        'google-maps-api-key'
      )
    );

    return ['google-maps-api-key' => $result];
  }

  /**
   * Updates the Google Maps API key in the database.
   */
  public static function set_google_maps_api_key($request) {
    global $wpdb;

    // Get the posted data
    $params = $request->get_json_params();
    $google_maps_api_key = $params['google-maps-api-key'];

    // Upsert into the database
    $result = $wpdb->replace(
      $wpdb->prefix . 'address_mapper_settings',
      [
        'key_name' => 'google-maps-api-key',
        'key_value' => $google_maps_api_key
      ],
      '%s'
    );

    if ($result === false) {
      return new WP_Error(
        'update_error',
        'Unable to update the Google Maps API key',
        ['status' => 500]
      );
    }

    return ['google-maps-api-key' => $google_maps_api_key];
  }
}