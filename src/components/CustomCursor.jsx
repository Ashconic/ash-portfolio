import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;
        let isMouseActive = false;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isMouseActive) {
                document.body.classList.add('mouse-active');
                isMouseActive = true;
            }
        };

        const onMouseOver = (e) => {
            if (!e.target || typeof e.target.closest !== 'function') return;

            const isNameTrigger = e.target.closest('.name-trigger');
            const isHoverable = e.target.closest('a, button, .reveal-trigger, .social-btn, .project-btn, .back-to-top, .contact-logo-trigger-wrapper');
            
            cursorRef.current?.classList.remove('hovering', 'hovering-large');
            followerRef.current?.classList.remove('hovering', 'hovering-large');

            if (isNameTrigger) {
                cursorRef.current?.classList.add('hovering-large');
                followerRef.current?.classList.add('hovering-large');
            } else if (isHoverable) {
                cursorRef.current?.classList.add('hovering');
                followerRef.current?.classList.add('hovering');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);

        let animationFrameId;
        const updatePositions = () => {
            // Direct follow for central dot
            cursorX += (mouseX - cursorX) * 0.3;
            cursorY += (mouseY - cursorY) * 0.3;
            if (cursorRef.current) {
                cursorRef.current.style.left = `${cursorX}px`;
                cursorRef.current.style.top = `${cursorY}px`;
            }

            // Lerped/Damped follow for outer ring
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            if (followerRef.current) {
                followerRef.current.style.left = `${followerX}px`;
                followerRef.current.style.top = `${followerY}px`;
            }

            animationFrameId = requestAnimationFrame(updatePositions);
        };
        updatePositions();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(animationFrameId);
            document.body.classList.remove('mouse-active');
        };
    }, []);

    return (
        <>
            <div className="custom-cursor" ref={cursorRef} id="customCursor"></div>
            <div className="custom-cursor-follower" ref={followerRef} id="cursorFollower"></div>
        </>
    );
}
