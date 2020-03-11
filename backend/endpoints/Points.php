<?php

namespace AddressMapper\Endpoints;

use AddressMapper\Config;

/**
 * Settings REST routes.
 */
class Points {
  /**
   * Registers the Points routes.
   */
  public static function points_routes() {
    // passing the static function like a normal callable does not work for some reason
    $permission_callback = function () {
      return Config::check_user_permissions();
    };

    register_rest_route(Config::$endpoints_base, '/points', [
      [
        'methods' => 'GET',
        'callback' => [static::class, 'get_points']
      ],
      [
        'methods' => 'POST',
        'callback' => [static::class, 'create_points'],
        'permission_callback' => $permission_callback
      ]
    ]);

    register_rest_route(Config::$endpoints_base, '/points/ids', [
      [
        'methods' => 'GET',
        'callback' => [static::class, 'get_points_ids'],
        'permission_callback' => $permission_callback
      ]
    ]);
  }

  /**
   * Gets the points in the database.
   */
  public static function get_points($request) {
    global $wpdb;
    $address_mapper_table = $wpdb->prefix . 'address_mapper';

    // Build the query
    $query = "SELECT * FROM $address_mapper_table";

    // Run the query
    $result = $wpdb->get_results($query);

    // Handle errors
    if ($result === false) {
      return new \WP_Error('get_error', 'Unable to get locations.', [
        'status' => 500
      ]);
    }

    // Force data field to be real JSON instead of stringified JSON
    $values = [];
    foreach ($result as $point) {
      $values[] = [
        'id' => $point->id,
        'data' => json_decode($point->data),
        'lat' => $point->lat,
        'lng' => $point->lng
      ];
    }

    // Return data
    return [
      'code' => 'get_success',
      'message' => 'Retrieved locations.',
      'data' => [
        'status' => 200,
        'points' => $values
      ]
    ];
  }

  /**
   * Creates the points in the database.
   */
  public static function create_points($request) {
    global $wpdb;
    $address_mapper_table = $wpdb->prefix . 'address_mapper';

    // Get the posted data
    $params = $request->get_json_params();
    $points = $params['points'];

    // Build the query
    $values = [];
    foreach ($points as $point) {
      $values[] = $wpdb->prepare('(%s, %s, %f, %f)', [
        $point['id'],
        json_encode($point['data']),
        $point['lat'],
        $point['lng']
      ]);
    }
    $query = "
      INSERT INTO $address_mapper_table
        (id, data, lat, lng)
      VALUES
    ";
    $query .= implode(",\n", $values);

    // Run the query
    $result = $wpdb->query($query);

    // Handle errors
    if ($result === false) {
      return new \WP_Error('update_error', 'Unable to update locations.', [
        'status' => 500
      ]);
    }

    // Return data
    return [
      'code' => 'update_success',
      'message' => 'Updated locations.',
      'data' => [
        'status' => 200
      ]
    ];
  }

  /**
   * Gets the points in the database.
   */
  public static function get_points_ids($request = null) {
    global $wpdb;
    $address_mapper_table = $wpdb->prefix . 'address_mapper';

    // Build the query
    $query = "SELECT id FROM $address_mapper_table";

    // Run the query
    $result = $wpdb->get_col($query);

    // Handle errors
    if ($result === false) {
      return new \WP_Error('get_error', 'Unable to get location ids.', [
        'status' => 500
      ]);
    }

    // Return data
    return [
      'code' => 'get_success',
      'message' => 'Retrieved locations.',
      'data' => [
        'status' => 200,
        'ids' => $result
      ]
    ];
  }
}
