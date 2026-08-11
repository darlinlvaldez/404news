import newsModel from "@/server/models/admin/news";
import { sendNewsNotification } from "@/server/services/admin/n8n/notification";
import { generateAiMetadata } from "@/server/services/admin/n8n/generateMetadata";
import { existsByNews } from "@/server/services/existsByNews";
import {getAuthors, getCategories} from "@/server/services/catalog";

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

newsController.create = async function ({ news, blocks }) {
  const exists = await existsByNews(news.title, news.slug);

  if (exists) {
    return { 
      ok: false, 
      message: "Ya existe una noticia con ese título o slug" 
    };
  }

  const newsId = await newsModel.createNews(news, blocks);

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

newsController.update = async function ({ id, news, blocks }) {
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

  await newsModel.updateNews(id, news, blocks);

  return {
    ok: true,
    message: "Noticia actualizada correctamente",
  };
};

newsController.getById = async function (id) {
  if (!id) {
    return {
      ok: false,
      message: "ID inválido",
    };
  }

  const data = await newsModel.getNewsById(id);

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

newsController.delete = async function (id) {
  if (!id) {
    return {
      ok: false,
      message: "ID requerido",
    };
  }

  await newsModel.deleteNews(id);

  return {
    ok: true,
    message: "Noticia eliminada correctamente",
  };
};

newsController.getFormData = async function () {
  const authors = await getAuthors();
  const categories = await getCategories();

  return {
    ok: true,
    authors,
    categories,
  };
};

export default newsController;
