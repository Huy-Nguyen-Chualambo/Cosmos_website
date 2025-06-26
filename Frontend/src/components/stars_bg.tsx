'use client';

import React, { useState, useEffect, useCallback } from 'react';

export function StarsBg() {
    interface Star {
        id: number;
        name: string;
        size: number;
        x: number;
        y: number;
        brightness: number;
        color: string;
        constellation: string;
    }

    interface StaticStar {
        id: number;
        width: number;
        height: number;
        top: number;
        left: number;
    }

    const [stars, setStars] = useState<Star[]>([]);
    const [staticStars, setStaticStars] = useState<StaticStar[]>([]);

    // Initialize static stars once when component mounts
    useEffect(() => {
        const newStaticStars = Array(80).fill(null).map((_, i) => ({
            id: i,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            top: Math.random() * 100,
            left: Math.random() * 100,
        }));
        setStaticStars(newStaticStars);
    }, []);

    useEffect(() => {
        const fetchStars = async () => {
            try {
                const mockApiStars = Array.from({ length: 20 }, (_, i) => ({
                    id: i,
                    name: `Star-${i + 1}`,
                    size: Math.random() * 3 + 2,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    brightness: Math.random() * 10 + 5,
                    color: ['white', 'yellow', 'cyan', 'gold'][Math.floor(Math.random() * 4)],
                    constellation: ['Orion', 'Ursa Major', 'Cassiopeia', 'Andromeda'][Math.floor(Math.random() * 4)]
                }));

                setStars(mockApiStars);
            } catch (error) {
                console.error('Lỗi khi fetch stars từ API:', error);
                setStars([]);
            }
        };

        fetchStars();

        const interval = setInterval(() => {
            setStars(prevStars =>
                prevStars.map(star => ({
                    ...star,
                    x: (star.x + 0.1) % 100,
                    y: star.y + Math.sin(Date.now() * 0.001 + star.id) * 0.01
                }))
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-black">
            {staticStars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white opacity-80"
                    style={{
                        width: `${star.width}px`,
                        height: `${star.height}px`,
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        boxShadow: `0 0 6px 1px white`
                    }}
                />
            ))}

            {stars.map((star, i) => (
                <div
                    key={`api-star-${i}`}
                    className="absolute rounded-full bg-yellow-200 opacity-90"
                    style={{
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        top: `${star.y}%`,
                        left: `${star.x}%`,
                        boxShadow: `0 0 ${star.brightness}px 2px ${star.color}`
                    }}
                />
            ))}
        </div>
    );
}

export default StarsBg;