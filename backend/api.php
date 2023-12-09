<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

// Why do we need it ?
require_once __DIR__ . '/vendor/autoload.php';

// To connect to the database
$client = new MongoDB\Client('mongodb://localhost:27017');

// To get the collections of the database
$movies_colc = $client->WatchVault->movies;
$tv_shows_colc = $client->WatchVault->tv_shows;

$method = $_SERVER['REQUEST_METHOD'];
$type = $_GET['type'] ?? '';
$id = $_GET['id'] ?? '';

switch($method) {
  case "GET":
    if ($type === 'movies') {
      $movies = $movies_colc->find([])->toArray();
      echo json_encode($movies);
      exit;
    } elseif ($type === 'getMovie') {
      $movie = $movies_colc->find(["_id" => new MongoDB\BSON\ObjectId("$id")])->toArray();
      echo json_encode($movie);
      exit;
    } elseif ($type === 'shows') {
      $tv_shows = $tv_shows_colc->find([])->toArray();
      echo json_encode($tv_shows);
      exit;
    } elseif ($type === 'getShow') {
      $show = $tv_shows_colc->find(["_id" => new MongoDB\BSON\ObjectId("$id")])->toArray();
      echo json_encode($show);
      exit;
    }
    break;
  case "PUT":
    $values = json_decode( file_get_contents('php://input') );
    if ($type === 'updateMovie') {
      $movies_colc->updateOne(
        ["_id" => new MongoDB\BSON\ObjectId("$id")],
        ['$set' => $values]
      );
      exit;
    } elseif ($type === 'updateShow') {
      $tv_shows_colc->updateOne(
        ["_id" => new MongoDB\BSON\ObjectId("$id")],
        ['$set' => $values]
      );
      exit;
    }
  case "POST":
    $values = json_decode( file_get_contents('php://input') );
    if ($type === 'insertMovie') {
      $movies_colc->insertOne($values);
      exit;
    } elseif ($type === 'insertShow') {
      $tv_shows_colc->insertOne($values);
      exit;
    }
  case "DELETE":
    if ($type === 'deleteMovie') {
      $movies_colc->deleteOne(
        ["_id" => new MongoDB\BSON\ObjectId("$id")]
      );
      exit;
    } elseif ($type === 'deleteShow') {
      $tv_shows_colc->deleteOne(
        ["_id" => new MongoDB\BSON\ObjectId("$id")]
      );
      exit;
    }
    
}

?>