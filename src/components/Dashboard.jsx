/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiX,
    FiCheck,
    FiAlertCircle
} from 'react-icons/fi';
import '../assets/styles/Dashboard.scss';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router';

const PortfolioDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        isComplete: false
    });

    const isAuthenticated = sessionStorage.getItem('isAuthenticated')

    const API_BASE_URL = import.meta.env.VITE_API_URL; // Change this to your API URL

    // Fetch all projects
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/portfolio`);
            const { data } = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    // Create new project
    const createProject = async () => {
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('isComplete', formData.isComplete);

            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const response = await fetch(`${API_BASE_URL}/portfolio`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                await fetchProjects();
                closeModal();
                toast.success('Project created successfully!');
            } else {
                throw new Error('Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    // Update project
    const updateProject = async () => {
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('isComplete', formData.isComplete);

            // Only append new image if a new file was selected
            if (formData.image && typeof formData.image !== 'string') {
                formDataToSend.append('image', formData.image);
            }

            const response = await fetch(`${API_BASE_URL}/portfolio/${editingProject._id}`, {
                method: 'PUT',
                body: formDataToSend,
            });

            if (response.ok) {
                await fetchProjects();
                closeModal();
                toast.success('Project updated successfully!');
            } else {
                throw new Error('Failed to update project');
            }
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error('Failed to update project');
        } finally {
            setLoading(false);
        }
    };

    // Delete project
    const deleteProject = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchProjects();
                setShowConfirmModal(false);
                toast.success('Project deleted successfully!');
            } else {
                throw new Error('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete project');
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        setConfirmAction({
            message: editingProject
                ? 'Are you sure you want to update this project?'
                : 'Are you sure you want to create this project?',
            onConfirm: editingProject ? updateProject : createProject
        });
        setShowConfirmModal(true);
    };

    // Open modal for creating new project
    const openCreateModal = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            image: null,
            isComplete: false
        });
        setImagePreview(null);
        setShowModal(true);
    };

    // Open modal for editing project
    const openEditModal = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            isComplete: project.isComplete
        });
        // Set preview for existing image (assuming it's a URL from server)
        if (project.image) {
            setImagePreview(project.image);
        }
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            image: null,
            isComplete: false
        });
        setImagePreview(null);
    };

    // Handle delete click
    const handleDeleteClick = (project) => {
        setConfirmAction({
            message: `Are you sure you want to delete "${project.title}"?`,
            onConfirm: () => deleteProject(project._id)
        });
        setShowConfirmModal(true);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.success('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.success('File size must be less than 5MB');
                return;
            }

            setFormData(prev => ({
                ...prev,
                image: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (isAuthenticated) {
        return (
            <div className="portfolio-dashboard">
                <div className="dashboard-header">
                    <h1>Portfolio Projects</h1>
                    <button className="btn-add" onClick={openCreateModal}>
                        <FiPlus /> Add Project
                    </button>
                </div>

                {loading && (
                    <div className="loader-overlay">
                        <div className="loader"></div>
                    </div>
                )}

                <div className="projects-table-container">
                    <table className="projects-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="no-data">
                                        No projects found. Create your first project!
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project._id}>
                                        <td>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="project-thumbnail"
                                            />
                                        </td>
                                        <td className="project-title">{project.title}</td>
                                        <td className="project-description">{project.description}</td>
                                        <td>
                                            <span className={`status-badge ${project.isComplete ? 'complete' : 'incomplete'}`}>
                                                {project.isComplete ? (
                                                    <><FiCheck /> Complete</>
                                                ) : (
                                                    <>Incomplete</>
                                                )}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => openEditModal(project)}
                                                    title="Edit"
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDeleteClick(project)}
                                                    title="Delete"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Create/Edit Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
                                <button className="btn-close" onClick={closeModal}>
                                    <FiX />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter project title"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter project description"
                                        rows="4"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Project Image * {editingProject && '(Leave empty to keep current image)'}</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required={!editingProject}
                                        className="file-input"
                                    />
                                    <small className="file-hint">Max file size: 5MB. Supported formats: JPG, PNG, GIF, WEBP</small>
                                    {imagePreview && (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="isComplete"
                                            checked={formData.isComplete}
                                            onChange={handleInputChange}
                                        />
                                        Mark as complete
                                    </label>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn-cancel" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-submit">
                                        {editingProject ? 'Update Project' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Confirmation Modal */}
                {showConfirmModal && confirmAction && (
                    <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
                        <div className="modal modal-confirm" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <FiAlertCircle className="alert-icon" />
                                <h2>Confirm Action</h2>
                            </div>
                            <p className="confirm-message">{confirmAction.message}</p>
                            <div className="modal-footer">
                                <button
                                    className="btn-cancel"
                                    onClick={() => setShowConfirmModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn-confirm"
                                    onClick={() => {
                                        confirmAction.onConfirm();
                                        setShowConfirmModal(false);
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <Navigate to="/" />
        )
    }

};

export default PortfolioDashboard;