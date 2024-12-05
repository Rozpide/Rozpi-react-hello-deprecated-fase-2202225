import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ContactUs = props => {
    const { store, actions } = useContext(Context);
    
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null);  // Success or error message
    const [loading, setLoading] = useState(false);  // Loading state for submit button

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Show loading state
        setLoading(true);
        setStatus(null);  // Reset previous status

        try {
            // Send the email and message to the Flask backend
            const response = await fetch("https://zany-succotash-575jwp946j4f77gr-3001.app.github.dev/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, message }),
            });

            const result = await response.json();

            if (response.ok) {
                // Success message
                setStatus({ success: true, message: 'Your message has been sent successfully!' });
                setEmail('');  // Reset form fields
                setMessage('');
            } else {
                // Error message
                setStatus({ success: false, message: result.message || 'Failed to send the message. Please try again later.' });
            }
        } catch (error) {
            // Error handling (network issues, etc.)
            setStatus({ success: false, message: 'An error occurred. Please try again later.' });
        } finally {
            // Hide loading state
            setLoading(false);
        }
    };

    return (
        <div id="modal" className="contact modal" style={{ display: store.showContactModal ? "block" : "none" }}>
            <div className="abc modal-dialog">
                <div className="modal-content" style={{ backgroundColor: "silver", border: "none" }}>
                    <span type="submit" className="close" id="closeModal" onClick={() => actions.setShowContactModal()} style={{ height: "5px" }}>&times;</span>
                    <h2 style={{ margin: "auto", marginTop: "0px", color: "#39ff14", backgroundColor: "silver" }}>Contact Us</h2>

                    {/* Display success or error message */}
                    {status && (
                        <div style={{
                            backgroundColor: status.success ? '#d4edda' : '#f8d7da',
                            color: status.success ? '#155724' : '#721c24',
                            padding: '10px',
                            borderRadius: '5px',
                            marginBottom: '20px'
                        }}>
                            {status.message}
                        </div>
                    )}

                    <form id="contactForm" onSubmit={handleSubmit} method="POST">
                        <label htmlFor="email" style={{}}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                marginBottom: "10px",
                                height: "40px",
                                width: "100%",
                                borderRadius: "10px",
                                border: "none"
                            }}
                        />

                        <label htmlFor="message">Message:</label>
                        <textarea
                            className="text"
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            style={{
                                marginBottom: "10px",
                                width: "100%",
                                borderRadius: "10px",
                                border: "none"
                            }}
                        ></textarea>

                        <button
                            type="submit"
                            id="submitBtn"
                            style={{
                                backgroundColor: "#39ff14",
                                borderRadius: "5px",
                                height: "38px",
                                width: "90px",
                                border: "1px solid black"
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
