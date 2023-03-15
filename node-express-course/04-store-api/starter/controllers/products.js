const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "a";
  const products = await Product.find({}).sort("-name price");
  res.status(200).json({ products, hits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEX = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEX,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "raiting"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  // console.log(queryObject);
  let productsResult = Product.find(queryObject);
  //  sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    productsResult = productsResult.sort(sortList);
  } else {
    productsResult = productsResult.sort("createdAT");
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    productsResult = productsResult.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await productsResult;
  res.status(200).json({ products, hits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
