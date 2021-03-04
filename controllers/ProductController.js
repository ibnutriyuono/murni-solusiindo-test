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
    try {
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
      res.status(200).json({
        products: results
      })
    } catch (error) {
      next(error)
    }
  }
  static getProductByCategory = async (req, res, next) => {
    try {
      const { id } = req.params
      const results = await Product.findByPk(id, {
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
      if (results) {
        res.status(200).json(results)
      } else {
        next({
          name: 'CategoryNotFound'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController