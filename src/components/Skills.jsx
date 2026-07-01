import { useState, useEffect, useRef } from 'react';

// Custom High-Fidelity SVG Brand Logos
const PythonLogo = () => (
    <svg viewBox="0 0 110 110" className="skill-svg" width="100%" height="100%">
        <path fill="#3776AB" d="M55 2c-14.8 0-26.3 1.2-26.3 7.8v10.5h26.7v3.7H28.7C16.8 24 16.8 38.3 16.8 38.3l.1 11.2c0 10.3 8.3 11 11.8 11h7.1v-9.7c0-9.6 8.3-17.7 18.2-17.7H74v-7.3C74 13.9 66.8 2 55 2zm-8.8 8.1c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4-4.4-2-4.4-4.4 2-4.4 4.4-4.4z"/>
        <path fill="#FFE873" d="M55 108c14.8 0 26.3-1.2 26.3-7.8V89.7H54.6v-3.7H81.3c11.9 0 11.9-14.3 11.9-14.3l-.1-11.2c0-10.3-8.3-11-11.8-11h-7.1v9.7c0 9.6-8.3 17.7-18.2 17.7H36v7.3c0 12.1 7.2 24 19 24zm8.8-8.1c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4z"/>
    </svg>
);

const PyTorchLogo = () => (
    <svg viewBox="0 0 450 450" className="skill-svg" width="100%" height="100%">
        <path fill="#EE4C2C" d="M370.2 263.3c-23.7 0-43.7 13.9-52.5 33.8-17.5 1.5-35.1 4.4-51.4 10.4v-87.1c32.9-20.1 55-56.1 55-97.1 0-62.8-51-113.8-113.8-113.8-62.8 0-113.8 51-113.8 113.8 0 40.7 21.6 76.5 54 96.7v89.2c-15.6-5.4-32.3-8.2-48.9-9.5-8.5-20.1-28.5-34.3-52.2-34.3C19.1 267.2 2 284.3 2 305.4c0 21.1 17.1 38.2 38.2 38.2 23.4 0 43.1-13.7 52.1-33.3 18.2 1.3 36.5 4.3 54.3 9.4v40.6H109v35.3h105.8v-35.3h-37.7v-30.8c11-.5 22-.5 33 .1v66H173v35.3h105.8v-35.3h-37.7v-66.2c16.3-5.4 33.7-8 50.1-9.4 8.7 19.8 28.5 33.7 51.9 33.7 31.1 0 56.3-25.2 56.3-56.3-.1-31.1-25.3-56.3-56.4-56.3zM207.5 44c41.3 0 74.8 33.5 74.8 74.8s-33.5 74.8-74.8 74.8-74.8-33.5-74.8-74.8S166.2 44 207.5 44z"/>
    </svg>
);

const LangChainLogo = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#47A248" strokeWidth="1.5" className="skill-svg" width="100%" height="100%">
        <circle cx="12" cy="12" r="10" stroke="#47A248" fill="rgba(71, 162, 72, 0.05)"/>
        <path d="M9 10a3 3 0 0 1 6 0v4a3 3 0 0 1-6 0v-4z" fill="#47A248"/>
        <path d="M12 7v3" stroke="#FFE873" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10h1" stroke="#ffffff" strokeLinecap="round"/>
    </svg>
);

const OpenCVLogo = () => (
    <svg viewBox="-50 -50 100 100" className="skill-svg" width="100%" height="100%">
        <circle cx="0" cy="-25" r="18" stroke="#FF0000" strokeWidth="8" fill="none"/>
        <circle cx="-22" cy="13" r="18" stroke="#00FF00" strokeWidth="8" fill="none"/>
        <circle cx="22" cy="13" r="18" stroke="#0000FF" strokeWidth="8" fill="none"/>
    </svg>
);

const CppLogo = () => (
    <svg viewBox="0 0 128 128" className="skill-svg" width="100%" height="100%">
        <path fill="#00599C" d="M117.5 73.5H97v20.5h-8.2V73.5H68.3v-8.2H88.8V44.8h8.2v20.5h20.5v8.2zm-67.6-32c-7 0-13.6 2.8-18.6 7.8s-7.8 11.6-7.8 18.6c0 7 2.8 13.6 7.8 18.6s11.6 7.8 18.6 7.8c10.4 0 19.3-6.2 23.3-15.1l8.2 3.7c-5.4 12-17.5 20.3-31.5 20.3-19.4 0-35.1-15.7-35.1-35.1s15.7-35.1 35.1-35.1c14 0 26.1 8.3 31.5 20.3l-8.2 3.7c-4-8.9-12.9-15.1-23.3-15.1z"/>
    </svg>
);

