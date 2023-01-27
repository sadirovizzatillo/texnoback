const express = require("express")
const admin = require("../middlewares/admin")
const auth = require("../middlewares/auth")
const router = express.Router()
const  { product } = require("../controller")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

// const fileFilter = (req, file, sb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null, true);
//     }else{
//         cb(null, false);
//     }
// }
const upload = multer({ storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    // fileFilter: fileFilter
})
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