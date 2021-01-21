const AuthorsRouter = require("express").Router();
const { Author } = require("../../utils/db");

AuthorsRouter.route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Author.findAll();
      res.send(data);
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newAuthor = await Author.create(req.body);
      res.status(201).send(newAuthor);
    } catch (e) {
      next(e);
    }
  });

AuthorsRouter.route("/:id")
  .get(async (req, res, next) => {
    try {
      const author = await Authors.findByPk(req.params.id);
      res.send(author);
    } catch (e) {
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const authorArr = await Authors.update(req.body, {
        returning: true,
        plain: true,
        where: { id: req.params.id },
      });
      res.send(authorArr[1]);
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const request = await Authors.destory({ where: { id: req.params.id } });
      if (request === 0) next(err("ID not found", 404));
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  });

module.exports = AuthorsRouter;
