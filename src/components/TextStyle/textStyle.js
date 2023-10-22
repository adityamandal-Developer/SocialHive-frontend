import React, { useState, useEffect } from 'react';
// this code gives a nice effect to the home page SOCIAL HIVE text on hover
const TextStyle = () => {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval = null;

        const handleMouseOver = () => {
            let iteration = 0;

            clearInterval(interval);

            interval = setInterval(() => {
                const h1Element = document.querySelector("h1");
                if (!h1Element) return;

                h1Element.innerText = h1Element.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return h1Element.dataset.value[index];
                        }

                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= h1Element.dataset.value.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        }

        const handleMouseOut = () => {
            clearInterval(interval);
        }

        const h1Element = document.querySelector("h1");
        if (h1Element) {
            h1Element.addEventListener('mouseover', handleMouseOver);
            h1Element.addEventListener('mouseout', handleMouseOut);
        }

        // Clear interval and remove event listeners when component unmounts
        return () => {
            if (h1Element) {
                h1Element.removeEventListener('mouseover', handleMouseOver);
                h1Element.removeEventListener('mouseout', handleMouseOut);
            }
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setHovered(true); // Trigger the animation when the component mounts
    }, []);

    return (
        <div className={`mx-4 px-2 ${hovered ? 'bg-white' : ''}`}>
            <h1
                data-value="SOCIAL HIVE"
                className="font-space-mono text-6xl text-white p-4 rounded-md transition-all"
            >
                SOCIAL HIVE
            </h1>
        </div>
    );
}

export default TextStyle;
