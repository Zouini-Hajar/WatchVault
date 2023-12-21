<?php
// PHP MongoDB Cheatsheet
//
// Introduction :
// This cheatsheet provides a quick reference guide for performing CRUD operations
// using PHP and MongoDB. The examples use a sample database named "test"

// Table of Contents :
// 1. Connecting to MongoDB
// 2. Create Operations
//    - Insert One Document
//    - Insert Many Documents
// 3. Read Operations
//    - Find One Document
//    - Find Many Documents
//    - Query Projection
//    - Limit and Sort Options
// 4. Update Operations
//    - Update One Document
//    - Update Many Documents
// 5. Delete Operations
//    - Delete One Document
//    - Delete Many Documents

require_once __DIR__ . '/vendor/autoload.php';

// 1. Connecting to MongoDB
$client = new MongoDB\Client('mongodb://localhost:27017');

// To get 'users' collection
$collection = $client->testDB->users;


// 2. Create Operations
// --> Insert One Document
// MongoDB syntax : users.insertOne({user: 'usr1', pwd: '1234'})

/*
$insertOneResult = $collection->insertOne([
  // '_id' => 1, You can specify your own id
  'user' => 'usr1',
  'pwd' => '1234'
]);

printf("Inserted %d document(s)<br>", $insertOneResult->getInsertedCount());

var_dump($insertOneResult->getInsertedId());
*/

// --> Insert Many Documents
// MongoDB syntax : users.insertMany([{user: 'usr2', pwd: '111'}, {user: 'usr3', pwd: '222'}])

/*
$insertManyResult = $collection->insertMany([
  [
    'user' => 'usr2',
    'pwd' => '111'
  ], 
  [
    'user' => 'usr3',
    'pwd' => '222'
  ]
]);

printf("Inserted %d document(s)<br>", $insertManyResult->getInsertedCount());

var_dump($insertManyResult->getInsertedIds());
*/


// 3. Read Operations
// --> Find One Document
// MongoDB syntax : users.findOne({user: 'usr1'})

/*
$document = $collection->findOne(['user' => 'usr1']);

var_dump($document);
*/

// --> Find Many Document
// MongoDB syntax : users.find({user: 'usr1'})

/*
$cursor = $collection->find(['user' => 'usr1']);

foreach ($cursor as $doc) {
  echo $doc['user'], '<br>';
}

// Or we can turn it into an array
var_dump($cursor->toArray());
*/

// --> Query Projection
// MongoDB syntax : users.find({user: 'usr1'}, {_id: 0, pwd: 1})

/*
$cursor = $collection->find([
    'user' => 'usr1'
  ],
  [
    'projection' => [
      '_id' => 0,
      'pwd' => 1
    ]
  ]
);

foreach ($cursor as $doc) {
  var_dump($doc);
}
*/

// --> Limit and Sort Options
// MongoDB syntax : users.find({user: 'usr1'}, {_id: 0, pwd: 1}, {limit: 1}, {sort: {pwd: -1})

/*
$cursor = $collection->find([
    'user' => 'usr1'
  ],
  [
    'projection' => [
      '_id' => 0,
      'pwd' => 1
    ],
    'limit' => 2,
    'sort' => ['pwd' => -1],
  ]
);

foreach ($cursor as $doc) {
  var_dump($doc);
}
*/


// 4. Update Operations
// --> Update One Document
// MongoDB syntax : users.updateOne({user: 'usr0'}, {$set: {user: 'zero'}})

/*
$updateOneResult = $collection->updateOne(
  ['user' => 'usr0'],
  ['$set' => ['user' => 'zero']]
);

printf("Matched %d document(s)\n", $updateOneResult->getMatchedCount());
printf("Modified %d document(s)\n", $updateOneResult->getModifiedCount());
*/

// --> Update Many Documents
// MongoDB syntax : users.updateMany({user: 'usr1'}, {$set: {user: 'one'}})

/*
$updateManyResult = $collection->updateMany(
  ['user' => 'usr1'],
  ['$set' => ['user' => 'one']]
);

printf("Matched %d document(s)\n", $updateManyResult->getMatchedCount());
printf("Modified %d document(s)\n", $updateManyResult->getModifiedCount());
*/


// 5. Delete Operations
// --> Delete One Document
// MongoDB syntax : users.deleteOne({user: 'usr1'})

/*
$deleteOneResult = $collection->deleteOne(['user' => 'one']);

printf('Deleted %d document(s)', $deleteOneResult->getDeletedCount());
*/

// --> Delete Many Document
// MongoDB syntax : users.deleteMany({user: 'usr1'})

/*
$deleteManyResult = $collection->deleteMany(['user' => 'one']);

printf('Deleted %d document(s)', $deleteManyResult->getDeletedCount());
*/