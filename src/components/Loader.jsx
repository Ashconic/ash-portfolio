import { useState, useEffect } from 'react';

export default function Loader({ onLoaded }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalLoadingTime = 1800; // ms
        const intervalTime = 20; // ms
        const increment = 100 / (totalLoadingTime / intervalTime);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onLoaded, 600);
                    return 100;
                }
                return prev + increment;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onLoaded]);

    const displayProgress = Math.floor(progress).toString().padStart(2, '0');
    
    // Circumference of circles with r = 140 is 2 * Math.PI * 140 = 879.64
    const circumference = 879.6;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <div className={`loader-wrapper ${progress >= 100 ? 'loaded' : ''}`} id="loader">
            {/* Shockwave ring visible during fade-out exit */}
            <div className={`loader-shockwave ${progress >= 100 ? 'active' : ''}`}></div>
            
            <div className={`loader-content ${progress >= 100 ? 'exiting' : ''}`}>
                
                {/* Holographic Massive Circular Progress Synapse Ring */}
                <div className="loader-ring-wrapper">
                    <svg className="loader-svg" width="320" height="320" viewBox="0 0 320 320">
                        <defs>
                            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                            <filter id="ringGlow">
                                <feGaussianBlur stdDeviation="9" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Background track circle */}
                        <circle 
                            className="ring-track"
                            cx="160" 
                            cy="160" 
                            r="140" 
                            stroke="rgba(255, 255, 255, 0.025)" 
                            strokeWidth="5" 
                            fill="none" 
                        />
                        {/* Glowing active progress circle */}
                        <circle 
                            className="ring-progress"
                            cx="160" 
                            cy="160" 
                            r="140" 
                            stroke="url(#ringGradient)" 
                            strokeWidth="7" 
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            fill="none"
                            filter="url(#ringGlow)"
                            transform="rotate(-90 160 160)"
                        />
                    </svg>
                    
                    {/* Centered Logo & Progress inside the Ring */}
                    <div className="loader-ring-content">
                        <div className="loader-ring-logo monospace">
                            AK47<span className="dot">.</span>
                        </div>
                        <div className="loader-ring-percentage monospace">{displayProgress}%</div>
                    </div>
                </div>

                {/* Subtitle Loading Label Indicator */}
                <div className="loader-status-label monospace">
                    L O A D I N G
                </div>
                
            </div>
        </div>
    );
}
