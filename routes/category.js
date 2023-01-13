const express = require("express")
const router = express.Router()
const { category } = require("../controller")


router.get("/all", category.all)
router.get("/products/:id", category.categoryProducts)
router.get("/subcategories/:id", category.getRelatedSubCategories)
router.post("/", category.create)


module.exports = router