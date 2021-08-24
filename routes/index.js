var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')


var productSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  product_id: String,
  product_name: String,
  price: String,
  quantity: String,
})


var productModel = mongoose.model('product', productSchema)

//Connect 
     mongoose.connect('mongodb://localhost/Product_DB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//Get data
router.get('/get-data',(req,res,next)=> {
  productModel.find()
  .exec()
  .then(docs =>{
    console.log(docs)
    res.status(200).json(docs)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({err:'err'})
  })
 
})

//post data
router.post('/post-data',(req,res,next)=>{
 var data = new productModel({
  _id: new mongoose.Types.ObjectId(),
  product_id :req.body.product_id,
  product_name :req.body.product_name,
  price:req.body.price,
  quantity:req.body.quantity
 });
 data.save()
     .then(result=>{console.log(result)  
      res.status(200).json({mess:"post success", createdProduct:result}) 
      })
     .catch(err =>{res.status(500).json({err:err})
    })     
})

//put data
router.put('/put-data/:id', (req,res,next)=>{
  const updateOps =req.body
  productModel.updateOne({_id:req.params.id},req.body)
              .then(result =>{ res.status(200).json({mess:"put success", updateProduct:result})
            })
              .catch(err => {res.status(500).json({err:err})})
})
// delete data
router.delete('/delete-data/:id',(req, res, next) =>{
  productModel.remove({_id:req.params.id})
              .exec()
              .then(result =>{ res.status(200).json({mess:"delete success", delete:result})
            })
              .catch(err => {res.status(500).json({err:err})})
            })

module.exports = router;