const JavaScriptLogo = () => (
    <svg viewBox="0 0 630 630" className="skill-svg" width="100%" height="100%">
        <rect width="630" height="630" fill="#F7DF1E"/>
        <path d="M165.6 526.4c-9.6-17.6-21.6-32.8-38.4-43.2-13.6-8.8-28.8-12-45.6-10.4-12 1.6-21.6 7.2-26.4 17.6-6.4 12.8-4 28.8 6.4 37.6 11.2 9.6 24 16.8 36.8 24.8 23.2 13.6 47.2 26.4 62.4 49.6 18.4 27.2 20 60 8 90.4-10.4 26.4-32.8 44-59.2 51.2-22.4 6.4-45.6 4.8-67.2-4-20.8-8.8-36.8-24-48-43.2l51.2-30.4c8 13.6 17.6 24.8 31.2 31.2 10.4 4.8 21.6 6.4 32.8 4 10.4-2.4 17.6-8.8 20.8-19.2 4-12.8 0-24.8-8-32.8-9.6-8.8-20.8-16-32-22.4-24.8-14.4-50.4-27.2-66.4-52.8-16-25.6-16-54.4-4-80.8 11.2-24.8 32-40.8 58.4-46.4 20.8-4.8 41.6-3.2 61.6 4.8 19.2 8 33.6 21.6 43.2 39.2l-51.2 30.4zm236.8 132v-323.2h60v323.2h-60z" fill="#000000"/>
    </svg>
);

const ReactLogo = () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="skill-svg" width="100%" height="100%">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

const NextjsLogo = () => (
    <svg viewBox="0 0 128 128" className="skill-svg" width="100%" height="100%">
        <circle cx="64" cy="64" r="64" fill="#000000"/>
        <path fill="url(#nextjs-grad-skills)" d="M102.5 102.5L52.9 38.6H42.7v50.8h8.8V49.7L93.7 104c2.9-2.7 5.9-5.7 8.8-8.9z"/>
        <rect x="91" y="38" width="9" height="51" fill="#ffffff"/>
        <defs>
            <linearGradient id="nextjs-grad-skills" x1="0" y1="0" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="100%" stopColor="#000000"/>
            </linearGradient>
        </defs>
    </svg>
);

const NodejsLogo = () => (
    <svg viewBox="0 0 100 115" className="skill-svg" width="100%" height="100%">
        <path fill="#339933" d="M96.7 28.2L53.3 3.2c-2.1-1.2-4.6-1.2-6.7 0L3.3 28.2C1.2 29.4 0 31.6 0 34v50c0 2.4 1.2 4.6 3.3 5.8l43.3 25c1 .6 2.2.9 3.3.9s2.3-.3 3.3-.9l43.3-25c2.1-1.2 3.3-3.4 3.3-5.8V34c0-2.4-1.2-4.6-3.3-5.8zm-46.7 75V69.7c-9.1.5-16.5-6.8-16.5-16s7.4-16.5 16.5-16v-14l30.3 17.5v43.7L50 103.2z"/>
    </svg>
);

const PostgreSQLLogo = () => (
    <svg viewBox="0 0 120 120" className="skill-svg" width="100%" height="100%">
        <path fill="#336791" d="M102.5 56.8c.8-10.7-3.9-20.5-12.7-27.1-7.2-5.4-16.1-8-25.1-7.2-12.8 1.1-23.7 8.3-29.3 19.6-1.9-1.2-4.1-1.8-6.4-1.8-8.1 0-14.7 6.6-14.7 14.7s6.6 14.7 14.7 14.7h35.3c8.1 0 14.7-6.6 14.7-14.7 0-4-1.6-7.6-4.2-10.3 3-5.5 8.7-9.3 15.3-9.9 5.3-.5 10.6 1.1 14.8 4.3 5.4 4.1 8.3 10.2 7.8 16.9-.5 7.1-4.8 13.2-11.2 16.1-5.9 2.7-12.7 2.7-18.6 0-3.3-1.5-6.1-3.8-8.2-6.7l-4.5 4.5c3.2 4.1 7.2 7.3 11.9 9.4 8 3.6 17.2 3.6 25.2 0 8.9-4 15.1-12.2 15.9-22.6z"/>
    </svg>
);

