'use client';

import React, { useState,useEffect , useCallback } from 'react';
import NavBar from '@/components/navbar';
import { Play, Star, X } from 'lucide-react';
import Footer from '@/components/Footer';
import StarsBg from '@/components/stars_bg';

export function Resources() {
    const [selectedVideo, setSelectedVideo] = useState<{
        title: string;
        description: string;
        youtubeId: string;
    } | null>(null);

    interface VideoItem {
        title: string;
        description: string;
        link: string;
        image: string;
        youtubeId: string;
    }

    const handleCardClick = useCallback((item: VideoItem) => {
        setSelectedVideo({
            title: item.title,
            description: item.description,
            youtubeId: item.youtubeId
        });
    }, []);

    const closeModal = () => setSelectedVideo(null);

    const resourcesData: VideoItem[] = [
        {
            title: 'Size scale of the Milky Way',
            description: 'Watch video to explore more',
            link: 'https://scaleofuniverse.com/en/resources',
            image: 'https://th.bing.com/th?&id=OVP.44QqzkbgpalSuAQK3_vKmgHgFo&w=318&h=178&c=7&pid=2.1&rs=1',
            youtubeId: '6Gcqq3XAlhY',
        },
        {
            title: 'What is Black hole?',
            description: 'Watch video to explore more',
            link: 'https://www.nasa.gov/universe/what-are-black-holes/',
            image: 'https://th.bing.com/th?&id=OVF.OSd%2bWSmPvrhcD9bIt5z1LQ&w=318&h=178&c=7&pid=2.1&rs=1',
            youtubeId: 'EJXTZ5jpSmk',
        },
        {
            title: 'The Big Bang Explained ',
            description: 'Watch video to explore more',
            link: 'https://www.esa.int/kids/en/home',
            image: 'https://th.bing.com/th?&id=OVF.SUX9b7VpCb3wD9q1v6sKpg&w=318&h=178&c=7&pid=2.1&rs=1',
            youtubeId: 'T-m8ieA99CU',
        },
        {
            title: 'How small are we compared to the universe?',
            description: 'Watch video to explore more',
            link: 'https://apod.nasa.gov/apod/astropix.html',
            image: 'https://th.bing.com/th/id/OVP.Xh25TS3DNJZ2g7CF1Zfa8QHgFo?w=272&h=153&c=7&rs=1&qlt=90&o=5&dpr=1.3&pid=1.7',
            youtubeId: 'WYQ3O8U6SMY',
        },
        {
            title: 'A Journey to the End of the Universe',
            description: 'Watch video to explore more',
            link: 'https://solarsystem.nasa.gov/',
            image: 'https://th.bing.com/th/id/OVP.wGiItUhu_Ky7ZZVBzBUW8wHgFo?w=272&h=153&c=7&rs=1&qlt=90&o=5&dpr=1.3&pid=1.7',
            youtubeId: 'b_TkFhj9mgk',
        },
        {
            title: 'Hubble’s Highlights from its 35th Year in Orbit',
            description: 'Watch video to explore more',
            link: 'https://hubblesite.org/',
            image: 'https://th.bing.com/th/id/OVP.EWs1RTzllLLAkO1jq2WjYwHgFo?w=243&h=136&c=7&rs=1&qlt=90&o=5&dpr=1.3&pid=2.1',
            youtubeId: '9VhWnJC9nkk',
        },
    ];

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <NavBar />

            <StarsBg />

            <main className="flex flex-col gap-12 row-start-2 items-center w-full">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Resources
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        A collection of useful resources to help you explore the universe and space science.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl px-4">
                    {resourcesData.map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleCardClick(item)}
                            className="group relative w-full h-96 bg-gradient-to-br from-gray-900/50 to-gray-800/50 
                                rounded-3xl overflow-hidden backdrop-blur-lg border border-gray-700/50 
                                cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl 
                                hover:shadow-purple-500/25"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

                            <div className="relative h-1/2 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/20 backdrop-blur-md rounded-full p-6 border border-white/30">
                                        <Play className="w-8 h-8 text-white fill-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-1/2 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center space-x-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                        <Play className="w-4 h-4" />
                                        <span className="text-sm font-medium">Watch video</span>
                                    </div>
                                    <div className="w-3 h-3 bg-cyan-400 rounded-full group-hover:bg-cyan-300 transition-colors animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Footer/>
            </main>

                    

            {selectedVideo && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl w-full bg-gray-900 rounded-3xl overflow-hidden border border-gray-700">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 bg-gray-800/50 backdrop-blur-sm rounded-full p-2 
                                text-white hover:bg-gray-700/50 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-6 border-b border-gray-700">
                            <h2 className="text-2xl font-bold text-white">{selectedVideo.title}</h2>
                            <p className="text-gray-400 mt-2">{selectedVideo.description}</p>
                        </div>

                        <div className="aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Resources;
