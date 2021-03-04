const errorHandler = (err, req, res, next) => {
  if(err){
    switch (err.name) {
      case "AddedDatabase":
        res.status(400).json({
          message: "Sorry. Database already exist."
        })
        break;
      case "CategoryNotFound":
        res.status(404).json({
          message: "Sorry. Category doesn't exist."
        })
        break;
      default:
        console.log(err)
        res.status(500).json({
          message: "Internal server error."
        })
        break;
    }
  }
}

module.exports = errorHandler