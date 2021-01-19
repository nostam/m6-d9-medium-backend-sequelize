const router = require("express").Router();
const Model = require("../../utils/model");
const Articles = new Model("articles");
const Reviews = new Model("reviews");
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await Articles.find();
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await Articles.findById(req.params.id);
    res.send(rows);
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
    res.send(rows);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await Articles.save(req.body);
    res.status(201).send(response);
  } catch (e) {
    next(e);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const res = await Reviews.save(req.body);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Articles.findByIdAndUpdate(req.params.id, req.body);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.put("/:articleId/reviews/:reviewId", async (req, res, next) => {
  try {
    const res = await Reviews.findByIdAndUpdate(req.params.reviewId, {
      ...req.body,
      article_id: req.params.articleId, //TODO author id can still be hijacked
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
