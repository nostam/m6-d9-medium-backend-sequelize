const { body } = require("express-validator");
//no-sequelize
// const validateArticle = [
//   body("headline").notEmpty().isString(),
//   body("subhead").isString(),
//   body("content").notEmpty().isString(),
//   body("category.name").isString(),
//   body("category.img").isURL(),
//   body("author.name").isString(),
//   body("author.img").isURL(),
//   body("cover").isURL(),
// ];
//sequelize
const validateArticle = [
  body("headLine").notEmpty().isString(),
  body("content").notEmpty().isString(),
  body("categoryId").isInt(),
  body("authorId").isInt(),
  body("cover").isURL(),
];

const validateReview = [
  body("text").notEmpty().isString(),
  body("author_id").isInt(),
];

const validateCategory = [
  body("name").notEmpty().isString(),
  body("img").isURL(),
];

module.exports = { validateArticle, validateReview, validateCategory };
