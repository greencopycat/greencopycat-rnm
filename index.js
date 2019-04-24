const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const api_url = "mongodb://localhost:27017";
const express = require('express');
const cors = require('cors');
const exp = express();
exp.use(cors());
const router = express.Router();

const query = (req, res, next) => {
  mongo.connect(api_url, { useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    const mydb = db.db('mongo');
    mydb.collection('Users').find(req.query).toArray((err, data) => res.json({"users": data}));
    db.close();
  });
}
exp.get('/all', query);

exp.get('/lookup', query);

exp.get('/adduser', (req, res, next)=> {
  mongo.connect(api_url, {useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    const mydb = db.db('mongo');
    let ok = mydb.collection('Users').insertOne(req.query, (err, resp) => {
      if(err) throw err;
      res.json(resp.result);
      db.close();
    });
  })
});

exp.get('/remove', (req, res, next) => {
  mongo.connect(api_url, { useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    const mydb = db.db('mongo');
    if(req.query._id) {
      let query = {
        _id: ObjectId(req.query._id)
      };

      mydb.collection('Users').deleteOne(query, (err, resp) => {
        if(err) throw err;
        res.json(resp);
      });
    }
  })
})

exp.get('/filmstrip', (req, res, next) => {
  mongo.connect(api_url, { useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    const mydb = db.db('mongo');
    mydb.collection('Filmstrip').find().toArray((err, data)=>res.json({"items": data}));
    db.close();
  });
})

exp.listen(3002, () => { console.log('listen to port: 3002')});
