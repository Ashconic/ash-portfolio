import { useEffect, useRef } from 'react';
import { ArrowRight, Gamepad2 } from 'lucide-react';

export default function Hero({ onPlayGame }) {
    const titleContainerRef = useRef(null);
    const maskParams = useRef({
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        size: 0,
        targetSize: 0
    });

    useEffect(() => {
        let animId;

        const updateMask = () => {
            const p = maskParams.current;

            p.x += (p.targetX - p.x) * 0.12;
            p.y += (p.targetY - p.y) * 0.12;
            p.size += (p.targetSize - p.size) * 0.12;

            if (titleContainerRef.current) {
                const maskVal = `radial-gradient(circle ${p.size}px at ${p.x}px ${p.y}px, black 100%, transparent 100%)`;
                const invMaskVal = `radial-gradient(circle ${p.size}px at ${p.x}px ${p.y}px, transparent 100%, black 100%)`;

                const bgTitle = titleContainerRef.current.querySelector('.background-title');
                const fgTitle = titleContainerRef.current.querySelector('.masked-title');

                if (bgTitle) {
                    bgTitle.style.maskImage = invMaskVal;
                    bgTitle.style.webkitMaskImage = invMaskVal;
                }
                if (fgTitle) {
                    fgTitle.style.maskImage = maskVal;
                    fgTitle.style.webkitMaskImage = maskVal;
                }
            }

            animId = requestAnimationFrame(updateMask);
        };

        updateMask();
        return () => cancelAnimationFrame(animId);
    }, []);

    const handleMouseEnter = () => {
        maskParams.current.targetSize = 150; // mask radius (300px diameter)
        document.body.classList.add('hovering-mask');
    };

    const handleMouseLeave = () => {
        maskParams.current.targetSize = 0;
        document.body.classList.remove('hovering-mask');
    };

    const handleMouseMove = (e) => {
        if (!titleContainerRef.current) return;
        const rect = titleContainerRef.current.getBoundingClientRect();
        maskParams.current.targetX = e.clientX - rect.left;
        maskParams.current.targetY = e.clientY - rect.top;
    };

    return (
        <section className="section hero-section" id="home">
            {/* Background Decorative Grid & Gradients */}
            <div className="bg-grid"></div>
            <div className="bg-gradient-radial"></div>
            <div className="bg-gradient-glow"></div>

            <div className="hero-container">

                {/* Immersive Text Mask Wrapper */}
                <div
                    ref={titleContainerRef}
                    className="hero-title-wrapper"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                >
                    {/* Background Layer: Standard AI/ML Engineer (White) */}
                    <h1 className="hero-title background-title">
                        <span className="reveal-trigger">AI / ML</span>{' '}
                        <span className="reveal-trigger">ENGINEER</span>
                    </h1>

                    {/* Foreground Layer: Masked Ashwin Kumar V (Black Text) */}
                    <h1 className="hero-title masked-title">
                        <span className="reveal-trigger name-trigger">ASHWIN</span>{' '}
                        <span className="reveal-trigger name-trigger">KUMAR V</span>
                    </h1>
                </div>

                <p className="hero-desc reveal-on-scroll">
                    A full-stack engineer and designer specialized in building high-performance, visually stunning web applications with robust backends and fluid interactive frontends.
                </p>

                <div className="hero-cta reveal-on-scroll">
                    <a href="#about" className="btn btn-primary">
                        <span>Explore</span>
                        <ArrowRight className="btn-icon" size={20} />
                    </a>
                    <button onClick={onPlayGame} className="btn btn-secondary chat-cta-btn">
                        <Gamepad2 size={18} className="btn-icon-left" />
                        <span>Play</span>
                    </button>
                </div>
            </div>

            <a href="#about" className="scroll-indicator" aria-label="Scroll to About">
                <span className="mouse">
                    <span className="mouse-wheel"></span>
                </span>
                <span className="arrow"></span>
            </a>
        </section>
    );
}
