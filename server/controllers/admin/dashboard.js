import dashboardModel from "@/server/models/admin/dashboard";

const dashboard = {};

dashboard.getStats = async () => {
    try{
        const [news, views, topNews, chart] = await Promise.all([
        dashboardModel.getNewsStats(),
        dashboardModel.getViewsStats(),
        dashboardModel.getTopNewsLast24Hours(),
        dashboardModel.getViewsChart(7)
    ]);

    return {...news, ...views, topNews, chart};
    
    } catch(error) {
        console.error("Error getting data:", error);
        throw new Error("Error fetching data");
    }
};

export default dashboard;