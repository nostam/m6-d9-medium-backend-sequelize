const ArticlesRouter = require("express").Router();
const { validationResult } = require("express-validator");
const db = require("../../utils/db");
const { Op } = require("sequelize");
const { validateArticle, validateReview } = require("../../utils/validate");
const { Category } = require("../../utils/db");

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
      const data = await db.Article.findAll({
        include: { model: Category, where: articles.categoryId },
      });
      // const { rows } = await db.query(articlesQuery);
      // const response = { articles: rows };
      res.send(data);
    } catch (e) {
      next(e);
    }
  })
  .post(validateArticle, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      const request = convertArticleBody(req.body);
      const response = await Articles.save(request);
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  });

ArticlesRouter.route("/:id")
  .get(async (req, res, next) => {
    try {
      // const { rows } = await Articles.findById(req.params.id);
      // const { rows } = await db.query(
      //   `${articleQuery} WHERE a.id=${req.params.id}`
      // );
      const { rows } = await db.query(
        `${articleQuery} WHERE a.id=${req.params.id}`
      );
      rows["category"] = {
        _id: rows.categoryId,
        name: rows.categoryName,
        img: rows.categoryImg,
      };
      const reviews = await db.query(`
    SELECT authors.name AS name, text FROM reviews
    INNER JOIN articles ON reviews.article_id = articles.id
    INNER JOIN authors ON reviews.author_id = authors.id
    WHERE articles.id=${req.params.id}
    `);
      let response = {
        ...rows[0],
        reviews: reviews.rows,
        // category: category.rows[0],
      };
      console.log(response);
      // response._id = response.id;
      // delete response.id;
      res.send(response);
    } catch (e) {
      next(e);
    }
  })
  .post(validateReview, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      const res = await Reviews.save(req.body);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  })
  .put(validateArticle, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(err(errors.array(), 404));
      const body = convertArticleBody(req.body);
      const response = await Articles.findByIdAndUpdate(req.params.id, body);
      res.send(response);
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { rows } = await Articles.findByIdAndDelete(req.params.id);
      res.send(rows);
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
