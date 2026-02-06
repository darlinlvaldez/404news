export const metadata = {
  title: "Contact - 404 News",
  icons: {
    icon: "/image/news-logo.png",
  },
};

export default function Contact() {
  return (
    <>
    <div className="flex-1 flex items-center justify-center p-6 py-12 lg:py-24 font-sans min-h-screen flex-col bg-gray-50">
        <div className="w-full max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-sm">
            
            <div className="flex-[1.5] p-8 lg:p-12">
                <h2 className="text-3xl font-normal text-gray-800 mb-8">Escríbenos</h2>
                
                <form action="#" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <input type="text" placeholder="Nombre" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-blue-500 transition-colors text-gray-600 placeholder-gray-400"/>
                        </div>
                        <div className="relative">
                            <input type="email" placeholder="Email" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-blue-500 transition-colors text-gray-600 placeholder-gray-400"/>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <input type="text" placeholder="Asunto" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-blue-500 transition-colors text-gray-600 placeholder-gray-400"/>
                    </div>
                    
                    <div className="relative">
                        <textarea placeholder="Mensaje" rows="5" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-blue-500 transition-colors text-gray-600 placeholder-gray-400 resize-none"></textarea>
                    </div>
                    
                    <div className="pt-4">
                        <button type="submit" className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-md shadow-lg transition-all text-sm font-medium uppercase tracking-wider">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex-1 bg-green-800 p-8 lg:p-12 text-white flex flex-col justify-center">
                <h3 className="text-3xl font-normal mb-10">Contactanos</h3>
                
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-400/30 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">Dirección:</p>
                            <p className="text-blue-50 font-light">La Vega, Rep. Dom., 41000</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-green-400/30 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">Teléfono:</p>
                            <p className="text-blue-50 font-light">+1 829-552-4400</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-green-400/30 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 0a2 2 0 012-2h14a2 2 0 012 2m-18 0v8a2 2 0 002 2h14a2 2 0 002-2V8" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">Email:</p>
                            <p className="text-blue-50 font-light">404news@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-green-400/30 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">Servicios:</p>
                            <p className="text-blue-50 font-light">Generalmente respondemos dentro de las 24 horas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}