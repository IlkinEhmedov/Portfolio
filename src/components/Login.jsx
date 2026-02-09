import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import '../assets/styles/Login.scss';
import { useNavigate } from 'react-router';
const users = import.meta.env.VITE_USERS
const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate loading delay
        setTimeout(() => {
            // Find user in JSON data
            const user = JSON.parse(users).find(
                u => u.email === formData.email && u.password === formData.password
            );

            if (user) {
                // Login successful
                sessionStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard')
            } else {
                // Login failed
                setError('Invalid email or password');
            }

            setLoading(false);
        }, 1000);
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-circle">
                        <FiLock className="logo-icon" />
                    </div>
                    <h1>Portfolio Management</h1>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-groups">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-groups">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <FiLock className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                                disabled={loading}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-login"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="login-spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p className="demo-info">
                        <FiAlertCircle /> You can manage your portfolio projects here
                    </p>
                </div>
            </div>

            {/* Background decoration */}
            <div className="bg-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
        </div>
    );
};

export default Login;