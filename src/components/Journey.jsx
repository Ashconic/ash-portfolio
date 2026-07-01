import { useEffect, useRef } from 'react';
import { Shield, Sword } from 'lucide-react';

export default function Journey() {
    const timelineRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current || !lineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const totalHeight = rect.height;
                const scrollProgress = (windowHeight - rect.top) / (totalHeight + windowHeight * 0.4);
                const percent = Math.min(Math.max(scrollProgress * 100, 0), 100);
                lineRef.current.style.height = `${percent}%`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const timelineItems = [
        {
            time: '08:00 AM',
            status: 'booting',
            systemClass: 'BIOLOGICAL_LOAD',
            rgb: '249, 115, 22',
            title: 'System Boot & Coffee',
            subtitle: 'Caffeine Injection & Mail Triage',
            objective: 'Initialize biological systems, parse global pipeline telemetry notifications, and plan active sprint tasks.',
            conquests: [
                { type: 'OK', text: 'caffeine_infusion: +80% core focus boost' },
                { type: 'DONE', text: 'git_triage: cleared inbound pull request queues' },
                { type: 'OK', text: 'workspace_sync: local files matches remote origin' }
            ],
            gear: ['Coffee', 'GitHub', 'Slack', 'Terminal'],
            wavePath: 'M0,10 L10,10 L15,2 L20,18 L25,10 L45,10 L50,15 L55,5 L60,10 L100,10'
        },
        {
            time: '10:00 AM',
            status: 'training',
            systemClass: 'ACADEMIC_HUD',
            rgb: '239, 68, 68',
            title: 'Academic Lectures & CV Labs',
            subtitle: 'Machine Learning & Core Algorithms',
            objective: 'Attend university classes, solve computer vision lab assignments, and analyze dataset math formulas.',
            conquests: [
                { type: 'OK', text: 'class_attendance: completed advanced math lectures' },
                { type: 'DONE', text: 'cv_lab: implemented edge-detection filters using OpenCV' },
                { type: 'OK', text: 'coursework: submitted weekly algorithm analysis sheets' }
            ],
            gear: ['OpenCV', 'Jupyter Notebooks', 'MATLAB', 'Slides'],
            wavePath: 'M0,10 L5,10 L7,2 L9,18 L12,10 L25,10 L28,0 L31,20 L35,10 L70,10 L73,2 L76,18 L80,10 L100,10'
        },
        {
            time: '01:00 PM',
            status: 'coding',
            systemClass: 'PROJECT_RUNNER',
            rgb: '59, 130, 246',
            title: 'Collaborative Group Projects',
            subtitle: 'Building Smart Web Applications',
            objective: 'Write code for senior year web projects, coordinate repository branches with teammates, and test interface layouts.',
            conquests: [
                { type: 'OK', text: 'frontend_assembly: aligned layout cards with Figma mocks' },
                { type: 'DONE', text: 'git_merge: resolved team repository conflict loops' },
                { type: 'OK', text: 'local_server: mock endpoints responding with status 200' }
            ],
            gear: ['React', 'Git', 'VS Code', 'Tailwind CSS'],
            wavePath: 'M0,10 C15,2 15,18 30,10 C45,2 45,18 60,10 C75,2 75,18 90,10 L100,10'
        },
        {
            time: '04:00 PM',
            status: 'scaling',
            systemClass: 'INDEPENDENT_STUDY',
            rgb: '99, 102, 241',
            title: 'Independent AI Experiments',
            subtitle: 'Model Training & Local LLM Fine-Tuning',
            objective: 'Train custom neural network weights, set up RAG search modules, and run local model test loops.',
            conquests: [
                { type: 'RUN', text: 'epoch_optimizer: training weights (loss converging to 0.02)' },
                { type: 'DONE', text: 'local_rag: configured vector store for document indexing' },
                { type: 'OK', text: 'weights_check: serialized model checkpoint parameters' }
            ],
            gear: ['PyTorch', 'CUDA', 'Ollama', 'Python'],
            wavePath: 'M0,10 L20,10 L20,2 L40,2 L40,18 L60,18 L60,10 L100,10'
        },
        {
            time: '07:00 PM',
            status: 'gaming',
            systemClass: 'RECREATION_QUEST',
            rgb: '34, 197, 94',
            title: 'Gaming & Social Hangouts',
            subtitle: 'Multiplayer Lobby & Steam Achievements',
            objective: 'Connect with friends on Discord, play competitive match rounds, and unwind from a long day of lectures.',
            conquests: [
                { type: 'DONE', text: 'lobby_connect: gathered 5-player squad on Discord' },
                { type: 'OK', text: 'steam_grind: unlocked legendary rank tier badges' },
                { type: 'OK', text: 'high_score: registered positive K/D ratio in matches' }
            ],
            gear: ['Discord', 'Steam', 'Headset', 'Localhost'],
            wavePath: 'M0,10 L15,10 L20,0 L25,20 L30,10 L50,10 L55,2 L60,18 L65,10 L100,10'
        },
        {
            time: '11:00 PM',
            status: 'recharging',
            systemClass: 'CELLULAR_RECOVERY',
            rgb: '6, 182, 212',
            title: 'Deep Sleep Mode',
            subtitle: 'Neural Defragmentation & Recovery',
            objective: 'Shutdown system threads, garbage collect daily memory cache, and reload biological energy cells.',
            conquests: [
                { type: 'DONE', text: 'biological_recharge: triggered deep REM cycle' },
                { type: 'OK', text: 'synaptic_compile: defragmented daily learnings' },
                { type: 'OK', text: 'cron_timer: scheduled wakeup trigger for 08:00 AM' }
            ],
            gear: ['Sleep', 'Dreams', 'Biological Recharge'],
            wavePath: 'M0,10 C20,5 30,5 50,10 C70,15 80,15 100,10'
        }
    ];

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${pctX}%`);
        card.style.setProperty('--mouse-y', `${pctY}%`);
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    };

    return (
        <section className="section journey-section" id="journey">
            <div className="container">
                <h2 className="section-title reveal-on-scroll" data-subtitle="Daily Telemetry">Day in the Life</h2>
                
                <div className="timeline-container" ref={timelineRef}>
                    <div className="timeline-line" ref={lineRef} id="timelineLine"></div>
                    
                    {timelineItems.map((item, index) => (
                        <div key={index} className="timeline-item reveal-on-scroll">
                            {/* Marker acts as the Clock Node */}
                            <div className={`timeline-marker clock-marker monospace ${item.status}`}>
                                {item.time}
                            </div>
                            
                            {/* Quest Details Panel with 3D Parallax */}
                            <div 
                                className="timeline-content glass-card quest-card"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    '--status-rgb': item.rgb
                                }}
                            >
                                <div className="quest-header" style={{ transform: 'translateZ(25px)' }}>
                                    <span className="quest-date monospace">{item.systemClass}</span>
                                    <span className={`quest-status-badge monospace ${item.status}`}>
                                        {item.status}
                                    </span>
                                </div>
                                
                                <h3 className="timeline-title quest-title monospace" style={{ transform: 'translateZ(25px)' }}>
                                    {item.title}
                                </h3>
                                <h4 className="timeline-company quest-company" style={{ transform: 'translateZ(20px)' }}>
                                    {item.subtitle}
                                </h4>
                                
                                <div className="quest-section" style={{ transform: 'translateZ(15px)' }}>
                                    <div className="quest-section-header monospace">
                                        <Shield size={12} /> Primary Objective
                                    </div>
                                    <p className="timeline-desc quest-desc">{item.objective}</p>
                                </div>
                                
                                <div className="quest-section" style={{ transform: 'translateZ(15px)' }}>
                                    <div className="quest-section-header monospace">
                                        <Sword size={12} /> Diagnostic Logs
                                    </div>
                                    <ul className="quest-conquests-list">
                                        {item.conquests.map((c, cIdx) => (
                                            <li key={cIdx} className="conquest-item">
                                                <span className={`conquest-bullet-diagnostics monospace ${c.type.toLowerCase()}`}>
                                                    [{c.type}]
                                                </span>
                                                <span className="conquest-text-diagnostics monospace">{c.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="quest-section rewards-section" style={{ transform: 'translateZ(10px)' }}>
                                    <div className="quest-section-header monospace">
                                        Active Gear
                                    </div>
                                    <div className="quest-loot-badges">
                                        {item.gear.map((g, lIdx) => (
                                            <span key={lIdx} className="loot-badge monospace">
                                                {g}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Live Bouncing Telemetry Waveform */}
                                <div className="quest-section-waveform" style={{ transform: 'translateZ(12px)' }}>
                                    <div className="waveform-label monospace">SYS_TELEMETRY_STREAM</div>
                                    <svg className="telemetry-waveform" viewBox="0 0 100 20" preserveAspectRatio="none">
                                        <path d={item.wavePath} className="waveform-line" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
