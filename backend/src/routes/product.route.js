const express = require('express');
const router = express.Router();

const {Product,Category} = require('../models');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addProduct = async (req, res) => {
    console.log(req.body)
    try {
        const product = await Product.create(req.body);
        let category = req.body.category;
        let existingCategory = await Category.findOne({name:category});
        if(!existingCategory){
            let newCategory = await Category.create({name:category});
            newCategory.products.push(product);
            await newCategory.save();
        }else{
            existingCategory.products.push(product);
            await existingCategory.save();
        }
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteProduct = async (req, res) => {
    console.log(req.query);
    try {
        let product = await Product.findByIdAndDelete(req.query.id);
        
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const editProduct = async (req, res) => {
    console.log(req.body);
    try {
        let product = await Product.findByIdAndUpdate(req.body.id, req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



const getAllProductByCategory = async (req, res) => {
    try {
        if (req.query.category) {
            const category = await Category.findOne({ name: req.query.category });
            const productsIds = await category.products;
            const products = await Product.find({ _id: { $in: productsIds } });
            console.log(products);
            res.json(products);
        } else {
            const products = await Product.find();
            res.json(products);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

router.post('/',addProduct);
router.delete('/',deleteProduct);
router.put('/',editProduct);
router.get('/', getAllProductByCategory);
module.exports = router;