const express  = require("express")
const  { review } = require("../controller")
const router = express.Router()


router.post("/", review.postReview)
router.get("/all", review.getAllReviews)


module.exports = router