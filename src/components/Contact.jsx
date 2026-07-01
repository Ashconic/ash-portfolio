import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ submitting: false, feedback: '', type: '' });
    const [selectedCategory, setSelectedCategory] = useState('General Query');
    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, feedback: '', type: '' });

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    access_key: "55f9e0b7-51eb-4004-bc92-14112b4e4133",
                    name: formData.name,
                    email: formData.email,
                    message: `[Topic: ${selectedCategory}]\n\n${formData.message}`,
                    subject: `New Collaboration Inquiry from ${formData.name}`
                })
            });

            const resData = await response.json();

            if (resData.success) {
                setStatus({
                    submitting: false,
                    feedback: 'Your message has been sent successfully. I will get back to you shortly.',
                    type: 'success'
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(resData.message || 'Submission failed');
            }
        } catch (error) {
            setStatus({
                submitting: false,
                feedback: 'Failed to send message. Please contact ashprof478@gmail.com directly.',
                type: 'error'
            });
        }
    };

    const categories = ['General Query', 'Full-Time Job', 'Freelance Project', 'Just to say Hi!'];

    return (
        <section className="section contact-section" id="contact" style={{ minHeight: '42vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
                {/* Logo & Social Links Core Container */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>
                    
                    {/* Pulsing Logo Trigger & Morphing Liquid Blob Background */}
                    <div 
                        className="contact-logo-trigger-wrapper reveal-on-scroll"
                        onClick={() => setModalOpen(true)}
                    >
                        {/* Layered fluid morphing light blobs */}
                        <div className="logo-fluid-blob blob-1"></div>
                        <div className="logo-fluid-blob blob-2"></div>

                        <img 
                            src="/LOGO_round.png" 
                            alt="Ashconic Logo" 
                            className="contact-logo-trigger"
                        />
                    </div>

                    {/* Social Logos Row */}
                    <div className="contact-social-logos reveal-on-scroll">
                        <a 
                            href="https://github.com/Ashconic" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-logo-icon-btn"
                            aria-label="GitHub"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/ashwin-kumar-v-093661302" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-logo-icon-btn"
                            aria-label="LinkedIn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    </div>
                </div>

                {/* Modal Backdrop & Form Container */}
                {modalOpen && (
                    <div className="contact-modal-backdrop" onClick={() => setModalOpen(false)}>
                        <div className="contact-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
                            <button 
                                className="modal-close-btn"
                                onClick={() => setModalOpen(false)}
                                aria-label="Close"
                            >
                                ✕
                            </button>

                            <div className="modal-form-wrapper">
                                <span className="info-subtitle">GET IN TOUCH</span>
                                <h2 className="info-title" style={{ fontSize: '1.85rem', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>Let's Collaborate.</h2>

                                {status.type === 'success' ? (
                                    /* Animated Success Screen */
                                    <div className="contact-success-screen" style={{ padding: '2rem 1rem 1rem' }}>
                                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                        </svg>
                                        <h3 className="success-title">Message Received</h3>
                                        <p className="success-message">
                                            Thank you for reaching out! I appreciate your message and will get back to you as soon as possible.
                                        </p>
                                        <button 
                                            type="button" 
                                            className="reset-btn-minimal"
                                            onClick={() => setStatus({ submitting: false, feedback: '', type: '' })}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                                        
                                        {/* Selector Chips */}
                                        <div className="chips-container">
                                            <span className="chips-title">Select Topic</span>
                                            <div className="chips-grid">
                                                {categories.map((cat) => (
                                                    <button
                                                        key={cat}
                                                        type="button"
                                                        className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                                                        onClick={() => setSelectedCategory(cat)}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="input-group-minimal">
                                            <label htmlFor="name" className="input-label-minimal">Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="input-field-minimal"
                                                placeholder="Enter your name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                autoComplete="name"
                                            />
                                        </div>

                                        <div className="input-group-minimal">
                                            <label htmlFor="email" className="input-label-minimal">Your Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="input-field-minimal"
                                                placeholder="Enter your email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                autoComplete="email"
                                            />
                                        </div>

                                        <div className="input-group-minimal">
                                            <label htmlFor="message" className="input-label-minimal">Your Message</label>
                                            <textarea
                                                id="message"
                                                className="input-field-minimal text-area-minimal"
                                                placeholder="Tell me about your project..."
                                                rows="4"
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="submit-btn-minimal"
                                            disabled={status.submitting}
                                        >
                                            {status.submitting ? (
                                                <>
                                                    <span>Sending Message...</span>
                                                    <Loader2 className="spinner-icon animate-spin" size={18} />
                                                </>
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <Send size={16} />
                                                </>
                                            )}
                                        </button>

                                        {status.feedback && (
                                            <div className={`form-status-banner ${status.type === 'success' ? 'success' : 'error'}`}>
                                                <span>{status.feedback}</span>
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
