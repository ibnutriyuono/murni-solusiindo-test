const { 
  Product, 
  ProductContent,
  Pivot,
  Price,
  Preview,
  Addon,
  Stock 
} = require('../models')

class ProductController {
  static getProducts = async (req, res, next) => {
    const results = await Product.findAll({
      include: {
        model: ProductContent,
        include: [
          Pivot, 
          Price,
          Preview,
          Addon,
          Stock
        ]
      }
    })
    console.log(results)
    res.status(200).json({
      products: results
    })
  }
}

module.exports = ProductController