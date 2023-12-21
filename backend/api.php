<?php
// Allows requests from any domain
header("Access-Control-Allow-Origin: *");
// Used to specify which HTTP headers can be used during the actual request
header("Access-Control-Allow-Headers: *");
// Defines the methods that the browser is allowed to use when making CORS
header("Access-Control-Allow-Methods: *");
// Helps the client (browser) understand how to interpret the data received from the server
header('Content-Type: application/json');

require_once __DIR__ . '/vendor/autoload.php';

// To connect to the database
$client = new MongoDB\Client('mongodb://localhost:27017');

// To get the collections of the database
$movies_colc = $client->WatchVault->movies;
$tv_shows_colc = $client->WatchVault->tv_shows;

$method = $_SERVER['REQUEST_METHOD'];
$type = $_GET['type'] ?? '';
$id = $_GET['id'] ?? '';
$genre = $_GET['genre'] ?? '';


if ($method === 'GET') {
  switch($type) {
    case 'movies': // To get all movies
      $movies = $movies_colc->find([])->toArray();
      echo json_encode($movies);
      break;

    case 'getMovie': // To get a specific movie
      $movie = $movies_colc->find(["_id" => new MongoDB\BSON\ObjectId("$id")])->toArray();
      echo json_encode($movie);
      break;

    case 'shows': // To get all tv shows 
      $tv_shows = $tv_shows_colc->find([])->toArray();
      echo json_encode($tv_shows);
      break;

    case 'getShow': // To get a specific tv show
      $show = $tv_shows_colc->find(["_id" => new MongoDB\BSON\ObjectId("$id")])->toArray();
      echo json_encode($show);
      break;

    case 'genres': // To get all movies and shows genres
      $movies_genres = $movies_colc->distinct('genre');
      $shows_genres = $tv_shows_colc->distinct('genre');
      echo json_encode(array_unique(array_merge($movies_genres, $shows_genres)));
      break;

    case 'getGenre': // To get all movies and shows of a specific genre
      $movies = $movies_colc->find(["genre" => $genre])->toArray();
      $shows = $tv_shows_colc->find(["genre" => $genre])->toArray();
      echo json_encode(['movies' => $movies, 'shows' => $shows]);
      break;
  };

// To update a movie or a tv show
} elseif ($method === 'PUT') {
  $values = json_decode( file_get_contents('php://input') );
  if ($type === 'updateMovie') {
    $movies_colc->updateOne(
      ["_id" => new MongoDB\BSON\ObjectId("$id")],
      ['$set' => $values]
    );
  } elseif ($type === 'updateShow') {
    $tv_shows_colc->updateOne(
      ["_id" => new MongoDB\BSON\ObjectId("$id")],
      ['$set' => $values]
    );
  }

// To insert a new movie or tv show
} elseif ($method === 'POST') {
  $values = json_decode(file_get_contents('php://input'));
  if ($type === 'insertMovie') {
    $movies_colc->insertOne($values);
  } elseif ($type === 'insertShow') {
    $tv_shows_colc->insertOne($values);
  }

// To delete a movie or a tv show
} elseif ($method === 'DELETE') {
  if ($type === 'deleteMovie') {
    $movies_colc->deleteOne(
      ["_id" => new MongoDB\BSON\ObjectId("$id")]
    );
  } elseif ($type === 'deleteShow') {
    $tv_shows_colc->deleteOne(
      ["_id" => new MongoDB\BSON\ObjectId("$id")]
    );
  }  
}

?>