const router = require("express").Router();

const articlesRouter = require("./articles");

// const authorsRouter = require("./authors");

// const reviewsRouter = require("./reviews");

router.use("/articles", articlesRouter);

// router.use("/authors", authorsRouter);

// router.use("/reviews", reviewsRouter);

module.exports = router;