const MongoDBLogo = () => (
    <svg viewBox="0 0 32 32" className="skill-svg" width="100%" height="100%">
        <path fill="#47A248" d="M16 1.1c-.2-.1-.4-.2-.6-.2-.3 0-.6.1-.9.2L7.3 6.9C5.3 8.3 4 10.7 4 13.3c0 5 3.3 9.4 8.2 10.7l2.8.8.4.1v6c0 .6.4 1 1 1s1-.4 1-1v-6l.4-.1 2.8-.8C24.7 22.7 28 18.3 28 13.3c0-2.6-1.3-5-3.3-6.4L16 1.1zm8.3 11.8c0 3.8-2.6 7.1-6.3 8.1l-2 1v-17l7 5.3c.8 1 1.3 2.2 1.3 3.6z"/>
    </svg>
);

const GitLogo = () => (
    <svg viewBox="0 0 100 100" className="skill-svg" width="100%" height="100%">
        <path fill="#F05032" d="M92.2 44.5L55.5 7.8c-2.4-2.4-6.4-2.4-8.8 0L39 15.5l11.1 11.1c2.2-.7 4.9-.2 6.7 1.6 1.8 1.8 2.3 4.5 1.6 6.7l11.1 11.1c2.2-.7 4.9-.2 6.7 1.6 2.4 2.4 2.4 6.4 0 8.8s-6.4 2.4-8.8 0c-1.8-1.8-2.3-4.5-1.6-6.7L54.7 48.1c-.7.2-1.5.3-2.2.3-.7 0-1.5-.1-2.2-.3L40.1 58.3c.7 2.2.2 4.9-1.6 6.7-2.4 2.4-6.4 2.4-8.8 0s-2.4-6.4 0-8.8c1.8-1.8 4.5-2.3 6.7-1.6l10.2-10.2c-.2-.7-.3-1.5-.3-2.2 0-.7.1-1.5.3-2.2L37.3 29.1l-29.5 29.5c-2.4 2.4-2.4 6.4 0 8.8l36.7 36.7c2.4 2.4 6.4 2.4 8.8 0l38.9-38.9c2.4-2.4 2.4-6.4 0-8.8z"/>
    </svg>
);

const FigmaLogo = () => (
    <svg viewBox="0 0 100 150" className="skill-svg" width="100%" height="100%">
        <path fill="#F24E1E" d="M25 37.5a25 25 0 0 1 25-25h25v50H50a25 25 0 0 1-25-25z"/>
        <path fill="#A259FF" d="M25 87.5a25 25 0 0 1 25-25h25v50H50a25 25 0 0 1-25-25z"/>
        <path fill="#1ABC9C" d="M25 137.5a25 25 0 0 1 25-25h25a25 25 0 0 1-50 0z"/>
        <path fill="#0ACF83" d="M50 87.5a25 25 0 1 1 50 0 25 25 0 0 1-50 0z"/>
        <path fill="#19B5FE" d="M50 37.5a25 25 0 1 1 50 0 25 25 0 0 1-50 0z"/>
    </svg>
);

const TailwindLogo = () => (
    <svg viewBox="0 0 24 24" className="skill-svg" fill="#38BDF8" width="100%" height="100%">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"/>
    </svg>
);

const TypeScriptLogo = () => (
    <svg viewBox="0 0 100 100" className="skill-svg" width="100%" height="100%">
        <rect width="100" height="100" fill="#3178C6"/>
        <path d="M70 70v-40h8v40h-8zm-25 0v-32h-12v-8h32v8h-12v32h-8z" fill="#ffffff"/>
    </svg>
);

