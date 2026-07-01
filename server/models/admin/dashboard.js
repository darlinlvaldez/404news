import db from "@/server/lib/db";

const dashboard = {};

dashboard.getNewsStats = async () => {
  const [rows] = await db.query(`
    SELECT
        COUNT(*) AS totalNews,

        SUM(status = 'published') AS published,

        SUM(status = 'draft') AS drafts,

        SUM(status = 'pending') AS pending,

        SUM(
            status = 'published'
            AND DATE(created_at) = CURDATE()
        ) AS today,

        SUM(
            status = 'published'
            AND YEAR(created_at) = YEAR(CURDATE())
            AND MONTH(created_at) = MONTH(CURDATE())
        ) AS month,

        (
            SELECT COUNT(*)
            FROM categories
            WHERE active = 1
        ) AS categories

    FROM news;
    `);

  return rows[0];
};

dashboard.getViewsStats = async () => {
  const [rows] = await db.query(`
    SELECT
        COALESCE(SUM(views), 0) AS totalViews,

        COALESCE(SUM(
            CASE
                WHEN DATE(created_at) = CURDATE()
                THEN views
                ELSE 0
            END
        ), 0) AS todayViews,

        COALESCE(SUM(
            CASE
                WHEN YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)
                THEN views
                ELSE 0
            END
        ), 0) AS weekViews,

        COALESCE(SUM(
            CASE
                WHEN YEAR(created_at) = YEAR(CURDATE())
                    AND MONTH(created_at) = MONTH(CURDATE())
                THEN views
                ELSE 0
            END
        ), 0) AS monthViews,

        COUNT(DISTINCT country_code) AS countries,

        COALESCE(
            ROUND(
                SUM(views) / NULLIF(COUNT(DISTINCT news_id), 0)
            ), 0
        ) AS averageViews

    FROM country_stats
    `);

  return rows[0];
};

dashboard.getNewsByCategories = async () => {
  const [rows] = await db.query(` 
    SELECT c.id, c.name, COUNT(n.id) AS news_count
    FROM categories c
    LEFT JOIN news n ON c.id = n.category_id
    GROUP BY c.id, c.name
    ORDER BY news_count DESC
    `);

  return rows;
};

dashboard.getTopNewsLast24Hours = async () => {
  const [rows] = await db.query(`
    SELECT
    id,
    title,
    slug,
    views,
    created_at
    FROM news
    WHERE created_at >= NOW() - INTERVAL 1 DAY
    ORDER BY views DESC
    LIMIT 5
    `);

  return rows;
};

dashboard.getViewsChart = async (days = 7) => {
  const [rows] = await db.query(
    `
    SELECT
    DATE(created_at) AS date,
    SUM(views) AS views
    FROM country_stats
    WHERE created_at >= CURDATE() - INTERVAL ? DAY
    GROUP BY DATE(created_at)
    ORDER BY date
    `,
    [days],
  );

  return rows;
};

export default dashboard;
