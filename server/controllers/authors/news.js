import { sendNewsNotification } from "@/server/services/admin/n8n/notification";
import { generateAiMetadata } from "@/server/services/admin/n8n/generateMetadata";
import { existsByNews } from "@/server/services/existsByNews";
import { getCategories } from "@/server/services/catalog";
import newsModel from "@/server/models/authors/news";

const newsController = {};

newsController.authorNews = async function ({ userId, limit, offset, search, status }) {
  const { rows, total } = await newsModel.getAuthorNews(
    userId,
    limit,
    offset,
    search,
    status,
  );

  return { ok: true, news: rows, total };
};

newsController.create = async function ({ user, news, blocks }) {
  const exists = await existsByNews(news.title, news.slug);

  if (exists) {
    return { 
      ok: false, 
      message: "Ya existe una noticia con ese título o slug" 
    };
  }

  const newsId = await newsModel.createNewsByAuthor(user.id, news, blocks);

  await sendNewsNotification(newsId, news);

  return { 
    ok: true, 
    message: "Noticia creada correctamente", 
    newsId 
  };
};

newsController.generateAiMetadata = async function ({ news, blocks }) {
  const hasContent = blocks?.some((b) => b.content?.trim());

  if (!hasContent) {
    return {
      ok: false,
      message: "No hay contenido para generar metadatos",
    };
  }

  const metadata = await generateAiMetadata({ news, blocks });

  return {
    ok: true,
    ...metadata,
  };
};

newsController.update = async function ({ userId, id, news, blocks }) {
  if (!id) {
    return {
      ok: false,
      message: "id requerido",
    };
  }

  if (!news.title || !news.slug) {
    return {
      ok: false,
      message: "Título y slug son obligatorios",
    };
  }

  await newsModel.updateNewsAuthor(userId, id, news, blocks);

  return {
    ok: true,
    message: "Noticia actualizada correctamente",
  };
};

newsController.getById = async function (userId, id) {
  if (!id) {
    return {
      ok: false,
      message: "ID inválido",
    };
  }

  const data = await newsModel.getNewsById(userId, id);

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

newsController.delete = async function (userId, id) {
  if (!id) {
    return {
      ok: false,
      message: "ID requerido",
    };
  }

  await newsModel.deleteNews(userId, id);

  return {
    ok: true,
    message: "Noticia eliminada correctamente",
  };
};

newsController.getFormData = async function () {
  const categories = await getCategories();

  return {
    ok: true,
    categories,
  };
};

export default newsController;
