const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(cors());

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
  collection.insertOne(newUser).then((result) => {
    console.log("data insserted successfully", result.ops);
  });
  console.log(err);
  console.log("databaseConnected");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(8080, () => console.log("listening to port 8080"));

// iRI9T1yW46gXVmAb
