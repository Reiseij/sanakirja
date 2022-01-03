const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Morgan logaa kaikki pyynnöt
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./src/app/routes/api");

app.use("/", router);

//app.use("/", require("./src/app/routes/api"));

const port = process.env.PORT || 3000;

//DB connection

mongoose.connect(
  "<mongodb access here>",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  console.log("Succesfully connected to database!")
);

app.listen(port, function () {
  console.log("Server running on port " + port);
});

var connection = mongoose.connection;
var sanacollection;

connection.on("error", console.error.bind(console, "connection error:"));
/*connection.once("open", function () {
  connection.db.collection("sanas", function (err, collection) {
    collection.find({}).toArray(function (err, data) {
      //console.log(data); // it will print your collection data
      sanacollection = data;
      console.log(sanacollection);
    });
  });
});
*/

/*connection.once("open", function () {
  connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      console.log(names);
    }
  });
});
*/
