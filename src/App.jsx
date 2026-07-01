import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIFlappyGame from './components/AIFlappyGame';
import { ArrowUp } from 'lucide-react';
import Lenis from 'lenis';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('home');
    const [isGameOpen, setIsGameOpen] = useState(false);

    // Run observers once loading completes
    useEffect(() => {
        if (isLoading) return;

        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple style easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // 1. Scroll Reveal Observer
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        const revealObserverOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, revealObserverOptions);

        revealElements.forEach(el => revealObserver.observe(el));

        // 2. Active Section Section Highlight Observer
        const sections = document.querySelectorAll('section');
        const sectionObserverOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    setActiveSection(id);
                }
            });
        }, sectionObserverOptions);

        sections.forEach(sec => sectionObserver.observe(sec));

        // Cleanup
        return () => {
            lenis.destroy();
            revealElements.forEach(el => revealObserver.unobserve(el));
            sections.forEach(sec => sectionObserver.unobserve(sec));
        };
    }, [isLoading]);

    // Reset scroll to top on reload/refresh
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        document.body.classList.add('loading');
    }, []);

    // Handle Loader Finished
    const handleLoaded = () => {
        setIsLoading(false);
        document.body.classList.remove('loading');
        window.scrollTo(0, 0);
    };

    return (
        <>
            {/* Custom Interactive Cursor */}
            <CustomCursor />

            {/* loading screen overlay */}
            {isLoading && <Loader onLoaded={handleLoaded} />}

            {/* Navigation Header */}
            <Navbar activeSection={activeSection} />

            {/* Main portfolio body */}
            <main className="main-content">
                <Hero onPlayGame={() => setIsGameOpen(true)} />
                <About />
                <Skills />
                <Journey />
                <Projects />
                <Contact />
            </main>

            {/* Interactive AI Flappy Game Side Drawer */}
            <AIFlappyGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-container">
                    <p>&copy; {new Date().getFullYear()} Ashwin Kumar V. Crafted with passion.</p>
                    <a href="#home" className="back-to-top" aria-label="Scroll to Top">
                        <ArrowUp size={20} />
                    </a>
                </div>
            </footer>
        </>
    );
}
