const Article = require("../models/article");

// Devuelve todos los artículos guardados por el usuario
module.exports.getArticles = (req, res, next) => {
  const userId = req.user._id;

  Article.find({ owner: userId })
    .then((articles) => res.send(articles))
    .catch(next);
};

// Crea un artículo
module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const userId = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: userId,
  })
    .then((article) => res.send(article))
    .catch(next);
};

// Borra un artículo por su _id
module.exports.deleteArticle = (req, res, next) => {
  const userId = req.user._id;
  const { articleId } = req.params;

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        return res.status(404).send({ message: "Artículo no encontrado" });
      }
      // Verifica si el usuario es el propietario del artículo
      if (article.owner.toString() !== userId) {
        return res
          .status(403)
          .send({ message: "No autorizado para eliminar este artículo" });
      }
      return article
        .remove()
        .then(() => res.send({ message: "Artículo eliminado" }));
    })
    .catch(next);
};
