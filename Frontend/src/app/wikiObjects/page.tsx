"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import StarsBg from "@/components/stars_bg";

export default function WikiProject() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState<WikiItem | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const wikiItems = [
        {
            id: 1,
            title: "Milky Way Galaxy",
            img: "https://solarsystem.nasa.gov/internal_resources/125",
            desc: "The Milky Way is the galaxy that contains our solar system, with billions of stars, planets, and nebulae.",
            category: "Astronomy",
            lastEdited: "2025-05-10",
            content: "The Milky Way is a barred spiral galaxy with a diameter between 170,000 and 200,000 light-years. It contains over 100 billion stars and is part of the Local Group of galaxies."
        },
        {
            id: 2,
            title: "Black Holes",
            img: "https://solarsystem.nasa.gov/internal_resources/3622",
            desc: "Regions of spacetime with gravitational forces so strong that nothing, not even light, can escape.",
            category: "Cosmology",
            lastEdited: "2025-05-09",
            content: "Black holes are the densest objects in the universe, formed when massive stars collapse. They have an event horizon beyond which nothing can escape."
        },
        {
            id: 3,
            title: "Andromeda Galaxy",
            img: "https://th.bing.com/th/id/OIP.VYZlPiWpSQ8QRV23QzLecQHaE6?rs=1&pid=ImgDetMain",
            desc: "The nearest major galaxy to the Milky Way, destined to collide with it in 4.5 billion years.",
            category: "Astronomy",
            lastEdited: "2025-05-08",
            content: "Andromeda Galaxy (M31) is the closest major galaxy to Earth, located about 2.5 million light-years away. It's on a collision course with the Milky Way."
        },
        {
            id: 4,
            title: "Exoplanets",
            img: "https://exoplanets.nasa.gov/system/resources/detail_files/2318_5K_Exo_Info_lores_FINAL.jpg",
            desc: "Planets that orbit stars outside our solar system — many may hold the potential for life.",
            category: "Space Science",
            lastEdited: "2025-05-11",
            content: "Over 5,000 exoplanets have been discovered so far. Some are potentially habitable, located in the 'Goldilocks zone' of their star systems."
        },
        {
            id: 5,
            title: "Nebulae",
            img: "https://th.bing.com/th/id/OIP.CkHMnH09Pw9eypMNMjSNCAHaG5?rs=1&pid=ImgDetMain",
            desc: "Vast clouds of gas and dust in space, often the birthplaces of stars.",
            category: "Astronomy",
            lastEdited: "2025-05-07",
            content: "Nebulae are clouds of gas and dust in space. Emission nebulae glow from ionized gas, while reflection nebulae reflect starlight."
        },
        {
            id: 6,
            title: "James Webb Space Telescope",
            img: "https://science.nasa.gov/wp-content/uploads/2023/06/jwst-spacecraftpotentialtargetsmontageflip-1200px-4-jpg.webp",
            desc: "A revolutionary telescope launched to study the universe in infrared wavelengths.",
            category: "Technology",
            lastEdited: "2025-05-12",
            content: "JWST is the most powerful space telescope ever built, capable of observing the first galaxies and studying exoplanet atmospheres."
        }
    ];

    const filteredItems = wikiItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [...new Set(wikiItems.map(item => item.category))];


    interface WikiItem {
        id: number;
        title: string;
        img: string;
        desc: string;
        category: string;
        lastEdited: string;
        content: string;
    }

    const handleItemClick = (item: WikiItem): void => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedItem(null);
    };

  



    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
            <NavBar />
            <StarsBg />

            <main className="flex flex-col gap-10 row-start-2 items-center w-full max-w-6xl">

                         <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Wiki
                </h1>
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Categories */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Result Count */}
                {searchTerm && (
                    <p className="text-white/80 text-lg">
                        Found {filteredItems.length} article{filteredItems.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                )}

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/15 rounded-2xl shadow-lg flex flex-col p-6 backdrop-blur-md hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                            onClick={() => handleItemClick(item)}
                        >
                            <div className="relative overflow-hidden rounded-xl mb-4">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-sm">
                                    {item.category}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-white/80 text-sm mb-4 flex-grow">{item.desc}</p>
                            <div className="flex justify-between items-center text-white/60 text-xs">
                                <span>Last edited: {item.lastEdited}</span>
                                <div className="flex space-x-2">
                                    <button className="hover:text-white transition-colors">Edit</button>
                                    <button className="hover:text-white transition-colors">History</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Result */}
                {filteredItems.length === 0 && searchTerm && (
                    <div className="text-center py-12">
                        <p className="text-white/80 text-lg mb-4">No articles found matching your search.</p>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Create "{searchTerm}" article
                        </button>
                    </div>
                )}
                       <Footer/>

            </main>

               

            {/* Popup Modal */}
            {isPopupOpen && selectedItem && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-white/15 rounded-2xl shadow-lg flex flex-col p-6 backdrop-blur-md hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-3xl font-bold text-white">{selectedItem.title}</h2>
                            <button
                                onClick={closePopup}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <img
                                    src={selectedItem.img}
                                    alt={selectedItem.title}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm text-white/70">
                                        <strong>Category:</strong> {selectedItem.category}
                                    </p>
                                    <p className="text-sm text-white/70">
                                        <strong>Last edited:</strong> {selectedItem.lastEdited}
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-white/80 mb-4">{selectedItem.desc}</p>
                                <p className="text-white/80 mb-6">{selectedItem.content}</p>
                                
                             
                            </div>
                        </div>
                        

                    </div>
                </div>
            )}
        </div>
    );
}