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
        <div
    id="modal"
    className="contact-modal"
    style={{ display: store.showContactModal ? "block" : "none" }}
>
    <div className="modal-dialog">
        <div className="modal-content" style={{backgroundColor:"silver", width:"40vw"}}>
            <button
                type="button"
                className="close"
                id="closeModal"
                onClick={() => actions.setShowContactModal()}
            >
                &times;
            </button>
            <h2 className="modal-header">Contact Us</h2>

            {/* Display success or error message */}
            {status && (
                <div
                    className={`alert ${status.success ? "alert-success" : "alert-error"}`}
                >
                    {status.message}
                </div>
            )}

            <form id="contactForm" onSubmit={handleSubmit} method="POST">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    rows="7"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>

                <button type="submit" id="submitBtn" disabled={loading}>
                    {loading ? "Sending..." : "Submit"}
                </button>
            </form>
        </div>
    </div>
        </div>

            );
};
