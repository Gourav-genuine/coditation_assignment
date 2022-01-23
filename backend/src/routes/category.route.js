const express = require("express");
const router = express.Router();

const { Product, Category } = require("../models");

const getAllCategories = async (req, res) => {
  console.log(req.query);
  try {
    if (req.query.name) {
      const category = await Category.findOne({ name: req.query.name });
      res.json(category);
    } else {
      const categories = await Category.find();
      res.json(categories);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const findCategory = async (req, res) => {
//   console.log(req.query);
//   try {
//     const category = await Category.findOne({ name: req.query.name });
//     res.json(category);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const addCategory = async (req, res) => {
  console.log(req.body);
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addChildCategory = async (req, res) => {
    console.log(req.body);
    try {
        const parentCategoryName = req.body.parent_category;
        const parentCategory = await Category.findOne({ name: parentCategoryName });
        console.log("loging parent",parentCategory);
        const childCategory = await Category.create(req.body);
        childCategory.save();
        parentCategory.child_categories.push(childCategory);
        await parentCategory.save();
        res.status(201).json(parentCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// const addParentCategory = async (req, res) => {
//     console.log(req.body);
//     try {
//         const parentCategoryName = req.body.parent_category;
//         const parentCategory = await Category.findOne({ name: parentCategoryName });
//         const childCategory = await Category.create(req.body);
//         parentCategory.child_categories.push(childCategory);
//         await parentCategory.save();
//         res.status(201).json(childCategory);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


const getChildCategories = async (req, res) => {
    console.log(req.query);
    try {
        let category = await Category.findOne({ name: req.query.name });
        let childCategoriesIds = await category.child_categories;
        let childCategories = await Category.find({ _id: { $in: childCategoriesIds } });
        console.log(childCategories);
        res.json(childCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCategory = async (req, res) => {
    console.log(req.query);
    try {
        let category = await Category.findByIdAndDelete(req.query.id);
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const editCategory = async (req, res) => {
    console.log(req.body);
    try {
        let category = await Category.findByIdAndUpdate(req.body.id, req.body);
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// const getAllProductByCategory = async (req, res) => {
//     console.log(req.query);
//     try {
//         if (req.query.category) {
//             const category = await Category.findOne({ name: req.query.category });
//             const products = await Product.find({ category: category._id });
//             res.json(products);
//         } else {
//             const products = await Product.find();
//             res.json(products);
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }



// router.get('/', findCategory);
router.get('/child', getChildCategories);
router.post('/addChild', addChildCategory);
router.get("/", getAllCategories);
router.post("/", addCategory);
router.delete('/', deleteCategory);
router.put('/', editCategory);

module.exports = router;
