import { useState, useEffect, useRef } from 'react';
import { Brain, Cpu, Eye, Code, Terminal } from 'lucide-react';

// Subcomponent: 3D Parallax Tilt Profile Card
function ProfileCard() {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50, active: false });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;

        // Calculate tilt rotation angles (max 10 degrees)
        const rx = -((y - yc) / yc) * 10;
        const ry = ((x - xc) / xc) * 10;

        // Calculate shine coordinates in percentage
        const mx = (x / rect.width) * 100;
        const my = (y / rect.height) * 100;

        setTilt({ x: rx, y: ry, mx, my, active: true });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0, mx: 50, my: 50, active: false });
    };

    return (
        <div
            ref={cardRef}
            className={`profile-container glass-card tilt-card ${tilt.active ? 'active' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
        >
            {/* Glossy specular light sheen overlay */}
            <div
                className="card-shine"
                style={{
                    background: tilt.active
                        ? `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`
                        : 'none'
                }}
            />

            {/* Static Profile Photo */}
            <div className="profile-image-wrapper">
                <img
                    src="/assets/avatar.jpeg"
                    alt="Ashwin Kumar V Profile Avatar"
                    className="profile-img"
                    style={{
                        transform: tilt.active
                            ? `scale(1.04) translateZ(20px)`
                            : 'scale(1) translateZ(0px)',
                        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                />
            </div>

            {/* Holographic backdrop glow */}
            <div
                className="profile-card-glow"
                style={{
                    transform: tilt.active
                        ? `translate(${-tilt.y * 1.5}px, ${tilt.x * 1.5}px)`
                        : 'none',
                    transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
            />
        </div>
    );
}

export default function About() {
    const quoteContainerRef = useRef(null);
    const quoteMaskParams = useRef({
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        size: 0,
        targetSize: 0
    });

    useEffect(() => {
        let animId;

        const updateQuoteMask = () => {
            const p = quoteMaskParams.current;

            p.x += (p.targetX - p.x) * 0.12;
            p.y += (p.targetY - p.y) * 0.12;
            p.size += (p.targetSize - p.size) * 0.12;

            if (quoteContainerRef.current) {
                const maskVal = `radial-gradient(circle ${p.size}px at ${p.x}px ${p.y}px, black 100%, transparent 100%)`;
                const invMaskVal = `radial-gradient(circle ${p.size}px at ${p.x}px ${p.y}px, transparent 100%, black 100%)`;

                const bgQuote = quoteContainerRef.current.querySelector('.background-quote');
                const fgQuote = quoteContainerRef.current.querySelector('.masked-quote');

                if (bgQuote) {
                    bgQuote.style.maskImage = invMaskVal;
                    bgQuote.style.webkitMaskImage = invMaskVal;
                }
                if (fgQuote) {
                    fgQuote.style.maskImage = maskVal;
                    fgQuote.style.webkitMaskImage = maskVal;
                }
            }

            animId = requestAnimationFrame(updateQuoteMask);
        };

        updateQuoteMask();
        return () => cancelAnimationFrame(animId);
    }, []);

    const handleQuoteMouseEnter = () => {
        quoteMaskParams.current.targetSize = 135; // mask radius
        document.body.classList.add('hovering-mask');
    };

    const handleQuoteMouseLeave = () => {
        quoteMaskParams.current.targetSize = 0;
        document.body.classList.remove('hovering-mask');
    };

    const handleQuoteMouseMove = (e) => {
        if (!quoteContainerRef.current) return;
        const rect = quoteContainerRef.current.getBoundingClientRect();
        quoteMaskParams.current.targetX = e.clientX - rect.left;
        quoteMaskParams.current.targetY = e.clientY - rect.top;
    };

    return (
        <section className="section about-section" id="about">
            <div className="container">
                <h2 className="section-title reveal-on-scroll" data-subtitle="Who I Am">About Me</h2>

                <div className="about-grid">

                    {/* Left Column: Text & Content */}
                    <div className="about-text-column reveal-on-scroll">
                        <h3 className="about-headline">Building Intelligent Systems for Real-World Impact</h3>

                        <p className="about-subheadline">
                            AI & Machine Learning Engineer passionate about developing intelligent applications using Machine Learning, Deep Learning, Computer Vision, and Large Language Models.
                        </p>

                        <p className="about-para">
                            I am an AI & Machine Learning engineering student driven by curiosity and innovation. I enjoy designing intelligent systems that solve practical problems, combining modern AI technologies with software engineering to build scalable, efficient, and impactful solutions. Every project I create is an opportunity to learn, experiment, and push the boundaries of what's possible with AI.
                        </p>

                        {/* Developer Stats Indicators Grid */}
                        <div className="about-stats-section">
                            <span className="hud-section-label">Developer Performance Indicators:</span>
                            <div className="about-stats-grid">

                                <div className="stat-hud-card glass-card">
                                    <span className="stat-hud-num text-cyan">7+</span>
                                    <span className="stat-hud-label">Projects</span>
                                </div>

                                <div className="stat-hud-card glass-card">
                                    <span className="stat-hud-num text-violet">12+</span>
                                    <span className="stat-hud-label">Tech Stack</span>
                                </div>

                                <div className="stat-hud-card glass-card">
                                    <span className="stat-hud-num text-cyan">150+</span>
                                    <span className="stat-hud-label">GPU Hrs</span>
                                </div>

                                <div className="stat-hud-card glass-card">
                                    <span className="stat-hud-num text-violet">100.00%</span>
                                    <span className="stat-hud-label">Coffee Consumed</span>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Right Column: Visual Neural net canvas */}
                    <div className="about-visual-column reveal-on-scroll">
                        <ProfileCard />
                    </div>

                </div>

                {/* Holographic Philosophy Quote Grid (Full-width Banner) */}
                <div
                    ref={quoteContainerRef}
                    className="philosophy-hologram reveal-on-scroll quote-mask-wrapper"
                    onMouseEnter={handleQuoteMouseEnter}
                    onMouseLeave={handleQuoteMouseLeave}
                    onMouseMove={handleQuoteMouseMove}
                >
                    <div className="hologram-body">
                        <span className="quote-mark">“</span>

                        {/* Background Layer: Standard Quote */}
                        <p className="hologram-quote background-quote">
                            "Great AI isn't defined by complexity — it is defined by its ability to solve meaningful problems with <strong className="text-cyan">simplicity</strong>, <strong className="text-violet">reliability</strong>, and <strong className="text-gradient">purpose</strong>"
                        </p>

                        {/* Foreground Layer: Masked Savage/Easter Egg Quote */}
                        <p className="hologram-quote masked-quote">
                            "Actually, it's just a bunch of <strong className="text-cyan">matrix multiplications</strong> and <strong className="text-violet">caffeine</strong> under the hood, but don't tell the clients!"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
