import { useEffect, useRef, useState } from 'react';
import { Gamepad2, X, Play, RotateCcw } from 'lucide-react';

export default function AIFlappyGame({ isOpen, onClose }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    
    // Telemetry DOM Refs for high-performance direct text updates (60fps no-render)
    const stateValRef = useRef(null);
    const actionValRef = useRef(null);
    const speedValRef = useRef(null);
    const distValRef = useRef(null);
    const lossValRef = useRef(null);
    const motivationValRef = useRef(null);

    const motivations = [
        "Gate Cleared! Keep going!",
        "Synaptic efficiency increasing!",
        "Flawless propulsion burst!",
        "Perfect height interpolation!",
        "Objective secured. Dodge next core!",
        "Genetic mutation progressing!",
        "Excellent vector speed control!",
        "Drive parameters optimal!",
        "Synapse node bypassed!",
        "Unstoppable vector flight!",
        "Holographic telemetry locked!",
        "Superb timing! Carry on!"
    ];

    const triggerMotivation = (gateNumber) => {
        const idx = Math.floor(Math.random() * motivations.length);
        const textMsg = motivations[idx];
        
        if (motivationValRef.current) {
            motivationValRef.current.textContent = `"${textMsg}"`;
            motivationValRef.current.style.color = '#34d399'; // green-400 flash
            motivationValRef.current.style.textShadow = '0 0 15px rgba(52, 211, 153, 0.6)';
            setTimeout(() => {
                if (motivationValRef.current) {
                    motivationValRef.current.style.color = 'var(--text-cyan)'; // Reset to standard cyan
                    motivationValRef.current.style.textShadow = '0 0 10px rgba(6, 182, 212, 0.3)';
                }
            }, 500);
        }

        setMotivationHistory(prev => {
            const newEntry = { gateNum: gateNumber, text: textMsg };
            return [newEntry, ...prev].slice(0, 3); // Keep last 3 logs
        });
    };

    const [isPlaying, setIsPlaying] = useState(false);
    const [motivationHistory, setMotivationHistory] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOverMessage, setGameOverMessage] = useState('');

    // Game variables managed by refs to avoid React render lag during loop
    const gameState = useRef({
        birdY: 150,
        birdVelocity: 0,
        birdGravity: 0.18,
        birdJump: -4.2,
        birdRadius: 8,
        birdX: 60,
        
        pipes: [],
        pipeWidth: 44,
        pipeGap: 100,
        pipeSpeed: 1.8,
        pipeInterval: 140, // spawn new pipe every 140 frames
        frameCount: 0,
        
        canvasWidth: 380,
        canvasHeight: 320,
    });

    const isPlayingRef = useRef(false);
    const justFlapped = useRef(false);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Handle spacebar keydown listener globally when open
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevent page scroll
                triggerFlap();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('menu-lock');
            setIsPlaying(false);
            setScore(0);
            setGameOverMessage('');
            setMotivationHistory([]);
            
            // Fetch High Score from LocalStorage
            const savedHighScore = localStorage.getItem('neuroFlapHighScore');
            if (savedHighScore) {
                setHighScore(parseInt(savedHighScore, 10));
            }

            const handleResize = () => {
                if (canvasRef.current) {
                    const canvas = canvasRef.current;
                    const parentRect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : null;
                    const width = parentRect && parentRect.width > 32 ? parentRect.width - 2 : 380;
                    canvas.width = width;
                    canvas.height = 320;
                    gameState.current.canvasWidth = canvas.width;
                    gameState.current.canvasHeight = canvas.height;
                    
                    if (gameState.current.birdY > canvas.height) {
                        gameState.current.birdY = canvas.height / 2;
                    }
                    draw();
                }
            };

            // Init canvas size and variables once on opening
            resetGameVars();
            setTimeout(handleResize, 150);

            window.addEventListener('resize', handleResize);
            return () => {
                document.body.classList.remove('menu-lock');
                window.removeEventListener('resize', handleResize);
            };
        } else {
            document.body.classList.remove('menu-lock');
        }
    }, [isOpen]);

    const resetGameVars = () => {
        const state = gameState.current;
        state.birdY = state.canvasHeight / 2;
        state.birdVelocity = 0;
        state.pipes = [];
        state.frameCount = 0;
        // Spawn first pipe after 60 frames
        spawnPipe(state.canvasWidth + 50);
    };

    const spawnPipe = (startX) => {
        const state = gameState.current;
        const minHeight = 40;
        const maxHeight = state.canvasHeight - state.pipeGap - minHeight;
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
        
        state.pipes.push({
            x: startX,
            topHeight: topHeight,
            bottomHeight: state.canvasHeight - topHeight - state.pipeGap,
            passed: false
        });
    };

    const triggerFlap = () => {
        if (gameOverMessage) return;
        
        if (!isPlayingRef.current) {
            resetGame();
            return;
        }

        const state = gameState.current;
        state.birdVelocity = state.birdJump;
        justFlapped.current = true;
        
        // Brief visual flash on simulated synapse node trigger
        if (actionValRef.current) {
            actionValRef.current.textContent = '1 (FLAP)';
            actionValRef.current.className = 'tel-val monospace text-cyan pulsing-text';
            setTimeout(() => {
                if (actionValRef.current) {
                    actionValRef.current.textContent = '0 (GLIDE)';
                    actionValRef.current.className = 'tel-val monospace text-violet';
                }
            }, 180);
        }
    };

    const resetGame = () => {
        setScore(0);
        setGameOverMessage('');
        resetGameVars();
        setIsPlaying(true);
        setMotivationHistory([]);
        if (motivationValRef.current) {
            motivationValRef.current.textContent = '"Initialize flight vector. Dodge obstacles."';
            motivationValRef.current.style.color = 'var(--text-cyan)';
            motivationValRef.current.style.textShadow = '0 0 10px rgba(6, 182, 212, 0.3)';
        }
    };

    // Canvas Draw Loop
    const draw = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const state = gameState.current;

        // 1. Clear background
        ctx.fillStyle = '#080809';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Draw Vector grid lines (AI theme)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        const gridSpacing = 40;
        for (let x = 0; x < canvas.width; x += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // 3. Draw Pipes (Synapse Gates)
        state.pipes.forEach(pipe => {
            // Draw Top Pipe
            ctx.fillStyle = '#06b6d4'; // Cyan neon accent
            ctx.fillRect(pipe.x, 0, state.pipeWidth, pipe.topHeight);
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 1;
            ctx.strokeRect(pipe.x, 0, state.pipeWidth, pipe.topHeight);

            // Draw Bottom Pipe
            ctx.fillStyle = '#8b5cf6'; // Violet neon accent
            ctx.fillRect(pipe.x, state.canvasHeight - pipe.bottomHeight, state.pipeWidth, pipe.bottomHeight);
            ctx.strokeStyle = '#a78bfa';
            ctx.strokeRect(pipe.x, state.canvasHeight - pipe.bottomHeight, state.pipeWidth, pipe.bottomHeight);
        });

        // 4. Draw Bird (Neural Node)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(state.birdX, state.birdY, state.birdRadius, 0, Math.PI * 2);
        ctx.fill();

        // Outer glowing ring
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(state.birdX, state.birdY, state.birdRadius + 3, 0, Math.PI * 2);
        ctx.stroke();
    };

    // Main Game Loop Thread
    useEffect(() => {
        if (!isOpen) return;

        let frameId;

        const loop = () => {
            if (isPlayingRef.current) {
                updatePhysics();
                updateTelemetry();
            }
            draw();
            frameId = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(frameId);
    }, [isOpen]);

    const updatePhysics = () => {
        const state = gameState.current;

        // Apply gravity to velocity, and velocity to height
        state.birdVelocity += state.birdGravity;
        state.birdY += state.birdVelocity;

        // Ceiling/Floor Bounds Collisions
        if (state.birdY - state.birdRadius < 0) {
            state.birdY = state.birdRadius;
            state.birdVelocity = 0;
        } else if (state.birdY + state.birdRadius >= state.canvasHeight) {
            triggerGameOver('Network Deficit: Node Collision on Floor.');
            return;
        }

        // Move Pipes
        state.frameCount++;
        if (state.frameCount % state.pipeInterval === 0) {
            spawnPipe(state.canvasWidth + 20);
        }

        // Update pipes coordinate positions & filter off-screen ones
        state.pipes.forEach(pipe => {
            pipe.x -= state.pipeSpeed;

            // Score Increment on pass
            if (!pipe.passed && pipe.x + state.pipeWidth < state.birdX) {
                pipe.passed = true;
                setScore(prev => {
                    const next = prev + 1;
                    if (next > highScore) {
                        setHighScore(next);
                        localStorage.setItem('neuroFlapHighScore', next.toString());
                    }
                    triggerMotivation(next);
                    return next;
                });
            }

            // Pipe Collisions Detection
            const birdRight = state.birdX + state.birdRadius;
            const birdLeft = state.birdX - state.birdRadius;
            const birdTop = state.birdY - state.birdRadius;
            const birdBottom = state.birdY + state.birdRadius;

            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + state.pipeWidth;
            const pipeTopBound = pipe.topHeight;
            const pipeBottomBound = state.canvasHeight - pipe.bottomHeight;

            // Box Collision check
            if (birdRight >= pipeLeft && birdLeft <= pipeRight) {
                if (birdTop <= pipeTopBound || birdBottom >= pipeBottomBound) {
                    triggerGameOver('Agent Demise: Hit Synapse Obstacle.');
                }
            }
        });

        // Filter out pipes that scrolled off-screen
        state.pipes = state.pipes.filter(pipe => pipe.x + state.pipeWidth > 0);
    };

    const triggerGameOver = (msg) => {
        setGameOverMessage(msg);
        setIsPlaying(false);
        if (motivationValRef.current) {
            motivationValRef.current.textContent = '"Neural link severed. Recalibrating."';
            motivationValRef.current.style.color = 'var(--text-error)';
            motivationValRef.current.style.textShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
        }
    };

    // Direct DOM text writers for high-performance 60fps rendering
    const updateTelemetry = () => {
        const state = gameState.current;

        // Find next oncoming pipe
        const nextPipe = state.pipes.find(pipe => pipe.x + state.pipeWidth >= state.birdX);
        const nextPipeX = nextPipe ? Math.round(nextPipe.x - state.birdX) : 0;
        const gapCenterY = nextPipe ? Math.round(nextPipe.topHeight + state.pipeGap / 2) : 150;

        // 1. Update State Vector [birdY, nextPipeX, gapCenterY]
        if (stateValRef.current) {
            stateValRef.current.textContent = `[${Math.round(state.birdY)}, ${nextPipeX}, ${gapCenterY}]`;
        }

        // 2. Action Signal (handled in triggerFlap to show brief flash, falls back here)
        if (actionValRef.current && !justFlapped.current) {
            actionValRef.current.textContent = '0 (GLIDE)';
            actionValRef.current.className = 'tel-val monospace text-violet';
        }
        justFlapped.current = false;

        // 3. Current velocity speed
        if (speedValRef.current) {
            speedValRef.current.textContent = `${state.birdVelocity.toFixed(2)} px/f`;
        }

        // 4. Distance to next gate
        if (distValRef.current) {
            distValRef.current.textContent = `${nextPipeX}px`;
        }

        // 5. Mock Training Loss entropy
        if (lossValRef.current) {
            const lossVal = 0.05 + Math.random() * 0.02;
            lossValRef.current.textContent = lossVal.toFixed(4);
        }
    };

    const handleCanvasClick = (e) => {
        e.preventDefault();
        triggerFlap();
    };

    const handleCanvasTouch = (e) => {
        e.preventDefault();
        triggerFlap();
    };

    return (
        <div className={`chat-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="chat-drawer pong-drawer" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar-wrapper">
                            <Gamepad2 size={22} className="chat-avatar-icon" />
                            <span className="online-indicator"></span>
                        </div>
                        <div>
                            <h3>Neuro-Flap Simulator</h3>
                            <p>Manual Neural Node Flight • Live</p>
                        </div>
                    </div>
                    <button className="chat-close-btn" onClick={onClose} aria-label="Close Sandbox">
                        <X size={20} />
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="pong-container" ref={containerRef}>
                    
                    {/* Left Column: Game Area */}
                    <div className="pong-game-col">
                        {/* Score Panel */}
                        <div className="pong-scoreboard">
                            <div className="score-col">
                                <span className="score-label">SCORE</span>
                                <span className="score-num">{score}</span>
                            </div>
                            <div className="score-vs">|</div>
                            <div className="score-col">
                                <span className="score-label">HIGH SCORE</span>
                                <span className="score-num">{highScore}</span>
                            </div>
                        </div>

                        {/* HTML5 Interactive Canvas */}
                        <div className="canvas-wrapper">
                            <canvas 
                                ref={canvasRef} 
                                onMouseDown={handleCanvasClick}
                                onTouchStart={handleCanvasTouch}
                            />

                            {/* Game Start/Pause Overlay */}
                            {(!isPlaying || gameOverMessage) && (
                                <div className="canvas-overlay">
                                    {gameOverMessage ? (
                                        <div className="overlay-msg">
                                            <p className="game-over-title">Collision Detected</p>
                                            <p className="game-over-desc">{gameOverMessage}</p>
                                            <button onClick={resetGame} className="btn btn-primary start-game-btn">
                                                <RotateCcw size={16} />
                                                <span>Restart Node</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="overlay-msg">
                                            <p className="overlay-title">Synapse Runner v1.0</p>
                                            <p className="overlay-desc">Tap screen or press Spacebar to flap and jump. Avoid the synapse gates.</p>
                                            <button onClick={resetGame} className="btn btn-primary start-game-btn">
                                                <Play size={16} />
                                                <span>Initialize Flight</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="pong-controls">
                            <button className="btn btn-secondary control-btn" onClick={resetGame}>
                                <RotateCcw size={16} />
                                <span>Restart Simulation</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Instructions and Telemetry */}
                    <div className="pong-telemetry-col">
                        {/* Instructions */}
                        <div className="pong-difficulty-section">
                            <span className="section-label">Manual Vector Flight Controls:</span>
                            <div className="diff-tab active" style={{ cursor: 'default' }}>
                                <span className="tab-title">Spacebar or Mouse Click / Screen Tap</span>
                                <span className="tab-desc">Fires an upward propulsion pulse (FLAP) to override gravity. Dodge neon cyan/violet barriers.</span>
                            </div>
                        </div>

                        {/* Live AI Telemetry Panel */}
                        <div className="pong-telemetry-panel">
                            <span className="section-label">Neural Motivator:</span>
                            
                            {/* Large Central Highlight Display */}
                            <div className="central-motivation-card glass-card" style={{
                                margin: '1rem 0 0 0',
                                padding: '2.5rem 1.5rem',
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.01)',
                                border: '1px dashed rgba(6, 182, 212, 0.15)',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '140px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <span className="monospace" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                                    {isPlaying ? 'ACTIVE FLIGHT STREAM' : 'SYSTEM READY'}
                                </span>
                                <div 
                                    className="monospace font-black" 
                                    ref={motivationValRef}
                                    style={{
                                        fontSize: '1.25rem',
                                        color: 'var(--text-cyan)',
                                        lineHeight: '1.4',
                                        transition: 'all 0.3s ease',
                                        textShadow: '0 0 10px rgba(6, 182, 212, 0.3)'
                                    }}
                                >
                                    "Initialize flight vector. Dodge obstacles."
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
