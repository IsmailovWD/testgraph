const { MockData } = require('../models/init-models')
class Base {
  all = async (req, res) => {
    const model = await MockData.findAll()
    res.send(model)
  }
}
module.exports = new Base()