const axios = require('axios')
const { 
  Product, 
  ProductContent, 
  Pivot, 
  Price, 
  Preview, 
  Addon, 
  Stock 
} = require('../models/index')

class AddDatabaseController {
  static async addDatabase (req, res, next) {
    try {
      const { data } = await axios.get("https://portal.panelo.co/paneloresto/api/productlist/18")
      const { products } = data
      for (let i in products) {
        const productData = await Product.findOne({
          where: {
            name: products[i].name
          }
        })
        if (productData) {
          throw productData
        } else {
          await Product.create({
            name: products[i].name,
            user_id: products[i].user_id
          })
          products[i].products.forEach( async (product) => {
            console.log(product, '<<<<')
            const results = await ProductContent.create({
              title: product.title,
              slug: product.slug,
              lang: product.lang,
              auth_id: product.auth_id,
              status: product.status,
              type: product.type,
              count: product.count
            })
            if (results) {
              await ProductContent.update({
                ProductId: product.pivot.category_id - 20,
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
            }
            await Pivot.create({
              category_id: product.pivot.category_id,
              term_id: product.pivot.term_id
            })
            await Price.create({
              term_id: product.price.term_id,
              price: product.price.price
            })
            await Preview.create({
              term_id: product.preview.term_id,
              type: product.preview.type,
              content: product.preview.content
            })
            await Addon.create({})
            await Stock.create({
              term_id: product.stock.term_id,
              stock: product.stock.stock
            })
          })
          res.status(201).json({
            message: 'Success. Database has been added successfully.'
          })
        }
      }
    } catch (error) {
      next({
        name: "AddedDatabase"
      })
    }
  }
}

module.exports = AddDatabaseController