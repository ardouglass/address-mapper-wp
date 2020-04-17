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

    register_rest_route(Config::$endpoints_base, '/points/geojson', [
      [
        'methods' => 'GET',
        'callback' => [static::class, 'get_points_geojson']
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

    $updated_by = get_option('address_mapper_updated_by', null);
    $updated_at = get_option('address_mapper_updated_at', null);

    // Return data
    return [
      'code' => 'get_success',
      'message' => 'Retrieved locations.',
      'data' => [
        'status' => 200,
        'lastUpdatedDate' => $updated_at,
        'lastUpdatedUser' => $updated_by,
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

    // Store lateest user to update
    $updated_by = wp_get_current_user()->user_login;
    update_option('address_mapper_updated_by', $updated_by);

    // Store last update time
    $updated_at = time();
    update_option('address_mapper_updated_at', $updated_at);

    // Return data
    return [
      'code' => 'update_success',
      'message' => 'Updated locations.',
      'data' => [
        'status' => 200,
        'lastUpdatedDate' => $updated_at,
        'lastUpdatedUser' => $updated_by
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

  /**
   * Gets the geojson from the database.
   */
  public static function get_points_geojson($request) {
    global $wpdb;
    $address_mapper_table = $wpdb->prefix . 'address_mapper';

    // Build the query
    $query = "SELECT * FROM $address_mapper_table";

    // Run the query
    $result = $wpdb->get_results($query);

    // Handle errors
    if ($result === false) {
      return new \WP_Error('get_error', 'Unable to get geojson.', [
        'status' => 500
      ]);
    }

    $geo_precision_decimals = 4; // parcel-level accuracy: ~11m square
    if (!Config::check_user_permissions()) {
      $geo_precision_decimals = 3; // fuzzy accuracy: ~110m square
    }

    // Force data field to be real JSON instead of stringified JSON
    $values = [];
    foreach ($result as $point) {
      $values[] = [
        'type' => 'Feature',
        'properties' => json_decode('{}'), // This is dumb, but I don't know how else to get an empty object
        'geometry' => [
          'type' => 'Point',
          'coordinates' => [
            round($point->lng, $geo_precision_decimals),
            round($point->lat, $geo_precision_decimals)
          ]
        ]
      ];
    }

    $geojson = [
      'type' => 'FeatureCollection',
      'features' => $values
    ];

    // Return data
    $full_response = [
      'code' => 'get_success',
      'message' => 'Retrieved locations.',
      'data' => [
        'status' => 200,
        'geojson' => $geojson
      ]
    ];

    add_filter(
      'rest_pre_serve_request',
      function () use ($full_response) {
        echo json_encode($full_response, JSON_NUMERIC_CHECK);
        return true;
      },
      10,
      4
    );
  }
}
