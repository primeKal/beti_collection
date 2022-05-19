const mongoose = require('mongoose');



const itemSchema = mongoose.Schema({
    name : {type : String , required : true}, 
    price : Number,
    images : [ String ],
    date : { type : Date, default : Date.now()},
    descritpion : String
});

const Item = mongoose.model('Item', itemSchema);

async function getAll(){
    var items = await Item.find();
    console.log('db method', items)
    return items;
}

async function getItem(id){
    var item = await Item.findById(id);
    console.log(item,'thisisitem');
    return item;
}

async function saveItem (model) {
    var name = model.name;
    var price = model.price;
    var images = model.images;
    var descri = model.descritpion;

    const item = new Item({
        name : name,
        price : price ,
        images : images ,
        descritpion : descri
    });
    const result = await item.save();
    console.log('result', result);
    return result;
}

module.exports.saveItem = saveItem;
module.exports.getAll = getAll;
module.exports.getItem = getItem;