const DockerLogo = () => (
    <svg viewBox="0 0 24 24" className="skill-svg" fill="#2496ED" width="100%" height="100%">
        <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.902c0-.101-.084-.186-.186-.186h-2.119c-.103 0-.186.085-.186.186v1.991c0 .102.083.185.186.185m-2.954-5.43h2.118c.103 0 .185-.083.185-.186V3.47c0-.103-.083-.186-.185-.186h-2.118c-.103 0-.186.083-.186.186v1.992c0 .103.083.186.186.186m0 2.715h2.118c.103 0 .185-.083.185-.186V6.187c0-.102-.083-.186-.185-.186h-2.118c-.103 0-.186.084-.186.186v1.991c0 .103.083.186.186.186m-2.953 2.715h2.119c.102 0 .185-.083.185-.185V8.902c0-.101-.083-.186-.185-.186h-2.119c-.103 0-.186.085-.186.186v1.991c0 .102.083.185.186.185m0-2.715h2.119c.102 0 .185-.083.185-.186V6.187c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.991c0 .103.083.186.186.186m-2.955 2.715h2.119c.102 0 .185-.083.185-.185V8.902c0-.101-.083-.186-.185-.186H5.12c-.102 0-.185.085-.185.186v1.991c0 .102.083.185.185.185m0-2.715h2.119c.102 0 .185-.083.185-.186V6.187c0-.102-.083-.186-.185-.186H5.12c-.102 0-.185.084-.185.186v1.991c0 .103.083.186.185.186m-2.954 2.715h2.119c.101 0 .185-.083.185-.185V8.902c0-.101-.084-.186-.185-.186h-2.12c-.101 0-.185.085-.185.186v1.991c0 .102.084.185.185.185m-2.954 0h2.119c.102 0 .185-.083.185-.185V8.902c0-.101-.083-.186-.185-.186h-2.119c-.103 0-.186.085-.186.186v1.991c0 .102.083.185.186.185m-1.205 2.714c-.102 0-.185.085-.185.186v1.99c0 .102.083.186.185.186h2.119c.103 0 .186-.084.186-.186v-1.99c0-.101-.083-.186-.186-.186zm21.38-4.238c-.286-.24-.766-.453-1.42-.453a2.3 2.3 0 0 0-2.122 1.488c-.626.046-1.282.166-1.921.36v1.545c.48.167.92.38 1.282.648a7 7 0 0 1-.95 3.32c-.443.766-.921 1.48-1.503 1.94c-.218.17-.468.29-.738.38a9.4 9.4 0 0 1-5.698-.38c-1.32-.47-2.485-1.43-3.13-2.61c-.6-.92-.85-2.02-.95-3.32h-8.08c-.147.74-.356 1.48-.676 2.18c-.85 1.83-2.61 3.51-4.73 4.25c-.244.09-.508.15-.776.2V20h23v-.023c0-.074.015-.147.015-.22a6.85 6.85 0 0 0-2.222-4.996"/>
    </svg>
);

