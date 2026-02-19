export default async function AdminPanel() {

    return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-800">
        
        <header className="h-16 bg-gray-900 flex items-center justify-between px-8 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Resumen General</h2>
            <div className="flex items-center space-x-4">
                <time className="text-sm text-gray-400">Hoy: 16 Feb, 2024</time>
            </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Publicadas hoy</p>
                    <h3 className="text-3xl font-bold text-green-500 mt-1">32</h3>
                </div>
                <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Borradores</p>
                    <h3 className="text-3xl font-bold text-yellow-500 mt-1">12</h3>
                </div>
                <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">En revisión</p>
                    <h3 className="text-3xl font-bold text-blue-500 mt-1">5</h3>
                </div>
                <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Tickets</p>
                    <h3 className="text-3xl font-bold text-red-500 mt-1">8</h3>
                </div>
                <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-lg">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Vistas hoy</p>
                    <h3 className="text-3xl font-bold text-white mt-1">1,245</h3>
                </div>
            </div>

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
                                <tr className="hover:bg-gray-800/50 transition">
                                    <td className="px-6 py-4 font-medium text-sm">Nueva IA revoluciona el mercado...</td>
                                    <td className="px-6 py-4 text-green-400 font-bold text-sm">12,400</td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">15 Feb</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition">Editar</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-800/50 transition">
                                    <td className="px-6 py-4 font-medium text-sm">Crisis climática: Reporte 2024</td>
                                    <td className="px-6 py-4 text-green-400 font-bold text-sm">8,920</td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">14 Feb</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition">Editar</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-800/50 transition">
                                    <td className="px-6 py-4 font-medium text-sm">Bitcoin alcanza nuevo máximo...</td>
                                    <td className="px-6 py-4 text-green-400 font-bold text-sm">7,100</td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">Hoy</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition">Editar</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-800/50 transition">
                                    <td className="px-6 py-4 font-medium text-sm">Nuevos lanzamientos Apple TV</td>
                                    <td className="px-6 py-4 text-green-400 font-bold text-sm">5,450</td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">12 Feb</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition">Editar</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-800/50 transition">
                                    <td className="px-6 py-4 font-medium text-sm">Descubrimientos en Marte</td>
                                    <td className="px-6 py-4 text-green-400 font-bold text-sm">4,200</td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">10 Feb</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition">Editar</button>
                                    </td>
                                </tr>
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
                    <h4 className="font-bold text-lg">📈 Vistas últimos 7 días</h4>
                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">+12% vs semana pasada</span>
                </div>
                <div className="h-64">
                    <canvas id="viewsChart"></canvas>
                </div>
            </div>

        </section>
    </div>
    )
}    