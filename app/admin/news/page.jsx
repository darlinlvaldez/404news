export default function NewsTable () {

    return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-800">
        
        <header className="h-16 bg-gray-900 flex items-center justify-between px-8 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Gestión de Noticias</h2>
            <div className="flex items-center space-x-4">
                <a href="create_news.html" className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Noticia
                </a>
            </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 space-y-6">
            
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex flex-wrap gap-4 items-center justify-between shadow-lg">
                <div className="relative w-full md:w-96">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" stroke-lidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input type="text" placeholder="Buscar por título o autor..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-green-600 transition text-gray-100"/>
                </div>
                
                <div className="flex items-center space-x-3">
                    <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-green-600">
                        <option value="">Todos los estados</option>
                        <option value="draft">Borrador</option>
                        <option value="review">En revisión</option>
                        <option value="published">Publicado</option>
                    </select>
                </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Título</th>
                                <th className="px-6 py-4">Autor</th>
                                <th className="px-6 py-4">Categoría</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Vistas</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4 text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            <tr className="hover:bg-gray-800/30 transition">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-gray-100 truncate w-64">Avances tecnológicos en energía solar 2024</p>
                                    <p className="text-[10px] text-gray-500">ID: #96</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">Juan Pérez</td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-[10px]">Tecnología</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-green-500/10 text-green-500 border border-green-500/20">Published</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-mono">1,402</td>
                                <td className="px-6 py-4 text-xs text-gray-400">18 Feb, 2024</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="edit_news.html?id=96" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Editar
                                    </a>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-800/30 transition">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-gray-100 truncate w-64">Entrevista exclusiva: CEO de Innovate</p>
                                    <p className="text-[10px] text-gray-500">ID: #95</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">Ana García</td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-[10px]">Negocios</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Review</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-mono">245</td>
                                <td className="px-6 py-4 text-xs text-gray-400">17 Feb, 2024</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="edit_news.html?id=95" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Editar
                                    </a>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-800/30 transition">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-gray-100 truncate w-64">Lanzamiento de la nueva red 6G</p>
                                    <p className="text-[10px] text-gray-500">ID: #94</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">Marcos Ruiz</td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-[10px]">Ciencia</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-500/10 text-gray-400 border border-gray-500/20">Draft</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-mono">0</td>
                                <td className="px-6 py-4 text-xs text-gray-400">16 Feb, 2024</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="edit_news.html?id=94" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Editar
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-gray-900/50 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Mostrando 3 de 97 noticias</span>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-xs hover:bg-gray-700 disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-xs hover:bg-gray-700">Siguiente</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
} 


    