export default function Skills() {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSkill, setActiveSkill] = useState(0);
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const skills = [
        { 
            name: 'Python', 
            category: 'AI & Data Science Foundations', 
            desc: 'Core language for building Machine Learning pipelines, data manipulation, and automation scripting.',
            project: 'Neuro-Flap Simulator, Academic focus HUD',
            color: '#3776AB', 
            rgb: '55, 118, 171',
            logo: PythonLogo 
        },
        { 
            name: 'PyTorch', 
            category: 'Deep Learning & Neural Networks', 
            desc: 'Designing, training, and optimizing deep neural networks, custom CNN layers, and transformer models.',
            project: 'Neuro-Flap Neural Optimizer',
            color: '#EE4C2C', 
            rgb: '238, 76, 44',
            logo: PyTorchLogo 
        },
        { 
            name: 'LangChain', 
            category: 'Generative AI & LLM Systems', 
            desc: 'Developing conversational AI agent architectures, local LLM pipelines (Ollama), and offline RAG databases.',
            project: 'Academic NLP Assistant (LangChain + ChromaDB)',
            color: '#47A248', 
            rgb: '71, 162, 72',
            logo: LangChainLogo 
        },
        { 
            name: 'OpenCV', 
            category: 'Computer Vision Pipelines', 
            desc: 'Real-time camera frame processing, matrix-based filters, image categorization, and shape detection.',
            project: 'Image classification modules, Academic CV Tab',
            color: '#FF0000', 
            rgb: '255, 0, 0',
            logo: OpenCVLogo 
        },
        { 
            name: 'C / C++', 
            category: 'Systems & Algorithm Architecture', 
            desc: 'Low-level performance structures, hardware driver interfaces, and efficient algorithmic computations.',
            project: 'DSA Solutions & Optimization Solvers',
            color: '#00599C', 
            rgb: '0, 89, 156',
            logo: CppLogo 
        },
        { 
            name: 'JavaScript', 
            category: 'Functional Web Programming', 
            desc: 'Asynchronous event fetching, dynamic client math algorithms, interactive physics logic, and core UI rendering.',
            project: 'Vite Portfolio Shell, Interactive Parallax Controllers',
            color: '#F7DF1E', 
            rgb: '247, 223, 30',
            logo: JavaScriptLogo 
        },
        { 
            name: 'React', 
            category: 'Responsive Interface Frameworks', 
            desc: 'Building responsive single-page interfaces, component state hooks, and high-performance layout wrappers.',
            project: 'Vite Portfolio Dashboard, About Module',
            color: '#61DAFB', 
            rgb: '97, 218, 251',
            logo: ReactLogo 
        },
        { 
            name: 'Next.js', 
            category: 'Meta-Framework & Edge Systems', 
            desc: 'Server-side rendering, static site generation, serverless routing, and SEO optimization pipelines.',
            project: 'Enterprise Portal Demo, Serverless backends',
            color: '#ffffff', 
            rgb: '255, 255, 255',
            logo: NextjsLogo 
        },
        { 
            name: 'Node.js', 
            category: 'Scalable Backend Architectures', 
            desc: 'Building fast RESTful API endpoints, routing gateways, websocket connections, and microservice runners.',
            project: 'Local API proxy, Socket servers',
            color: '#339933', 
            rgb: '51, 153, 51',
            logo: NodejsLogo 
        },
        { 
            name: 'PostgreSQL', 
            category: 'Relational Database Schema', 
            desc: 'Normalizing tables, optimizing query joins, writing stored procedures, and managing ACID-compliant operations.',
            project: 'Mock Academic Database Hub',
            color: '#336791', 
            rgb: '51, 103, 145',
            logo: PostgreSQLLogo 
        },
        { 
            name: 'MongoDB', 
            category: 'Document Object Collections', 
            desc: 'Structuring schema-less JSON storage, aggregating lookup queries, and building fast query stores for web apps.',
            project: 'Personal Project Metadata Store',
            color: '#47A248', 
            rgb: '71, 162, 72',
            logo: MongoDBLogo 
        },
        { 
            name: 'Git & GitHub', 
            category: 'DevOps & Version Control', 
            desc: 'Repository branching model alignment, continuous integration (CI/CD) pipelines, and release versioning.',
            project: 'Vite Portfolio Commits Index',
            color: '#F05032', 
            rgb: '240, 80, 50',
            logo: GitLogo 
        },
        { 
            name: 'Figma', 
            category: 'UI/UX Design & Prototyping', 
            desc: 'Creating wireframes, user journeys, high-fidelity mockups, and interactive responsive design prototypes.',
            project: 'Vite Portfolio Mockups & Grid Layouts',
            color: '#F24E1E', 
            rgb: '242, 78, 30',
            logo: FigmaLogo 
        },
        { 
            name: 'Tailwind CSS', 
            category: 'Utility-First Web Styling', 
            desc: 'Rapid UI styling, flexible layout utilities, responsive breakpoints, and dark mode configuration.',
            project: 'Neuro-Flap Game Dashboard UI',
            color: '#38BDF8', 
            rgb: '56, 189, 248',
            logo: TailwindLogo 
        },
        { 
            name: 'TypeScript', 
            category: 'Type-Safe Application Coding', 
            desc: 'Enforcing compile-time typing, structure validation, modular scaling, and clean design patterns.',
            project: 'Academic Algorithm Solvers (Type-Safe API)',
            color: '#3178C6', 
            rgb: '49, 120, 198',
            logo: TypeScriptLogo 
        },
        { 
            name: 'Docker', 
            category: 'Containerized Architectures', 
            desc: 'Packaging applications, configuring multi-container services with Docker Compose, and environment replication.',
            project: 'Local Sandbox Compiler Environment',
            color: '#2496ED', 
            rgb: '36, 150, 237',
            logo: DockerLogo 
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            const sectionTop = rect.top + window.scrollY;
            const currentScroll = window.scrollY;
            const startOffset = sectionTop;
            const scrollableDistance = sectionHeight - windowHeight;
            
            if (scrollableDistance <= 0) {
                return;
            }
            
            let progress = (currentScroll - startOffset) / scrollableDistance;
            progress = Math.max(0, Math.min(1, progress));
            
            setScrollProgress(progress);
            
            // Slice progress into 8 layers, each layer containing 2 blocks
            const activeLayer = Math.min(7, Math.floor(progress * 8));
            const subProgress = (progress * 8) % 1;
            const activeIndex = activeLayer * 2 + (subProgress >= 0.5 ? 1 : 0);
            setActiveSkill(activeIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Decide which skill details are shown in the HUD: hovered takes priority, then scroll-active
    const displayedSkillIndex = hoveredSkill !== null ? hoveredSkill : activeSkill;
    const activeShowcase = skills[displayedSkillIndex];

    return (
        <section ref={sectionRef} className="skills-scroll-section" id="skills">
            <div className="skills-sticky-container">
                
                {/* Background decorative grids */}
                <div className="skills-bg-grid"></div>

                <div className="skills-layout-wrapper">
                    
                    {/* Centered 3D Isometric Jenga Stack Scene Container */}
                    <div className="skills-dial-column">
                        
                        {/* 3D Viewport Scene */}
                        <div className="isometric-scene">
                            <div 
                                className={`isometric-stack ${hoveredSkill !== null ? 'tower-balancing' : ''}`}
                            >
                                {skills.map((skill, idx) => {
                                    const LogoComponent = skill.logo;
                                    
                                    // Assembly Calculations
                                    const layer = Math.floor(idx / 2); // 8 layers (0 to 7)
                                    const pos = idx % 2; // 2 blocks side-by-side per layer (0 or 1)
                                    const isEvenLayer = layer % 2 === 0;

                                    // Assemble blocks in pairs (1 layer at a time: 2 blocks) staggered with resting scroll landings
                                    const startScroll = layer * 0.12; // Spaced: 0.0, 0.12, 0.24, 0.36, 0.48, 0.60, 0.72, 0.84
                                    const duration = 0.08; // Short active flight per layer, creating clear scroll landing gaps
                                    const endScroll = startScroll + duration;
                                    let assembleProgress = (scrollProgress - startScroll) / duration;
                                    assembleProgress = Math.max(0, Math.min(1, assembleProgress)); // 0 to 1

                                    const isAssembled = assembleProgress === 1;
                                    const isHovered = hoveredSkill === idx;
                                    
                                    // Placement logic
                                    const blockZ = layer * 50; // Increased vertical spacing between layers from 40px to 50px
                                    
                                    // Scatter physics offset (flies in smoothly from short distance to feel tied to scroll)
                                    const scatterDistance = pos === 0 ? -180 : 180;
                                    const slideInOffset = scatterDistance * (1 - assembleProgress);
                                    const dropInZ = 120 * (1 - assembleProgress);

                                    // Hover slide out physics: slides out along its pointing axis
                                    let hoverX = 0;
                                    let hoverY = 0;
                                    if (isHovered && isAssembled) {
                                        if (isEvenLayer) {
                                            hoverY = pos === 0 ? -60 : 60; // Slide along Y axis
                                        } else {
                                            hoverX = pos === 0 ? -60 : 60; // Slide along X axis
                                        }
                                    }

                                    // Dynamic inline transform mapping - scaled spacing to 110px with 55px offset
                                    const transformStyle = isEvenLayer
                                        ? `translate3d(${pos * 110 - 55 + hoverX}px, ${slideInOffset + hoverY}px, ${blockZ + dropInZ}px)`
                                        : `translate3d(${slideInOffset + hoverX}px, ${pos * 110 - 55 + hoverY}px, ${blockZ + dropInZ}px)`;

                                    return (
                                        <div
                                            key={skill.name}
                                            className={`iso-block ${isEvenLayer ? 'orient-y' : 'orient-x'} ${isAssembled ? 'assembled' : ''} ${isHovered ? 'hovered' : ''} ${activeSkill === idx ? 'scroll-active' : ''}`}
                                            onMouseEnter={() => isAssembled && setHoveredSkill(idx)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                            style={{
                                                transform: transformStyle,
                                                opacity: scrollProgress > 0.002 ? Math.min(1, assembleProgress * 2) : 0,
                                                pointerEvents: scrollProgress > 0.002 ? 'auto' : 'none',
                                                '--brand-rgb': skill.rgb,
                                                zIndex: 10 + layer
                                            }}
                                        >
                                            {/* 3D Faces */}
                                            {/* Top Face (holds the icon & label) */}
                                            <div className="iso-face top">
                                                <div className="face-content">
                                                    <div className="iso-logo-wrapper">
                                                        <LogoComponent />
                                                    </div>
                                                    <span className="iso-name monospace">{skill.name}</span>
                                                </div>
                                            </div>

                                             {/* Left/Front extrusion face */}
                                             <div className="iso-face side front"></div>
                                             {/* Right/Back extrusion face */}
                                             <div className="iso-face side right"></div>
                                             {/* Back side extrusion face */}
                                             <div className="iso-face side back"></div>
                                             {/* Left side extrusion face */}
                                             <div className="iso-face side left"></div>
                                             {/* Bottom Face */}
                                             <div className="iso-face bottom"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
