const express = require("express");
const {addToWishList,getWishList,removeWishList} = require("../controllers/wishListController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addToWishList );
router.get("/", protect, getWishList );
router.delete("/:itemId", protect, removeWishList );
module.exports = router;