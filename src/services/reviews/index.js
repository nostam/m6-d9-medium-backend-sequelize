const ReviewsRouter = require("express").Router();
const { validationResult } = require("express-validator");
const Model = require("../../utils/model");
const Reviews = new Model("reviews");
const { err } = require("../../utils");
const { validateReview } = require("../../utils/validate");
ReviewsRouter.route("/")
  .get(async (req, res, next) => {
    try {
      const { rows } = await Reviews.find();
      res.send(rows);
    } catch (e) {
      next(e);
    }
  })
  .post(validateReview, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      // const request = {
      //   ...req.body,
      //   author_id: req.body.authorId,
      //   article_id: req.body.articleId,
      // };
      // delete request.articleId;
      // delete request.authorId;
      const response = await Reviews.save(req.body);
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  });

ReviewsRouter.route("/:id")
  .get(async (req, res, next) => {
    try {
      const { rows } = await Reviews.findById(req.params.id);
      res.send(rows);
    } catch (e) {
      next(e);
    }
  })
  .put(validateReview, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      const response = await Reviews.findByIdAndUpdate(req.params.id, req.body);
      res.send(response);
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { rows } = await Reviews.findByIdAndDelete(req.params.id);
      res.send(rows);
    } catch (e) {
      next(e);
    }
  });

module.exports = ReviewsRouter;
