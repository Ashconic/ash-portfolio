import { useState, useEffect } from 'react';
import { FileText, X } from 'lucide-react';

export default function Navbar({ activeSection }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Home', href: '#home', id: 'home' },
        { label: 'About', href: '#about', id: 'about' },
        { label: 'Skills', href: '#skills', id: 'skills' },
        { label: 'Journey', href: '#journey', id: 'journey' },
        { label: 'Projects', href: '#projects', id: 'projects' },
        { label: 'Contact', href: '#contact', id: 'contact' }
    ];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (!menuOpen) {
            document.body.classList.add('menu-lock');
        } else {
            document.body.classList.remove('menu-lock');
        }
    };
    
    const closeMenu = () => {
        setMenuOpen(false);
        document.body.classList.remove('menu-lock');
    };

    return (
        <>
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <a href="#home" className="logo" onClick={closeMenu}>
                        AK47<span>.</span>
                    </a>
                    
                    <div className="header-actions">
                        <div className="nav-social-group">
                            <a 
                                href="https://github.com/Ashconic" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="nav-social-btn"
                                aria-label="GitHub Profile"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/ashwin-kumar-v-093661302?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="nav-social-btn"
                                aria-label="LinkedIn Profile"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                        </div>
                        
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary nav-resume-btn">
                            <FileText size={16} className="btn-icon-left" />
                            <span>Resume</span>
                        </a>
                        
                        <button 
                            className={`nav-menu-toggle ${menuOpen ? 'active' : ''}`} 
                            onClick={toggleMenu}
                            aria-label="Toggle Navigation Menu"
                        >
                            <div className="hamburger-box">
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Fullscreen Overlay Menu */}
            <div className={`fullscreen-menu-overlay ${menuOpen ? 'open' : ''}`}>
                {/* Close Button Inside Overlay */}
                <button className="overlay-close-btn" onClick={closeMenu} aria-label="Close Menu">
                    <X size={28} />
                </button>

                <div className="overlay-bg-grid"></div>
                <div className="overlay-bg-glow"></div>
                
                <div className="overlay-content-container">
                    <nav className="overlay-nav">
                        {navItems.map((item) => (
                            <a 
                                key={item.id} 
                                href={item.href} 
                                className={`overlay-nav-link ${activeSection === item.id ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                <span className="link-text">{item.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
