# DB, collection

```javascript
use site
show dbs
show collections
```

## Base

Gets all documents from collection:
```javascript
db.users.find()
```

Choose fields:
```javascript
db.users.find({}, {name : 1, age : 1, _id : 0})
```

Limits:
```javascript
db.users.find({}, {name : 1, age : 1, _id : 0}).limit(4)
```

Sort result
```javascript
db.users.find({}, {name : 1, age : 1, _id : 0}).sort({age : 1}).limit(4)


db.users.find({}, {name : 1, age : 1, _id : 0}).sort({age : -1}).limit(4)
```

Skips some results

```javascript
db.users.find({}, {name : 1, age : 1, _id : 0}).sort({age : 1}).skip(1).limit(4)


db.users.find({}, {name : 1, age : 1, _id : 0}).sort({age : -1}).skip(1).limit(4)
```

Find min and max value

```javascript
db.users.find({}, {age : 1, _id : 0}).sort({age : 1}).limit(1)

db.users.find({}, {age : 1, _id : 0}).sort({age : -1}).limit(1)
```

Field exists

```javascript
db.users.find({notes : {$exists: true}}, {name : 1, notes: 1, _id: 0})

db.users.find({notes : {$exists: false}}, {name : 1, notes: 1, _id: 0})
```



## Find

several criteria

```javascript
db.users.find({active : true}, {name : 1, active:1, role: 1,  _id: 0})
db.users.find({active : true, role : 'user'}, {name : 1, active:1, role: 1,  _id: 0})

```

Expressions $and / $or

```javascript
db.users.find({$and : [{age: 22}, {age:40}]}, {name : 1, age: 1, role: 1,  _id: 0})
db.users.find({$or : [{age: 22}, {age:40}]}, {name : 1, age: 1, role: 1,  _id: 0})
```

Expressions $ne

```javascript
db.users.find({role : {$ne : "admin"}}, {name : 1, age: 1, role: 1,  _id: 0})

```

Expressions $nin

```javascript
db.users.find({role : {$nin : ["admin", "user"]}}, {name : 1, age: 1, role: 1,  _id: 0})

```

Expressions $in

```javascript
db.users.find({role : {$in : ["admin", "user"]}}, {name : 1, age: 1, role: 1,  _id: 0})

```

Expressions is greater / is less

```javascript
db.users.find({age : {$gt : 30}}, {name: 1, age : 1, _id : 0})
db.users.find({age : {$gte : 30}}, {name: 1, age : 1, _id : 0})

db.users.find({age : {$lt : 30}}, {name: 1, age : 1, _id : 0})
db.users.find({age : {$lte : 30}}, {name: 1, age : 1, _id : 0})
```

Ranges

```javascript
db.users.find({$and : [{age : {$gte : 25}}, {age : {$lte : 30}}]}, {name: 1, age : 1, _id : 0})

db.users.find({$or : [{age : {$lt : 25}}, {age : {$gt : 30}}]}, {name: 1, age : 1, _id : 0})

db.users.find({
  age: { $not: { $gt: 25 } }
},{name: 1, age : 1, _id : 0})

```

Dot notation

```javascript
db.users.find(
    {"address.country" : "UA"},
    {name: 1, age : 1, _id : 0, address: 1})
```

```javascript
db.users.find(
    {"address.country" : {$ne: "UA"}},
    {name: 1, age : 1, _id : 0, address: 1})
```

## Find in array

Value of array

```javascript
db.users.find(
    { tags : "js"},
    {name: 1, age : 1, _id : 0, tags: 1})
```

Size of array

```javascript
db.users.find(
    { tags : {$size: 2}},
    {name: 1, age : 1, _id : 0, tags: 1})
```

all values from array

```javascript
db.users.find(
    { tags : {$all: ["js", "node"]}},
    {name: 1, age : 1, _id : 0, tags: 1})
```

## Test search

** create index before use
create index

```javascript
db.goods.createIndex({ title: "text"});
```


```javascript
db.goods.find(
    {$text: {$search : "pro"}},
    {title: 1, _id :0}
)
```

RegExp
```javascript
db.goods.find( { title: { $regex: "lad", $options: "i" } } )
```

<!--  -->
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import { setClient } from './db/db.js';

const MONGO_URI = process.env.MONGO_URI;

// connect to MongoDB
const client = new MongoClient(MONGO_URI);
try {
    await client.connect();
    setClient(client);
    console.log('Connect to MONGODB - OK');
}
catch (err) {
    console.log(err);
    process.exit(1);
}

import { getUsersCollection } from './db/collections.js';

//! READ
const getAllUsers = async () => {
    // const cursor = getUsersCollection().find(
    //     {}, 
    //     { projection : {name : 1, _id : 0}}
    // );

    // const cursor = getUsersCollection().find(
    //     {},
    //     { projection: { name: 1, _id: 0 } }
    // ).limit(2).skip(1);

    // const cursor = getUsersCollection().find(
    //     {
    //         age: { $exists: true }
    //     },
    //     { projection: { name: 1, age: 1, _id: 0 } }
    // ).sort({ age: 1 }).limit(1)

    // const cursor = getUsersCollection().find(
    //     {
    //         age: { $exists: false }
    //     },
    //     { projection: { name: 1, age: 1, _id: 0 } }
    // )

    //! AND
    // const cursor = getUsersCollection().find(
    //     {
    //        $and : [{active:true}, {role: "admin"}]
    //     }
    // ).sort({ age: 1 }).limit(1)

    //!OR
    // const cursor = getUsersCollection().find(
    //     {
    //         $or: [{ role: "moderator"}, { role: "admin" }]
    //     }
    // )

    //!  ne
    // const cursor = getUsersCollection().find(
    //     {
    //         role : {$ne : "admin"}
    //     }
    // )

    //!  in
    // const cursor = getUsersCollection().find(
    //     {
    //         role: { $in: ["admin", "moderator"] }
    //     }
    // )

    //!  nin
    // const cursor = getUsersCollection().find(
    //     {
    //         role: { $nin: ["admin", "moderator"] }
    //     }
    // )

    //! gt - gte - lt
    // const cursor = getUsersCollection().find(
    //     {
    //         // age : {$gte : 34}
    //         age: { $lte: 22 }
    //     }
    // )

    //! range
    // const cursor = getUsersCollection().find(
    //     {
    //         $and : [
    //             { age : {$gt : 27}},
    //             { age : {$lt : 35}},
    //         ]
    //     }
    // )

    //! dot notation
    // const cursor = getUsersCollection().find(
    //     {
    //         "address.country":  {$ne : "Ukraine"}
    //     }
    // )

    //! array
    // const cursor = getUsersCollection().find(
    //     {
    //         // tags:  "JavaScript"
    //         // tags:  {$in: ["JavaScript", "Docker"]}
    //         // tags:  {$size: 2}
    //         // tags:  {$all: ["Linux", "Docker", "Kubernetes"]}
    //     }
    // )

    //? RegExp
    // const cursor = getUsersCollection().find(
    //     {
    //         name : {$regex : "al", $options: "i"}
    //     }
    // )

    //! text find - index
    const cursor = getUsersCollection().find(
        {
            $text : {$search : "Alex"}
        }
    )


    const data = await cursor.toArray();
    console.log(data);
}

await getAllUsers();


await client.close();