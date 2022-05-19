const express = require('express');
const router = express.Router();

const ItemDb = require('../database/itemdb');

//get all items
router.get('/', (req, res)=>{
    const items = ItemDb.getAll().then( (v)=>{
        console.log("2gg",v);
        res.send(v);
    });
    
});
// create single item
router.post('/', (req, res)=>{
    var model = {
        name : req.body.name,
        price : req.body.price ,
        images : req.body.images,
        descri : req.body.description,
    }
    const create = ItemDb.saveItem(model).then((v)=>{
        res.send(v);

    });
});

router.get('/:id', (req, res)=>{
    ItemDb.getItem(req.params.id).then((item)=>{
        console.log(item)
        res.send(item)
        });
    });


// router.get('/testing2', (req, res)=>{
//     res.send( {
//         "url" : "http://localhost:3000/api/item"
//     }) ; 
// });
// get single item
// router.get('/:id', (req, res)=>{
//     res.send('this is get all');
// });
// //delete single item
// router.delete('/:id', (req, res)=>{
//     res.send('this is get all');
// });
// //update single itme
// router.put('/:id', (req, res)=>{
//     res.send('this is get all');
// });
//get all items




module.exports = router;
