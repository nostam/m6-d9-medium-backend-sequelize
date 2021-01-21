const ReviewsRouter = require("express").Router();
const { validationResult } = require("express-validator");
const { Review, Author } = require("../../utils/db");
const { err } = require("../../utils");
const { validateReview } = require("../../utils/validate");
ReviewsRouter.route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Article.findAll({
        include: Author,
      });
      res.send(data);
    } catch (e) {
      next(e);
    }
  })
  .post(validateReview, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      const newReview = await Review.create(req.body);
      res.status(201).send();
    } catch (e) {
      next(e);
    }
  });
// duplicated with /articles route's
// ReviewsRouter.route("/:id")
//   .get(async (req, res, next) => {
//     try {
//       const { rows } = await Reviews.findById(req.params.id);
//       res.send(rows);
//     } catch (e) {
//       next(e);
//     }
//   })
//   .put(validateReview, async (req, res, next) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) return next(err(errors.array(), 404));
//       const response = await Reviews.findByIdAndUpdate(req.params.id, req.body);
//       res.send(response);
//     } catch (e) {
//       next(e);
//     }
//   })
//   .delete(async (req, res, next) => {
//     try {
//       const { rows } = await Reviews.findByIdAndDelete(req.params.id);
//       res.send(rows);
//     } catch (e) {
//       next(e);
//     }
//   });

module.exports = ReviewsRouter;
