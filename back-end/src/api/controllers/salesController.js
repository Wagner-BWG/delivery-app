const salesService = require('../services/salesService');

const newSale = async (req, res) => {
  const saleInfo = req.body;

  const response = await salesService.createSale(saleInfo);

  return res.status(response.status).json(response.json);
};

const findSale = async (req, res) => {
  const { id } = req.params;

  const response = await salesService.findSaleById(id);

  return res.status(response.status).json(response.json);
};

const findAllSales = async (_req, res) => {
  const response = await salesService.getAllSales();

  return res.status(response.status).json(response.json);
};

const findSalesByUser = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSalesByUser(id);

  return res.status(response.status).json(response.json);
};

module.exports = { newSale, findSale, findAllSales, findSalesByUser };
