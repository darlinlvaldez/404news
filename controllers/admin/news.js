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

export default newsController;