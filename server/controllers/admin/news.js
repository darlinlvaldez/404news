import news from "../../models/admin/news";

const newsController = {};

newsController.newsTable = async function ({ limit, offset, search, status }) {
  const { rows, total } = await news.getNewsTable(
    limit,
    offset,
    search,
    status,
  );

  return { ok: true, news: rows, total };
};

newsController.create = async function ({ news, blocks }) {
  if (!news.title || !news.slug) {
    return {
      ok: false,
      message: "Título y slug son obligatorios",
    };
  }

  const newsId = await news.createNews(news, blocks);

  return {
    ok: true,
    message: "Noticia creada correctamente",
    newsId,
  };
};

newsController.update = async function ({ slug, news, blocks }) {
  if (!slug) {
    return {
      ok: false,
      message: "Slug requerido",
    };
  }

  if (!news.title || !news.slug) {
    return {
      ok: false,
      message: "Título y slug son obligatorios",
    };
  }

  await news.updateNews(slug, news, blocks);

  return {
    ok: true,
    message: "Noticia actualizada correctamente",
  };
};

newsController.getBySlug = async function (slug) {
  if (!slug) {
    return {
      ok: false,
      message: "ID inválido",
    };
  }

  const data = await news.getNewsBySlug(slug);

  if (!data.news) {
    return {
      ok: false,
      message: "Noticia no encontrada",
    };
  }

  return {
    ok: true,
    news: data.news,
    blocks: data.blocks,
  };
};

newsController.delete = async function (slug) {
  if (!slug) {
    return {
      ok: false,
      message: "ID requerido",
    };
  }

  await news.deleteNews(slug);

  return {
    ok: true,
    message: "Noticia eliminada correctamente",
  };
};

newsController.getFormData = async function () {
  const authors = await news.getAuthors();
  const categories = await news.getCategories();

  return {
    ok: true,
    authors,
    categories,
  };
};

export default newsController;
