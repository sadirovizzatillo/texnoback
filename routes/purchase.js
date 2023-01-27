const express = require("express");
const router = express.Router();
const { purchase } = require("../controller")



router.get("/all", purchase.getPurchases);
router.post("/", purchase.postPurchase);
router.get("/:id", purchase.userSinglePurchase);
router.delete("/:id", purchase.deletePurchase);

module.exports = router
