const express = require("express");
const mongoose = require("mongoose");
const Product = require("./Product");

const app = express();
app.use(express.json());

// let products = [{ title: "banana" }, { title: "apple" }];
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://JNathan:JNathan@cluster0.9agzx93.mongodb.net/Project?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((connection) =>
    console.log(`connected to ${connection.connections[0].name}`)
  );

app.get("/products", (req, res) => {
  Product.find({}, function (err, arr) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(arr);
    }
  });
});
app.post("/products", (req, res) => {
  let product = req.body;
  Product.create(product, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});
app.delete("/products/:id", (req, res) => {
  let { id } = req.params;
  Product.findOneAndDelete({ _id: id }, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

//patch
//put
app.patch("/products/:id", (req, res) => {
  let { price } = req.body;
  let { id } = req.params;
  Product.findOneAndUpdate(
    { _id: id },
    { price: price },
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.listen("2222", () => console.log("server is up"));
