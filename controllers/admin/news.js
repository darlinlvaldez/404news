import repository from "../../models/admin/news"

const newsController = {};

newsController.newsTable = async function ({ limit, offset, search, status }) {
  try {
    const { rows, total } = await repository.getNewsTable(limit, offset, search, status);

    return { ok: true, news: rows, total };

  } catch (error) {
    console.error(error);
    return {ok: false,
      message: "Error al obtener la tabla de noticias"
    };
  }
}

newsController.create = async function ({ news, blocks }) {
  try {

    if (!news.title || !news.slug) {
      return {
        ok: false,
        message: "Título y slug son obligatorios"
      };
    }

    const newsId = await repository.createNews(news, blocks);

    return {
      ok: true,
      message: "Noticia creada correctamente",
      newsId
    };

  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al crear la noticia"
    };
  }
};

newsController.getFormData = async function () {
  try {
    const authors = await repository.getAuthors();
    const categories = await repository.getCategories();

    return {
      ok: true,
      authors,
      categories
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error cargando datos del formulario"
    };
  }
};

export default newsController;