const WishListItem = require("../models/wishListItem");
const Product = require("../models/Product");

const addToWishList = async (req, res) => {
    try {
        const { productId }=req.body;
        const product = await Product.findById(productId);
        
        if(!product){
            res.status(404).json({
                message: "product not found",
            });
        }
        const exists=await WishListItem.findOne({
            userId:req.user.id,
            productId,
        });
        if(exists){
        return res.status(400).json({
            message: "product already exists in wishlist",
        });
    }

     const wishListItem = await WishListItem.create({
        userId:req.user.id,
        productId,
     });

      res.status(201).json({
        message: "product added to wishlist",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
};
 

const  removeWishList = async (req, res) => {
    try {
      const {itemId} =req.params;
      
       await WishListItem. findByIdAndDelete(itemId);
      
       res.status(200).json({
        message: "item removed from wishlist ",
      });
    } catch(error){
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
};


  const getWishList = async (req, res) => {
    try {
        const wishListItem = await WishListItem.find({
            userId:req.user.id,
        }).populate("productId");
    
      res.status(200).json({
        message: "wishlist fetched",
        wishList:wishListItem,
      });
    } catch(error){
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }

};
  module.exports = { addToWishList,getWishList,removeWishList };