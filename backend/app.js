// npm install --save express
const express = require('express');
const bodyParser = require('body-parser');

// // npm install --save mongoose
const mongoose = require('mongoose');


const Products = require('./models/product');

const app = express();

mongoose.connect('mongodb://abelMongo:B3EbApdwnY3eaN6@cluster0-shard-00-00.thyhm.mongodb.net:27017,cluster0-shard-00-01.thyhm.mongodb.net:27017,cluster0-shard-00-02.thyhm.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4h7o1l-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });




// a middleware to confing the CORS
// npm install --save body-parser
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());


// create <==> POST
app.post('/api/products', (req, res, next) => {
    const product = new Products({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock
    });
    product.save().then(
      () => {
        res.status(201).json({
        //   message: 'Product saved successfully!'
        product: Products
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


 // get single element
 app.get('/api/products/:id', (req, res, next) => {
    Products.findOne({
      _id: req.params.id
    }).then(
      (product) => {
        res.status(200).json(product);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });



  // update elments
  app.put('/api/products/:id', (req, res, next) => {
    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock:req.body.inStock
    });
    Products.updateOne({_id: req.params.id}, product).then(
      () => {
        res.status(201).json({
          message: 'Modified!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });



  // delete element
  app.delete('/api/products/:id', (req, res, next) => {
    Products.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


//   all products
app.use('/api/products', (req, res, next) => {
    Products.find().then(
      (product) => {
        res.status(200).json(product);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


module.exports = app;