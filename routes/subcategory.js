const express = require("express")
const router = express.Router()
const { subcategory } = require("../controller")


router.get("/all", subcategory.all)
router.post("/", subcategory.create)


module.exports = router