import React, { useState } from 'react';
import TutorAPI from '../../services/tutor.service';
import { useNavigate } from 'react-router-dom';

interface Availability {
    day: string;
    time: string;
}

interface TutorData {
    bio: string;
    experience: string;
    price: number;
    videoUrl: string;
    availability: Availability[];
}

const CreateTutor: React.FC = () => {
    const navigate = useNavigate();
    const [tutorData, setTutorData] = useState<TutorData>({
        bio: '',
        experience: '',
        price: 0,
        videoUrl: '',
        availability: []
    });
    
    const [newAvailability, setNewAvailability] = useState<Availability>({
        day: '',
        time: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const days = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
        'Friday', 'Saturday', 'Sunday'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTutorData(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    };

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAvailability(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addAvailability = () => {
        if (newAvailability.day && newAvailability.time) {
            setTutorData(prev => ({
                ...prev,
                availability: [...prev.availability, newAvailability]
            }));
            setNewAvailability({ day: '', time: '' });
        }
    };

    const removeAvailability = (index: number) => {
        setTutorData(prev => ({
            ...prev,
            availability: prev.availability.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await TutorAPI.create(tutorData);
            setMessage('Tutor created successfully!');
            setTutorData({
                bio: '',
                experience: '',
                price: 0,
                videoUrl: '',
                availability: []
            });
        } catch (error) {
            setMessage('Error creating tutor. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => navigate('/booking/student')}
                            >
                                back
                            </button>
                            
                            <h3 className="card-title mb-0">Create New Tutor</h3>
                        </div>
                        <div className="card-body">
                            {message && (
                                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                                    {message}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="bio" className="form-label">Bio</label>
                                    <textarea
                                        className="form-control"
                                        id="bio"
                                        name="bio"
                                        rows={4}
                                        value={tutorData.bio}
                                        onChange={handleInputChange}
                                        placeholder="Enter tutor's biography"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="experience" className="form-label">Experience</label>
                                    <textarea
                                        className="form-control"
                                        id="experience"
                                        name="experience"
                                        rows={3}
                                        value={tutorData.experience}
                                        onChange={handleInputChange}
                                        placeholder="Enter tutor's experience"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price per Hour ($)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        min="0"
                                        step="0.01"
                                        value={tutorData.price}
                                        onChange={handleInputChange}
                                        placeholder="Enter hourly price"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="videoUrl" className="form-label">Video URL</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        id="videoUrl"
                                        name="videoUrl"
                                        value={tutorData.videoUrl}
                                        onChange={handleInputChange}
                                        placeholder="Enter video URL (optional)"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Availability</label>
                                    <div className="row g-2 mb-2">
                                        <div className="col-md-6">
                                            <select
                                                className="form-select"
                                                name="day"
                                                value={newAvailability.day}
                                                onChange={handleAvailabilityChange}
                                            >
                                                <option value="">Select Day</option>
                                                {days.map(day => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <input
                                                type="time"
                                                className="form-control"
                                                name="time"
                                                value={newAvailability.time}
                                                onChange={handleAvailabilityChange}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary w-100"
                                                onClick={addAvailability}
                                                disabled={!newAvailability.day || !newAvailability.time}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {tutorData.availability.length > 0 && (
                                        <div className="mt-2">
                                            <h6>Added Availability:</h6>
                                            {tutorData.availability.map((avail, index) => (
                                                <div key={index} className="d-flex justify-content-between align-items-center bg-light p-2 mb-1 rounded">
                                                    <span>{avail.day} - {avail.time}</span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => removeAvailability(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Tutor'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTutor;