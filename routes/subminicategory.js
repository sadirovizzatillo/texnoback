const express = require("express")
const router = express.Router()
const { subminicategory } = require("../controller")


router.get("/all", subminicategory.all)
router.post("/", subminicategory.create)


module.exports = router