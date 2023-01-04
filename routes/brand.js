const express = require("express")
const router = express.Router()
const { brand } = require("../controller")


router.get("/all", brand.all)
router.post("/", brand.create)
router.get("/:id", brand.getSingleBrand)


module.exports = router