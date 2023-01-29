const express = require("express")
const admin = require("../middlewares/admin")
const auth = require("../middlewares/auth")
const router = express.Router()
const  { product } = require("../controller")
const upload = require("../utils/multer")

router.get("/bestseller", product.getBestSellers)
router.get("/main/category", product.mainRelatedProduct)
router.get("/statistics", product.getAdminStatiksProducts)
router.get("/adviceproducts/:id", product.getAdviceProducts) 
router.delete("/", product.deleteProducts)
router.post("/", upload.single("file"), auth, admin, product.postProduct)
router.delete("/:id", product.deleteProduct)
router.get("/search", product.getSearchedProducts)
router.put("/:id", product.updateProduct) 
router.get("/all", product.getAllProduct)
router.get("/:id",  product.getSingleProduct)
router.get("/all/admin", product.getAdminProducts)



module.exports = router