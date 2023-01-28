const express  = require("express")
const  { auth } = require("../controller")
const router = express.Router()


router.get("/users", auth.users);
router.post("/register", auth.register);
router.get("/:id", auth.me);
router.post("/login", auth.login);
router.put("/updateUser/:id", auth.updateUser)
router.delete("/deleteUser/:id", auth.deleteUser)
router.get("/users/statistic", auth.getAdminStatiksUser)
router.get("/users/chart", auth.getAdminStatiksChartUser)


module.exports = router 