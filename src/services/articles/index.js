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
    const reviews = await Reviews.find();
    res.send(reviews);
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

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Articles.findByIdAndUpdate(req.params.id, req.body);
    res.send(response);
  } catch (e) {
    next(e);
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

module.exports = router;
