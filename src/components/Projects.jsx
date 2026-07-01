import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Cpu, Database, Eye, Server, RefreshCw } from 'lucide-react';

export default function Projects() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const canvasesRef = useRef([]);
    const targetProgressRef = useRef(0);
    const currentProgressRef = useRef(0);
    const trackRef = useRef(null);
    const maskRef = useRef(null);
    const trailerRefs = useRef([]);
    const trailerTitleRefs = useRef([]);
    const trailerPhysicsRef = useRef([]);
    const [dimensions, setDimensions] = useState({ cardWidth: 600, gap: 40, padding: 200 });

    const [isFetching, setIsFetching] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [loaderText, setLoaderText] = useState('[SYNC] CONNECTING TO GITHUB API...');
    const hasInitializedRef = useRef(false);

    useEffect(() => {
        if (hasInitializedRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasInitializedRef.current) {
                    hasInitializedRef.current = true;
                    setIsFetching(true);
                    
                    const textSequence = [
                        '[SYNC] CONNECTING TO GITHUB CLOUD...',
                        '[LOAD] RESOLVING FEATURED ARCHIVES...',
                        '[INDEX] COMPILED PROJECT DECK.'
                    ];
                    
                    let textIdx = 0;
                    const textInterval = setInterval(() => {
                        textIdx++;
                        if (textIdx < textSequence.length) {
                            setLoaderText(textSequence[textIdx]);
                        }
                    }, 500);

                    setTimeout(() => {
                        clearInterval(textInterval);
                        setIsFetching(false);
                        setTimeout(() => {
                            setHasFetched(true);
                        }, 500);
                    }, 1500);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    // Handle gesture-to-scroll translations (both trackpad wheel and touchscreen swipes)
    useEffect(() => {
        const mask = maskRef.current;
        if (!mask) return;

        // 1. Mouse wheel mapping on smaller viewports
        const handleWheel = (e) => {
            if (window.innerWidth >= 1024) return;
            if (e.deltaY !== 0) {
                window.scrollBy(0, e.deltaY);
                e.preventDefault();
            }
        };

        // 2. Touch swipe mapping on smaller viewports (swiping left/right translates to vertical scroll)
        let startX = 0;
        let startY = 0;

        const handleTouchStart = (e) => {
            if (window.innerWidth >= 1024) return;
            if (e.touches.length !== 1) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (window.innerWidth >= 1024) return;
            if (e.touches.length !== 1) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            // If the swipe is primarily horizontal, convert it to vertical page scroll
            if (Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
                // Swiping left (negative deltaX) scrolls down (card moves left)
                // Swiping right (positive deltaX) scrolls up (card moves right)
                window.scrollBy(0, -deltaX * 1.4);
                startX = currentX;
                startY = currentY;
                
                if (e.cancelable) {
                    e.preventDefault();
                }
            }
        };

        mask.addEventListener('wheel', handleWheel, { passive: false });
        mask.addEventListener('touchstart', handleTouchStart, { passive: true });
        mask.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            mask.removeEventListener('wheel', handleWheel);
            mask.removeEventListener('touchstart', handleTouchStart);
            mask.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    // Initialize trailer states
    useEffect(() => {
        trailerPhysicsRef.current = projects.map(() => ({
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
            active: false,
            buttonHovered: false
        }));
    }, []);

    // Measure viewport and card dimensions for pixel-perfect centering
    const updateDims = () => {
        if (!trackRef.current) return;
        const track = trackRef.current;
        const viewportWidth = track.parentElement ? track.parentElement.getBoundingClientRect().width : window.innerWidth;
        
        let cardWidth = 0;
        let gap = 0;
        
        // Compute layout dimensions mathematically to prevent browser reflow delays or scaling errors
        if (viewportWidth < 480) {
            cardWidth = Math.min(500, viewportWidth * 0.85); // Matches index.css: 85vw
            gap = 24; // Matches index.css: 1.5rem (assuming 16px root font size)
        } else if (viewportWidth < 1024) {
            cardWidth = Math.min(500, viewportWidth * 0.80); // Matches index.css: 80vw
            gap = 24; // Matches index.css: 1.5rem
        } else {
            cardWidth = Math.min(820, viewportWidth * 0.74); // Matches index.css: 74vw
            gap = 72; // Matches index.css: 4.5rem
        }
        
        const padding = Math.max(20, (viewportWidth - cardWidth) / 2);
        
        setDimensions({ cardWidth, gap, padding });
    };

    // Measure viewport and card dimensions with robust resize & mutation observers
    useEffect(() => {
        updateDims();
        const timer1 = setTimeout(updateDims, 300);
        const timer2 = setTimeout(updateDims, 1200);
        const timer3 = setTimeout(updateDims, 2400); // After loader completes
        
        window.addEventListener('resize', updateDims);
        
        let resizeObserver;
        const track = trackRef.current;
        if (track && track.children[0]) {
            resizeObserver = new ResizeObserver(() => {
                updateDims();
            });
            resizeObserver.observe(track.children[0]);
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            window.removeEventListener('resize', updateDims);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, []);

    const projects = [
        {
            title: 'Local AI Agent (RAG)',
            category: 'GENERATIVE AI & AGENTS',
            rgb: '139, 92, 246',
            rgbAlt: '236, 72, 153',
            rgbAlt2: '59, 130, 246',
            facts: ['[LLM: LOCAL_LLAMA_3.2]', '[STORE: CHROMADB_VECTOR]', '[EMBED: MXBAI_LARGE]', '[MODE: 100%_OFFLINE]'],
            desc: 'A fully private, offline AI agent built from scratch. Integrates Ollama (Llama 3.2), LangChain, and ChromaDB vector search to answer queries based on local documents with zero cloud dependencies or API keys.',
            github: 'https://github.com/Ashconic',
            live: 'https://github.com/Ashconic',
            tags: ['Python', 'Ollama', 'LangChain', 'ChromaDB', 'RAG'],
            icon: Database,
            visType: 'rag',
            hudTitle: 'VECTOR_KNOWLEDGE_STORE',
            video: '/videos/ai agent.mp4'
        },
        {
            title: 'AI Document Q&A System',
            category: 'SEMANTIC SEARCH & NLP',
            rgb: '6, 182, 212',
            rgbAlt: '99, 102, 241',
            rgbAlt2: '139, 92, 246',
            facts: ['[INDEX: FAISS_STORE]', '[EMBED: HUGGINGFACE]', '[MODEL: RAG_Q&A_PIPELINE]', '[SEARCH: SEMANTIC]'],
            desc: 'Retrieval-Augmented Generation Q&A application chunking PDF text documents, generating high-dimensional semantic search vectors via HuggingFace, and querying accurate answers via FAISS databases.',
            github: 'https://github.com/Ashconic',
            live: 'https://github.com/Ashconic',
            tags: ['Python', 'LangChain', 'FAISS', 'HuggingFace', 'NLP'],
            icon: Eye,
            visType: 'vision',
            hudTitle: 'DOCUMENT_VECTOR_SCAN',
            image: '/videos/q & a (rag).png'
        },
        {
            title: 'AI-Powered Voice Assistant',
            category: 'CONVERSATIONAL AI',
            rgb: '59, 130, 246',
            rgbAlt: '147, 51, 234',
            rgbAlt2: '99, 102, 241',
            facts: ['[VOICE: VAPI_AI_ENGINE]', '[TUNNEL: NGROK_SECURE]', '[API: CALL_ROUTING]', '[FLOW: AUTO_GRACEFUL]'],
            desc: 'Conversational agent designed to call customers, prompt for order numbers, check real-time entries in local databases, and route status logs via Vapi AI, Python endpoints, and Ngrok tunnels.',
            github: 'https://github.com/Ashconic',
            live: 'https://github.com/Ashconic',
            tags: ['Python', 'Vapi AI', 'Ngrok', 'JavaScript', 'APIs'],
            icon: Server,
            visType: 'telemetry',
            hudTitle: 'API_TELEMETRY_STREAM',
            video: '/videos/ai voice assistant.mp4'
        },
        {
            title: 'AI Automated Navigation Robot',
            category: 'AUTONOMOUS SYSTEMS',
            rgb: '239, 68, 68',
            rgbAlt: '249, 115, 22',
            rgbAlt2: '236, 72, 153',
            facts: ['[BOT: PATHFINDER_V1]', '[MODEL: AUTO_NAV_AI]', '[SYS: COLLISION_AVOID]', '[FREQ: 60hz_CONTROL]'],
            desc: 'Autonomous robotic pathfinder utilizing artificial neural network navigation models to map surrounding obstacles, construct search nodes, and execute real-time collision avoidance paths.',
            github: 'https://github.com/Ashconic',
            live: 'https://github.com/Ashconic',
            tags: ['Robotics', 'Pathfinding', 'AI Navigation', 'Python', 'ML'],
            icon: Cpu,
            visType: 'neural',
            hudTitle: 'ROBOT_PATHFINDER_CORE',
            image: '/videos/ANR1.jpeg'
        },
        {
            title: 'ML Spam & SMS Classifier',
            category: 'MACHINE LEARNING & NLP',
            rgb: '34, 197, 94',
            rgbAlt: '6, 182, 212',
            rgbAlt2: '234, 179, 8',
            facts: ['[MODEL: NAIVE_BAYES]', '[VEC: TF-IDF_FEATURE]', '[STEM: NLTK_PORTER]', '[DEPLOY: STREAMLIT]'],
            desc: 'Text preprocessing pipeline and spam classifier utilizing NLTK stemming filters, TF-IDF vectorization, and Naive Bayes ML models, deployed under a custom interactive Streamlit UI dashboard.',
            github: 'https://github.com/Ashconic',
            live: 'https://github.com/Ashconic',
            tags: ['scikit-learn', 'Streamlit', 'nltk', 'Naive Bayes', 'NLP'],
            icon: RefreshCw,
            visType: 'docker',
            hudTitle: 'SPAM_SORTING_ORCHESTRATOR',
            video: '/videos/emailclassify.mp4'
        },
        {
            title: 'n8n Workflow Automation',
            category: 'INTEGRATIONS & WORKFLOWS',
            rgb: '249, 115, 22',
            rgbAlt: '239, 68, 68',
            rgbAlt2: '236, 72, 153',
            facts: ['[ENGINE: N8N_SELF_HOSTED]', '[FLOW: EVENT_DRIVEN]', '[NODE: WEBHOOK_ROUTING]', '[STATUS: ACTIVE]'],
            desc: 'Self-hosted workflow orchestration engine connecting webhook triggers, web scraping scripts, data transforms, and instant email alert channels in a robust, automated n8n pipeline node network.',
            github: 'https://github.com/Ashconic',
            live: 'https://github.com/Ashconic',
            tags: ['n8n', 'Self-Hosted', 'Docker', 'Automation', 'APIs'],
            icon: RefreshCw,
            visType: 'docker',
            hudTitle: 'N8N_AUTOMATION_PIPELINE',
            image: '/videos/n8n.png'
        }
    ];

    // Scroll calculations
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const totalHeight = rect.height;
            const scrolled = -rect.top;
            const scrollableDistance = totalHeight - windowHeight;
            
            let rawProgress = scrolled / scrollableDistance;
            rawProgress = Math.max(0, Math.min(1, rawProgress));
            
            // Calculate snap plateau so that cards pause centered longer
            const x = rawProgress * (projects.length - 1);
            const base = Math.floor(x);
            const fract = x - base;
            
            let snappedFract = fract;
            if (fract < 0.47) {
                snappedFract = 0;
            } else if (fract > 0.53) {
                snappedFract = 1;
            } else {
                // Map transition range smoothly (middle 6% of scroll distance)
                const t = (fract - 0.47) / 0.06;
                snappedFract = t * t * (3 - 2 * t);
            }
            
            const snappedX = base + snappedFract;
            const snappedProgress = snappedX / (projects.length - 1);
            
            targetProgressRef.current = snappedProgress;
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lerp momentum ticks loop
    useEffect(() => {
        let animId;
        let frameCount = 0;
        
        const tick = () => {
            frameCount++;
            const diff = targetProgressRef.current - currentProgressRef.current;
            
            if (Math.abs(diff) > 0.0001) {
                currentProgressRef.current += diff * 0.22; // Instant catch up rate to keep cards centered immediately (was 0.14)
                setScrollProgress(currentProgressRef.current);
            } else if (currentProgressRef.current !== targetProgressRef.current) {
                currentProgressRef.current = targetProgressRef.current;
                setScrollProgress(currentProgressRef.current);
            }
            
            // Cursor Trailer physics lerp loops
            projects.forEach((proj, idx) => {
                const physics = trailerPhysicsRef.current[idx];
                const trailerEl = trailerRefs.current[idx];
                if (!physics || !trailerEl) return;
                
                // Show/hide based on active state and button hover
                const showTrailer = physics.active && !physics.buttonHovered;
                trailerEl.style.opacity = showTrailer ? '1' : '0';
                trailerEl.style.scale = showTrailer ? '1' : '0.68';

                if (physics.active) {
                    if (physics.currentX === 0 && physics.currentY === 0) {
                        physics.currentX = physics.targetX;
                        physics.currentY = physics.targetY;
                    }
                    
                    const dx = physics.targetX - physics.currentX;
                    const dy = physics.targetY - physics.currentY;
                    
                    physics.currentX += dx * 0.14;
                    physics.currentY += dy * 0.14;
                    
                    const tilt = Math.max(-20, Math.min(20, dx * 0.22));
                    
                    trailerEl.style.transform = `translate3d(${physics.currentX}px, ${physics.currentY}px, 0) rotate(${tilt}deg) translate(-50%, -50%)`;
                } else {
                    const targetX = dimensions.cardWidth / 2;
                    const targetY = 200;
                    const dx = targetX - physics.currentX;
                    const dy = targetY - physics.currentY;
                    
                    physics.currentX += dx * 0.12;
                    physics.currentY += dy * 0.12;
                    
                    trailerEl.style.transform = `translate3d(${physics.currentX}px, ${physics.currentY}px, 0) rotate(0deg) translate(-50%, -50%)`;
                }

                // High-performance Specs Switcher
                if (proj.facts) {
                    const factIdx = Math.floor(frameCount / 100) % proj.facts.length;
                    const currentFact = proj.facts[factIdx];
                    const titleEl = trailerTitleRefs.current[idx];
                    if (titleEl && titleEl.textContent !== currentFact) {
                        titleEl.textContent = currentFact;
                        titleEl.style.color = '#ffffff';
                        titleEl.style.textShadow = `0 0 8px rgba(${proj.rgb}, 0.8)`;
                        setTimeout(() => {
                            if (titleEl) {
                                titleEl.style.color = 'var(--text-primary)';
                                titleEl.style.textShadow = 'none';
                            }
                        }, 150);
                    }
                }
            });
            
            animId = requestAnimationFrame(tick);
        };
        
        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, [dimensions]);

    // Canvas animation loops
    useEffect(() => {
        let animId;
        let frame = 0;

        const drawLoop = () => {
            frame++;

            projects.forEach((proj, idx) => {
                const canvas = canvasesRef.current[idx];
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                
                if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
                    canvas.width = canvas.offsetWidth || 400;
                    canvas.height = canvas.offsetHeight || 220;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (proj.visType === 'neural') {
                    const nodes = [
                        [30, 70, 110, 150, 190],
                        [60, 100, 140, 180],
                        [90, 130, 170]
                    ];
                    const layersX = [80, 200, 320];
                    ctx.lineWidth = 1;
                    for (let i = 0; i < nodes.length - 1; i++) {
                        const x1 = layersX[i];
                        const x2 = layersX[i+1];
                        for (let y1 of nodes[i]) {
                            for (let y2 of nodes[i+1]) {
                                const pulsePos = (frame * 0.025 + y1 * 0.05) % 1.0;
                                ctx.strokeStyle = `rgba(${proj.rgb}, 0.12)`;
                                ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
                                ctx.fillStyle = `rgba(${proj.rgb}, 0.8)`;
                                ctx.beginPath();
                                ctx.arc(x1 + (x2 - x1) * pulsePos, y1 + (y2 - y1) * pulsePos, 1.8, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }
                    }
                    for (let i = 0; i < nodes.length; i++) {
                        const x = layersX[i];
                        for (let y of nodes[i]) {
                            ctx.fillStyle = '#080809';
                            ctx.strokeStyle = `rgba(${proj.rgb}, 0.85)`;
                            ctx.lineWidth = 1.8;
                            ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                        }
                    }
                } else if (proj.visType === 'telemetry') {
                    ctx.strokeStyle = `rgba(${proj.rgb}, 0.85)`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    const points = [];
                    const steps = 25;
                    const stepWidth = canvas.width / steps;
                    for (let i = 0; i <= steps; i++) {
                        const x = i * stepWidth;
                        const y = Math.sin(i * 0.45 - frame * 0.12) * 35 +
                                  Math.cos(i * 0.8 + frame * 0.06) * 12 + 110;
                        points.push({ x, y });
                    }
                    ctx.moveTo(points[0].x, points[0].y);
                    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
                    ctx.stroke();

                    const fillGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                    fillGrad.addColorStop(0, `rgba(${proj.rgb}, 0.12)`);
                    fillGrad.addColorStop(1, 'rgba(0,0,0,0)');
                    ctx.fillStyle = fillGrad;
                    ctx.lineTo(canvas.width, canvas.height);
                    ctx.lineTo(0, canvas.height);
                    ctx.closePath(); ctx.fill();
                } else if (proj.visType === 'vision') {
                    const cx = canvas.width / 2;
                    const cy = canvas.height / 2;
                    const scale = Math.sin(frame * 0.02) * 4 + 60;
                    ctx.strokeStyle = `rgba(${proj.rgb}, 0.35)`;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(cx - scale, cy - scale, scale * 2, scale * 2);

                    ctx.strokeStyle = `rgb(${proj.rgb})`;
                    ctx.lineWidth = 2.5;
                    const bL = 12;
                    ctx.beginPath();
                    ctx.moveTo(cx - scale, cy - scale + bL); ctx.lineTo(cx - scale, cy - scale); ctx.lineTo(cx - scale + bL, cy - scale);
                    ctx.moveTo(cx + scale, cy - scale + bL); ctx.lineTo(cx + scale, cy - scale); ctx.lineTo(cx + scale - bL, cy - scale);
                    ctx.moveTo(cx - scale, cy + scale - bL); ctx.lineTo(cx - scale, cy + scale); ctx.lineTo(cx - scale + bL, cy + scale);
                    ctx.moveTo(cx + scale, cy + scale - bL); ctx.lineTo(cx + scale, cy + scale); ctx.lineTo(cx + scale - bL, cy + scale);
                    ctx.stroke();

                    const scanY = cy - scale + ((frame * 1.2) % (scale * 2));
                    ctx.strokeStyle = `rgba(${proj.rgb}, 0.5)`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath(); ctx.moveTo(cx - scale, scanY); ctx.lineTo(cx + scale, scanY); ctx.stroke();
                } else if (proj.visType === 'rag') {
                    const cx = canvas.width / 2;
                    const cy = canvas.height / 2;
                    ctx.fillStyle = '#080809';
                    ctx.strokeStyle = `rgb(${proj.rgb})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                    ctx.fillStyle = `rgb(${proj.rgb})`;
                    ctx.font = '700 8px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText('RAG_DB', cx, cy + 3);

                    const sources = 5;
                    for (let i = 0; i < sources; i++) {
                        const angle = (i * Math.PI * 2 / sources) + (frame * 0.006);
                        const sx = cx + Math.cos(angle) * 65;
                        const sy = cy + Math.sin(angle) * 65;
                        ctx.strokeStyle = `rgba(${proj.rgb}, 0.2)`;
                        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(sx, sy); ctx.stroke();
                        const p = (frame * 0.012 + i * 0.2) % 1.0;
                        ctx.fillStyle = `rgb(${proj.rgb})`;
                        ctx.beginPath(); ctx.arc(sx + (cx - sx) * p, sy + (cy - sy) * p, 2, 0, Math.PI * 2); ctx.fill();
                    }
                } else if (proj.visType === 'docker') {
                    const cx = canvas.width / 2;
                    const cy = canvas.height / 2;
                    const clusters = [
                        { x: cx - 90, label: 'SPAM' },
                        { x: cx, label: 'FILTER' },
                        { x: cx + 90, label: 'HAM_INBOX' }
                    ];
                    for (let node of clusters) {
                        const isActive = node.label === 'FILTER';
                        ctx.strokeStyle = `rgba(${proj.rgb}, ${isActive ? 0.35 + Math.sin(frame * 0.1) * 0.15 : 0.15})`;
                        ctx.lineWidth = 1.2;
                        ctx.strokeRect(node.x - 35, cy - 20, 70, 40);
                        ctx.fillStyle = '#080809';
                        ctx.fillRect(node.x - 34, cy - 19, 68, 38);
                        ctx.fillStyle = `rgba(${proj.rgb}, 0.85)`;
                        ctx.font = '700 6.5px monospace';
                        ctx.textAlign = 'center';
                        ctx.fillText(node.label, node.x, cy + 3);
                    }
                }
            });

            animId = requestAnimationFrame(drawLoop);
        };

        drawLoop();

        return () => cancelAnimationFrame(animId);
    }, []);

    const handleMouseMove = (e, idx) => {
        setIsHovered(true);
        const visualContainer = e.currentTarget;
        const card = visualContainer.closest('.projects-slider-card');
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

        if (trailerPhysicsRef.current[idx]) {
            const physics = trailerPhysicsRef.current[idx];
            physics.targetX = x;
            physics.targetY = y;
            physics.active = true;
        }
    };

    const handleMouseLeave = (e, idx) => {
        setIsHovered(false);
        const visualContainer = e.currentTarget;
        const card = visualContainer.closest('.projects-slider-card');
        if (card) {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        }

        if (trailerPhysicsRef.current[idx]) {
            trailerPhysicsRef.current[idx].active = false;
            trailerPhysicsRef.current[idx].buttonHovered = false; // Reset button hover state
        }
    };

    const handleButtonEnter = (idx) => {
        if (trailerPhysicsRef.current[idx]) {
            trailerPhysicsRef.current[idx].buttonHovered = true;
        }
    };

    const handleButtonLeave = (idx) => {
        if (trailerPhysicsRef.current[idx]) {
            trailerPhysicsRef.current[idx].buttonHovered = false;
        }
    };

    // Calculate dynamic styles for Horizontal focus animation
    const getCardStyles = (idx) => {
        const focalProgress = scrollProgress * (projects.length - 1);
        const diff = idx - focalProgress;
        const absDiff = Math.abs(diff);
        
        // Scale and opacity interpolation based on distance from focal center
        const scale = Math.max(0.88, 1 - absDiff * 0.12);
        const opacity = Math.max(0.25, 1 - absDiff * 0.65);
        
        return {
            transform: `scale(${scale})`,
            opacity: opacity,
            pointerEvents: absDiff < 0.5 ? 'auto' : 'none',
            zIndex: Math.round(10 - absDiff),
            transition: 'opacity 0.4s ease'
        };
    };

    const currentCardIdx = Math.min(projects.length - 1, Math.round(scrollProgress * (projects.length - 1)));
    const totalTranslation = (projects.length - 1) * (dimensions.cardWidth + dimensions.gap);
    const currentTranslation = scrollProgress * totalTranslation;

    return (
        <section className="projects-scroll-section" id="projects" ref={containerRef}>
            <div className="projects-sticky-container">
                {/* Standard Left-Aligned Header */}
                <div className="container" style={{ width: '100%', marginBottom: '1rem', textAlign: 'left' }}>
                    <h2 className="section-title reveal-on-scroll" data-subtitle="Featured Works">My Projects</h2>
                </div>


                {/* Horizontal track view container */}
                <div className="projects-viewport-mask" ref={maskRef} data-lenis-prevent={window.innerWidth >= 1024 ? "true" : undefined} style={{ position: 'relative' }}>
                    
                    {/* Retro cloud API sync loading layer */}
                    {(!hasFetched || isFetching) && (
                        <div className={`projects-loader-overlay ${!isFetching ? 'fade-out' : ''}`}>
                            <div className="projects-loader-spinner-wrapper">
                                <div className="projects-loader-pulse-ring" />
                                <div className="projects-loader-text-status monospace">
                                    {loaderText}
                                </div>
                            </div>
                        </div>
                    )}

                    <div 
                        ref={trackRef}
                        className="projects-slider-track"
                        style={{
                            paddingLeft: `${dimensions.padding}px`,
                            paddingRight: `${dimensions.padding}px`,
                            transform: `translate3d(-${currentTranslation}px, 0, 0)`
                        }}
                    >
                        {projects.map((proj, idx) => {
                            const ProjectIcon = proj.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`projects-slider-card glass-card horizontal-card ${idx === currentCardIdx ? 'active-card' : ''}`}
                                    style={{
                                        ...getCardStyles(idx),
                                        '--status-rgb': proj.rgb,
                                        '--status-rgb-alt': proj.rgbAlt,
                                        '--status-rgb-alt2': proj.rgbAlt2
                                    }}
                                >
                                    <div className="card-shine" />
                                    <div className="project-backdrop-glow"></div>
                                    <div className="card-smoke-container">
                                        <div className="smoke-blob smoke-1" />
                                        <div className="smoke-blob smoke-2" />
                                        <div className="smoke-blob smoke-3" />
                                    </div>
                                    
                                    {/* Floating Glass Cursor Trailer Badge */}
                                    <div className="card-cursor-trailer" ref={el => trailerRefs.current[idx] = el}>
                                        <div className="trailer-status-dot" style={{ background: `rgb(${proj.rgb})`, boxShadow: `0 0 10px rgba(${proj.rgb}, 0.8)` }} />
                                        <div className="trailer-icon-box" style={{ color: `rgb(${proj.rgb})` }}>
                                            <ProjectIcon size={14} />
                                        </div>
                                        <div className="trailer-meta monospace">
                                            <span className="trailer-title" ref={el => trailerTitleRefs.current[idx] = el}>
                                                {proj.facts ? proj.facts[0] : ''}
                                            </span>
                                            <span className="trailer-log">STATUS: ACTIVE</span>
                                        </div>
                                    </div>

                                    {/* Left Side: Live visual simulation */}
                                    <div 
                                        className="project-card-visual"
                                        onMouseMove={(e) => handleMouseMove(e, idx)}
                                        onMouseLeave={(e) => handleMouseLeave(e, idx)}
                                    >
                                        <div className="visual-hud monospace">
                                            <span>{proj.hudTitle || 'LIVE_SIMULATOR_CORE'}</span>
                                            <span className="pulse-dot text-green">●</span>
                                        </div>
                                        {proj.video ? (
                                            <video
                                                src={proj.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="project-visual-video"
                                            />
                                        ) : proj.image ? (
                                            <img
                                                src={proj.image}
                                                alt={proj.title}
                                                className="project-visual-image"
                                            />
                                        ) : (
                                            <canvas
                                                ref={(el) => (canvasesRef.current[idx] = el)}
                                                className="project-visual-canvas"
                                            />
                                        )}
                                    </div>

                                    {/* Right Side: Details and parameters */}
                                    <div className="project-card-details">
                                        <div className="details-header" style={{ transform: 'translateZ(25px)' }}>
                                            <span className="details-category monospace">{proj.category}</span>
                                            <div className="details-icon-box">
                                                <ProjectIcon size={14} />
                                            </div>
                                        </div>

                                        <h3 className="details-title monospace" style={{ transform: 'translateZ(25px)' }}>
                                            {proj.title}
                                        </h3>
                                        
                                        <p className="details-desc" style={{ transform: 'translateZ(20px)' }}>
                                            {proj.desc}
                                        </p>

                                        <div className="details-tags" style={{ transform: 'translateZ(15px)' }}>
                                            {proj.tags.map((t, tIdx) => (
                                                <span key={tIdx} className="project-tag-badge monospace">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="details-actions" style={{ transform: 'translateZ(10px)' }}>
                                            <a 
                                                href="https://github.com/Ashconic"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="details-btn live monospace"
                                                style={{ width: '100%', justifyContent: 'center' }}
                                                onMouseEnter={() => handleButtonEnter(idx)}
                                                onMouseLeave={() => handleButtonLeave(idx)}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                                View Project
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>
        </section>
    );
}
