const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;

// app usefull area..
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const uri =
  "mongodb+srv://piasemi:iRI9T1yW46gXVmAb@nodemongocrud.jgzj8.mongodb.net/cruddb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("cruddb").collection("crudcollection");
  // perform actions on the collection object
  const newUser = {
    name: "kodu mia",
    job: " adar bepari",
    txt: "jahajer ki khobor.. ",
  };
  // get data from database
  app.get("/user", (req, res) => {
    collection.find({}).toArray((err, docs) => {
      res.send(docs);
    });
  });
  // collection.insertOne(newUser).then((result) => {});

  // post data to database from front end
  app.post("/addUser", (req, res) => {
    const user = req.body;
    collection.insertOne(user).then((result) => {
      res.redirect("/");
      console.log(
        "data inserted successfully,i found result.ops personaly",
        result.ops
      );
    });
  });
  // console.log("data insserted successfully", result.ops);
  console.log(err);
  console.log("databaseConnected");

  // deete data from database
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    collection.removeOne({ _id: ObjectId(id) }).then((result) => {
      res.send(result.deletedCount > 0);
    });
  });
  // load signle data from database
  app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    collection.find({ _id: ObjectId(id) }).toArray((err, docs) => {
      res.send(docs[0]);
    });
  });
  // update user's data from front end
  app.patch("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    console.log(req.body.age);
    collection
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: { age: req.body.age },
        }
      )
      .then((res) => console.log(res));
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(8080, () => console.log("listening to port 8080"));

// iRI9T1yW46gXVmAb
