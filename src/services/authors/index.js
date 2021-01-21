const AuthorsRouter = require("express").Router();
const Model = require("../../utils/model");
const Authors = new Model("authors");

AuthorsRouter.route("/")
  .get(async (req, res, next) => {
    try {
      const { rows } = await Authors.find();
      res.send(rows);
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const response = await Authors.save(req.body);
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  });

AuthorsRouter.route("/:id")
  .get(async (req, res, next) => {
    try {
      const { rows } = await Authors.findById(req.params.id);
      res.send(rows);
    } catch (e) {
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const response = await Authors.findByIdAndUpdate(req.params.id, req.body);
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

module.exports = AuthorsRouter;
