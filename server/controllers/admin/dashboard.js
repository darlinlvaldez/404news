import dashboardModel from "@/server/models/admin/dashboard";

const dashboard = {};

dashboard.getStats = async () => {
  try {
    const [news, views, topNews, viewsChart, categoryChart] = await Promise.all(
      [
        dashboardModel.getNewsStats(),
        dashboardModel.getViewsStats(),
        dashboardModel.getTopNewsLast24Hours(),
        dashboardModel.getViewsChart(7),
        dashboardModel.getNewsByCategories(),
      ],
    );

    return { ...news, ...views, topNews, viewsChart, categoryChart };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default dashboard;