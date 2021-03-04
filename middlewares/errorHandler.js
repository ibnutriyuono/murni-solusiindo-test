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
      case "NoData":
        res.status(404).json({
          message: "Sorry. Data doesn't exist."
        })
        break;
      case "CorruptFile":
        res.status(404).json({
          message: "Some error occured - file either not saved or corrupted file saved."
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