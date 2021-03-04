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
  static async getProducts (req, res, next) {
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

  static async getProductByCategory  (req, res, next) {
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

  static async getProductsXML  (req, res, next) {
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

  static async addProduct  (req, res, next) {
    const { 
      title, 
      slug,
      lang,
      status,
      type,
      count,
      auth_id,
      CategoryId,
      price,
      content,
      stock
    } = req.body
    try {
      const results = await ProductContent.create({
        title,
        slug,
        lang,
        status,
        type,
        count,
        auth_id,
        ProductId: CategoryId,
      })
      if (results) {
        await ProductContent.update({
          PivotId: results.id,
          PriceId: results.id,
          PreviewId: results.id,
          AddonId: results.id,
          StockId: results.id
        }, {
          where: {
            id: results.id
          }
        })
        await Price.create({
          term_id: results.id,
          price
        })
        await Stock.create({
          term_id: results.id,
          stock
        })
        await Preview.create({
          term_id: results.id,
          type: 'preview',
          content
        })
        await Pivot.create({
          category_id: CategoryId,
          term_id: results.id
        })
        await Addon.create()
        res.status(200).json({
          message: 'Product has been added successfully'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async editProductById (req, res, next) {
    const { 
      title, 
      slug,
      lang,
      status,
      type,
      count,
      auth_id,
      CategoryId,
      price,
      content,
      stock
    } = req.body
    const { id } = req.params

    try {
      const results = await ProductContent.update({
        title,
        slug,
        lang,
        status,
        type,
        count,
        auth_id,
        ProductId: CategoryId,
      }, {
        where: {
          id
        },
        returning: true
      })
      if(results[0] === 1){
        await ProductContent.update({
          PivotId: results[1][0].id,
          PriceId: results[1][0].id,
          PreviewId: results[1][0].id,
          AddonId: results[1][0].id,
          StockId: results[1][0].id
        }, {
          where: {
            id: results[1][0].id
          }
        })
        await Price.update({
          term_id: results[1][0].id,
          price
        }, {
          where: {
            id: results[1][0].id
          }
        })
        await Stock.update({
          term_id: results[1][0].id,
          stock
        }, {
          where: {
            id: results[1][0].id
          }
        })
        await Preview.update({
          term_id: results[1][0].id,
          type: 'preview',
          content
        }, {
          where: {
            id: results[1][0].id
          }
        })
        await Pivot.update({
          category_id: CategoryId,
          term_id: results[1][0].id
        },{
          where: {
            id: results[1][0].id
          }
        })
        await Addon.update({}, {
          where: {
            id: results[1][0].id
          }
        })
        res.status(200).json({
          message: 'Success your product has been saved.'
        })
      }else{
        next({
          name: 'NoData'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteProductById (req, res, next) {
    try {
      const { id } = req.params
      const results = await ProductContent.destroy({
        where: { 
          id
        }
      })
      if(results){
        await Price.destroy({
          where: {
            id
          }
        })
        await Stock.destroy({
          where: {
            id
          }
        })
        await Preview.destroy({
          where: {
            id
          }
        })
        await Pivot.destroy({
          where: {
            id
          }
        })
        await Addon.destroy({
          where: {
            id
          }
        }) 
        res.status(200).json({
          message: 'Product has been deleted successfully'
        })
      } else {
        next({
          name: 'NoData'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController