const errorHandler = (err, req, res, next) => {
  if(err){
    switch (err.name) {
      case "AddedDatabase":
        res.status(400).json({
          message: "Sorry. Database already exist"
        })
        break;
      default:
        console.log(err)
        res.status(500).json({
          message: "Internal server error"
        })
        break;
    }
  }
}

module.exports = errorHandler