const CategoriesRouter = require("express").Router();
const { validationResult } = require("express-validator");
const Model = require("../../utils/model");
const Categories = new Model("categories");
const { validateCategory } = require("../../utils/validate");
//TODO many2many for categories and articles

CategoriesRouter.route("/")
  .get(async (req, res, next) => {
    try {
      const { rows } = await Categories.find();
      res.send(rows);
    } catch (e) {
      next(e);
    }
  })
  .post(validateCategory, async (req, res, next) => {
    try {
      const response = await Categories.save(req.body);
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  });

CategoriesRouter.route("/:id")
  .get(async (req, res, next) => {
    try {
      const { rows } = await Categories.findById(req.params.id);
      res.send(rows);
    } catch (e) {
      next(e);
    }
  })
  .put(validateCategory, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      const response = await Categories.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.send(response);
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { rows } = await Authors.findByIdAndDelete(req.params.id);
      res.send(rows);
    } catch (e) {
      next(e);
    }
  });

module.exports = CategoriesRouter;
