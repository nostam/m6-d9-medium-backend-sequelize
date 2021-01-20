const router = require("express").Router();
const { validationResult } = require("express-validator");
const Model = require("../../utils/model");
const Articles = new Model("articles");
const Reviews = new Model("reviews");
const db = require("../../utils/db");
const { validateArticle, validateReview } = require("../../utils/validate");

const convertArticleBody = (obj) => {
  const newArticle = { ...obj };
  newArticle.id = req.body._id;
  newArticle.author_id = req.body.author._id;
  newArticle.category_id = req.body.category._id;
  delete req.body._id, req.author, req.body.category;
  return newArticle;
};

const articleQuery = `SELECT a.id AS _id, a.headline AS "headLine", a.subhead AS "subHead", a.content AS content, a.cover AS cover, a.created_at AS "createdAt", a.updated_at AS "updatedAt", c.name AS "categoryName", c.img AS "categoryImg", c.id AS "categoryId", authors.name || ' ' || authors.surname AS author
  FROM articles AS a
  JOIN categories AS c ON c.id = a.category_id
  JOIN authors ON authors.id = a.author_id
  `;

const articlesQuery = `SELECT
a.id AS _id, a.headline AS "headLine", a.subhead AS "subHead", a.content AS content,
a.cover AS cover, a.created_at AS "createdAt", a.updated_at AS "updatedAt",
CONCAT('{',json_object_agg('_id', authors.id),', ',json_object_agg('name', CONCAT(' ',authors.name, authors.surname)),', ',json_object_agg('img', categories.img), '}') AS author,
CONCAT('{',json_object_agg('_id', categories.id),', ',json_object_agg('name', categories.name),', ',json_object_agg('img', categories.img), '}') AS category,
json_agg(row_to_json((SELECT ColName FROM (SELECT r.id, r.text, r.created_at) AS ColName (_id, TEXT, "createdAt")))) AS reviews
FROM articles AS a
INNER JOIN categories ON a.category_id = categories.id
INNER JOIN authors ON authors.id = a.author_id
INNER JOIN reviews AS r ON r.author_id = a.id
GROUP BY a.id`;

router.get("/", async (req, res, next) => {
  try {
    // const { rows } = await Articles.find();
    // rows.map((r) => {
    //   r._id = r.id;
    //   delete r.id;
    // });
    // const rrr = await db.query(
    //   "SELECT row_to_json(row) from (select categories.* ROW(categories.name::came) as came from categories )row;"
    // );

    // res.send(rrr);
    const { rows } = await db.query(articlesQuery);
    const response = { articles: rows };
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
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
});

router.get("/:articleId/reviews", async (req, res, next) => {
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

router.get("/:articleId/reviews/:reviewId", async (req, res, next) => {
  try {
    const { rows } = await Reviews.findById(req.params.reviewId);
    res.send(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateArticle, async (req, res, next) => {
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

router.post("/:id", validateReview, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(err(errors.array(), 404));
    const res = await Reviews.save(req.body);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateArticle, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(err(errors.array(), 404));
    const body = convertArticleBody(req.body);
    const response = await Articles.findByIdAndUpdate(req.params.id, body);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.put("/:articleId/reviews/:reviewId", async (req, res, next) => {
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
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await Articles.findByIdAndDelete(req.params.id);
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

router.delete("/:articleId/reviews/:reviewsId", async (req, res, next) => {
  try {
    const { rows } = await Reviews.findByIdAndDelete(req.params.reviewId);
    res.send(rows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
