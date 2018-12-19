const redis = require('redis'),
      client = redis.createClient();

// all redis commands are available on client object

client.on("error", err => {
  if (err) throw err;
})

client.on("connect", () => {
  console.log('connected!');
})
// store key value pairs
client.set('redis', 'is cool');
// store key value pairs with call back function
client.set('hello', 'world', (err, response) => {
  if (err) throw err;
  console.log(response);
});


client.set("string key", "string val", redis.print);

// or in array, 

client.set(['goodbye', 'blue sky']);

// get values back
client.get('redis', (err, response) => {
  if (err) throw err;
  console.log(response); // outputs 'is cool'
})

// storing hashes

// * note CASING DOES NOT MATTER client.HMSET === client.hmset

// this way works but is ugly
client.hmset('objectName', 'key1', 'value1', 'key2', 'value2', 'key3', 'value3');

client.hmset('frameworks', {
  'javascript': 'ReactJS',
  'css': 'Bootstrap',
  'node': 'Express'
}, (err, response) => {
  if (err) throw err;
  console.log(response);
});

client.hgetall('frameworks', function (err, object) {
  if (err) throw err;
  console.log(object);
});

// storing lists
// rpush = right push
// lpush = left push, basically unshift
client.rpush(["listname", 'item1', 'item2'], (err, response) => {
  if (err) throw err;
  console.log(response);
});

// retrieve elements of list
// -1 as third argument means get all elements of this list
client.lrange('listname', 0, -1, (err, response) => {
  if (err) throw err;
  console.log(response);
})

// storing Sets

client.sadd(['tags', 'valOne', 'valOne'], (err, response) => {
  if (err) throw err;
  console.log(response); // should just return ['valOne']
}) 

// retrieve set members

client.smembers('tags', (err, response) => {
  if (err) throw err;
  console.log(response); // should return 'valOne'
})

// check to see if value exists
client.exists('tags', (err, response) => {
  response === 1 ? console.log('exists') : console.log("doesn't exist")
}) // should console.log('exists');

client.del('tags', (err, response) => {
  if (err) throw err;
  console.log(response); // should return 'valOne'
})

client.exists('tags', (err, response) => {
  response === 1 ? console.log('exists') : console.log("doesn't exist")
}) // should console..log('doesn't exist')

// give expiration time
client.set('key1', 'val1');
client.expire('key1', 30) // expires in 30 seconds

console.log(client);