const express = require("express")
const router = express.Router()
const { category } = require("../controller")


router.get("/all", category.all)
router.post("/", category.create)


module.exports = router