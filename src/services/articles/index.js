const ArticlesRouter = require("express").Router();
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { validateArticle, validateReview } = require("../../utils/validate");
const { Category, Author, Article, Review } = require("../../utils/db");

const convertArticleBody = (obj) => {
  const newArticle = { ...obj };
  newArticle.id = req.body._id;
  newArticle.author_id = req.body.author._id;
  newArticle.category_id = req.body.category._id;
  delete req.body._id, req.author, req.body.category;
  return newArticle;
};

ArticlesRouter.route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Article.findAll({
        include: [{ model: Author }, { model: Category }],
      });
      res.send(data);
    } catch (e) {
      next(e);
    }
  })
  .post(validateArticle, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      const newArticle = await Article.create(req.body);
      res.status(201).send(newArticle);
    } catch (e) {
      next(e);
    }
  });

ArticlesRouter.route("/:id")
  .get(async (req, res, next) => {
    try {
      const article = await Article.findByPk(req.params.id);
      res.send(article);
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
    } catch (error) {
      next(error);
    }
  })
  .put(validateArticle, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      const articleArr = await Article.update(req.body, {
        returning: true,
        plain: true,
        where: { id: req.params.id },
      });
      res.send(articleArr[1]);
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const request = await Article.destroy({ where: { id: req.params.id } });
      if (request === 0) next(err("ID not found", 404));
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  });

ArticlesRouter.get("/:articleId/reviews", async (req, res, next) => {
  try {
    //TODO pagination
    const { rows } = await Reviews.run(
      `SELECT * FROM reviews WHERE article_id = '${req.params.articleId}'`
    );
    res.send(rows);
  } catch (error) {
    next(error);
  }
});

ArticlesRouter.route("/:articleId/reviews/:reviewId")
  .get(async (req, res, next) => {
    try {
      const { rows } = await Reviews.findById(req.params.reviewId);
      res.send(rows[0]);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      //TODO fe not implemented yet
      const res = await Reviews.findByIdAndUpdate(req.params.reviewId, {
        text: req.body.text,
        author_id: req.body.authorId,
        article_id: req.params.articleId,
      });
      res.send(res);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { rows } = await Reviews.findByIdAndDelete(req.params.reviewId);
      res.send(rows);
    } catch (error) {
      next(error);
    }
  });

module.exports = ArticlesRouter;
