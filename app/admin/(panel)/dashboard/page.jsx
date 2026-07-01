import CurrentDate from '../../../../components/CurrentDate';
import StatsCard from '../../../../components/admin/ui/StatsCard';
import ViewsChart from '../../../../components/admin/ViewsChart';
import dashboard from "../../../../server/controllers/admin/dashboard";
import Link from "next/link";

import { 
    CalendarCheck, 
    FileText, 
    Eye, 
    Folder,
    TrendingUp, 
    Clock,
    BarChart3,
    Globe,
    ArrowRight,
    Activity } from 'lucide-react';

export default async function AdminPanel() {

    const stats = await dashboard.getStats();

    return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-800">
        
        <header className="h-16 bg-gray-900 flex items-center justify-between px-8 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Resumen General</h2>
            <div className="flex items-center space-x-4">
                <time className="text-sm text-gray-400"><CurrentDate/></time>
            </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 space-y-8">
            
            <div>
                <h3 className="text-xl font-bold">Noticias</h3>
                <p className="text-sm text-gray-400">
                    Resumen general del contenido publicado.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatsCard
                    title="Total noticias"
                    value={stats.totalNews}
                    icon={FileText}
                    color="text-blue-400"
                />

                <StatsCard
                    title="Publicadas"
                    value={stats.published}
                    icon={CalendarCheck}
                    color="text-green-500"
                />

                <StatsCard
                    title="En espera"
                    value={stats.pending}
                    icon={Clock}
                    color="text-red-500"
                />

                <StatsCard
                    title="Borradores"
                    value={stats.drafts}
                    icon={FileText}
                    color="text-yellow-500"
                />

                <StatsCard
                    title="Publicadas hoy"
                    value={stats.today}
                    icon={CalendarCheck}
                    color="text-emerald-500"
                />

                <StatsCard
                    title="Este mes"
                    value={stats.month}
                    icon={CalendarCheck}
                    color="text-cyan-400"
                />

                <StatsCard
                    title="Categorías"
                    value={stats.categories}
                    icon={Folder}
                    color="text-purple-400"
                />
            </div>

            <div className=' border-b border-gray-700'></div>
            
            <div>
                <h3 className="text-xl font-bold">Estadísticas de vistas</h3>
                <p className="text-sm text-gray-400">
                    Métricas de tráfico y rendimiento de las noticias.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatsCard
                title="Total vistas"
                value={stats.totalViews}
                icon={Eye}
                color="text-white"
            />

            <StatsCard
                title="Hoy"
                value={stats.todayViews}
                icon={Eye}
                color="text-green-500"
            />

            <StatsCard
                title="Esta semana"
                value={stats.weekViews}
                icon={TrendingUp}
                color="text-blue-500"
            />

            <StatsCard
                title="Este mes"
                value={stats.monthViews}
                icon={BarChart3}
                color="text-cyan-500"
            />

            <StatsCard
                title="Países"
                value={stats.countries}
                icon={Globe}
                color="text-purple-500"
            />

            <StatsCard
                title="Promedio"
                value={stats.averageViews}
                icon={Activity}
                color="text-orange-500"
            />
            </div>

            <div className=' border-b border-gray-700'></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                    <div className="p-6 border-b border-gray-700 bg-gray-900/50">
                        <h4 className="font-bold text-lg">Noticias más vistas (Top 5)</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-3">Título</th>
                                    <th className="px-6 py-3">Vistas</th>
                                    <th className="px-6 py-3">Fecha</th>
                                    <th className="px-6 py-3 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {stats.topNews.length > 0 ? (
                                    stats.topNews.map((news) => (
                                        <tr key={news.id} className="hover:bg-gray-800/50 transition">
                                            <td className="px-6 py-4 font-medium text-sm">{news.title}</td>
                                            <td className="px-6 py-4 text-green-400 font-bold text-sm">{news.views}</td>
                                            <td className="px-6 py-4 text-gray-400 text-xs">
                                                {new Date(news.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/admin/news/edit/${news.id}`}
                                                    className="bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                            No hay noticias publicadas en las últimas 24 horas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-lg">
                    <h4 className="font-bold text-lg mb-4 border-b border-gray-800 pb-2">Actividad Reciente</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                            <div>
                                <p className="text-sm"><span className="font-bold text-green-400">Juan</span> creó una noticia</p>
                                <p className="text-[10px] text-gray-500">Hace 5 min</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 mt-2 bg-yellow-500 rounded-full"></div>
                            <div>
                                <p className="text-sm"><span className="font-bold text-green-400">Ana</span> envió un ticket</p>
                                <p className="text-[10px] text-gray-500">Hace 22 min</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                            <div>
                                <p className="text-sm">Noticia <span className="italic text-gray-400">"IA en Salud"</span> publicada</p>
                                <p className="text-[10px] text-gray-500">Hace 1 hora</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 mt-2 bg-red-500 rounded-full"></div>
                            <div>
                                <p className="text-sm">Ticket <span className="italic text-gray-400">#4521</span> fue aprobado</p>
                                <p className="text-[10px] text-gray-500">Hace 3 horas</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></div>
                            <div>
                                <p className="text-sm"><span className="font-bold text-green-400">Carlos</span> actualizó su perfil</p>
                                <p className="text-[10px] text-gray-500">Ayer</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-lg">
                        Vistas últimos 7 días
                    </h4>

                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">
                        +12% vs semana pasada
                    </span>
                </div>

                <div className="h-64">
                        <ViewsChart data={stats.chart}/>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                <Link href="/admin/analytics"
                    className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 transition px-4 py-2 rounded-lg text-sm font-medium"
                >
                    Ver analíticas
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    </div>
    )
}    