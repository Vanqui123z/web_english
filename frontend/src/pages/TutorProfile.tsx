import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tutorService from "../services/tutor.service";

interface Availability {
    _id: string;
    day: string;
    time: string;
}

interface TutorProfile {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    bio: string;
    experience: string;
    price: number;
    videoUrl: string;
    availability: Availability[];
    __v: number;
}

function TutorProfile() {
    const navigate = useNavigate();
    const [tutor, setTutor] = useState<TutorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        bio: "",
        experience: "",
        price: 0,
        videoUrl: "",
        availability: [] as Availability[]
    });

    useEffect(() => {
        const fetchTutorProfile = async () => {
            try {
                setLoading(true);
                const tutorData = await tutorService.getMyProfile();
                setTutor(tutorData);
                setFormData({
                    bio: tutorData.bio,
                    experience: tutorData.experience,
                    price: tutorData.price,
                    videoUrl: tutorData.videoUrl,
                    availability: tutorData.availability || []
                });
            } catch (err) {
                setError("Không thể tải thông tin gia sư");
                console.error("Error fetching tutor profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTutorProfile();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) || 0 : value
        }));
    };

    const handleAvailabilityChange = (index: number, field: string, value: string) => {
        const newAvailability = [...formData.availability];
        newAvailability[index] = {
            ...newAvailability[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            availability: newAvailability
        }));
    };

    const addAvailabilitySlot = () => {
        setFormData(prev => ({
            ...prev,
            availability: [
                ...prev.availability,
                { _id: `temp_${Date.now()}`, day: "Monday", time: "09:00-10:00" }
            ]
        }));
    };

    const removeAvailabilitySlot = (index: number) => {
        setFormData(prev => ({
            ...prev,
            availability: prev.availability.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        try {
            if (!tutor) return;
            
            const updateData = {
                bio: formData.bio,
                experience: formData.experience,
                price: formData.price,
                videoUrl: formData.videoUrl,
                availability: formData.availability
            };

            const updatedTutor = await tutorService.updateProfile(tutor._id, updateData);
            setTutor(updatedTutor);
            setIsEditing(false);
            alert("Cập nhật thông tin thành công!");
        } catch (err) {
            console.error("Error updating tutor profile:", err);
            alert("Cập nhật thông tin thất bại!");
        }
    };

    const handleCancel = () => {
        if (tutor) {
            setFormData({
                bio: tutor.bio,
                experience: tutor.experience,
                price: tutor.price,
                videoUrl: tutor.videoUrl,
                availability: tutor.availability || []
            });
        }
        setIsEditing(false);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const toEmbedUrl = (url: string): string => {
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace("watch?v=", "embed/").split('&')[0];
        }
        return url;
    };

    const getDayInVietnamese = (day: string): string => {
        const dayMap: { [key: string]: string } = {
            'Monday': 'Thứ 2',
            'Tuesday': 'Thứ 3',
            'Wednesday': 'Thứ 4',
            'Thursday': 'Thứ 5',
            'Friday': 'Thứ 6',
            'Saturday': 'Thứ 7',
            'Sunday': 'Chủ nhật'
        };
        return dayMap[day] || day;
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !tutor) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error || "Không thể tải thông tin gia sư"}
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate("/login")}
                >
                    Đăng nhập lại
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="fw-bold text-primary">
                            <i className="fas fa-chalkboard-teacher me-2"></i>
                            Hồ Sơ Gia Sư
                        </h2>
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(-1)}
                        >
                            <i className="fas fa-arrow-left me-2"></i>
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Left Column - Basic Info */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                <i className="fas fa-user me-2"></i>
                                Thông Tin Cá Nhân
                            </h5>
                        </div>
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <i className="fas fa-user-circle fa-4x text-primary"></i>
                            </div>
                            <h5 className="fw-bold">{tutor.userId.name}</h5>
                            <p className="text-muted mb-3">{tutor.userId.email}</p>
                            <div className="mb-3">
                                <span className="badge bg-success fs-6">
                                    {formatPrice(tutor.price)}/buổi
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Detailed Info */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-info text-white">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="fas fa-id-card me-2"></i>
                                    Thông Tin Chuyên Môn
                                </h5>
                                {!isEditing && (
                                    <button 
                                        className="btn btn-warning btn-sm"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <i className="fas fa-edit me-1"></i>
                                        Chỉnh sửa
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        <div className="card-body">
                            {!isEditing ? (
                                /* View Mode */
                                <div>
                                    {/* Bio */}
                                    <div className="mb-4">
                                        <h6 className="fw-bold text-primary">
                                            <i className="fas fa-quote-left me-2"></i>
                                            Giới thiệu
                                        </h6>
                                        <p className="text-dark">{tutor.bio}</p>
                                    </div>

                                    {/* Experience */}
                                    <div className="mb-4">
                                        <h6 className="fw-bold text-success">
                                            <i className="fas fa-medal me-2"></i>
                                            Kinh nghiệm
                                        </h6>
                                        <p className="text-dark">{tutor.experience}</p>
                                    </div>

                                    {/* Video */}
                                    {tutor.videoUrl && (
                                        <div className="mb-4">
                                            <h6 className="fw-bold text-warning">
                                                <i className="fas fa-video me-2"></i>
                                                Video giới thiệu
                                            </h6>
                                            <div className="ratio ratio-16x9">
                                                <iframe
                                                    src={toEmbedUrl(tutor.videoUrl)}
                                                    title="Video giới thiệu"
                                                    allowFullScreen
                                                    className="rounded"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Availability */}
                                    <div className="mb-4">
                                        <h6 className="fw-bold text-info">
                                            <i className="fas fa-calendar-alt me-2"></i>
                                            Lịch có thể dạy
                                        </h6>
                                        {tutor.availability && tutor.availability.length > 0 ? (
                                            <div className="row g-2">
                                                {tutor.availability.map((slot, index) => (
                                                    <div key={slot._id} className="col-md-6">
                                                        <div className="d-flex justify-content-between align-items-center bg-light rounded p-2">
                                                            <span className="badge bg-primary">
                                                                {getDayInVietnamese(slot.day)}
                                                            </span>
                                                            <span className="fw-bold">
                                                                <i className="fas fa-clock me-1"></i>
                                                                {slot.time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted">Chưa có lịch trống</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Edit Mode */
                                <div>
                                    {/* Bio */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            <i className="fas fa-quote-left me-2"></i>
                                            Giới thiệu *
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="Mô tả ngắn về bản thân..."
                                        />
                                    </div>

                                    {/* Experience */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            <i className="fas fa-medal me-2"></i>
                                            Kinh nghiệm *
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="Mô tả kinh nghiệm giảng dạy..."
                                        />
                                    </div>

                                    {/* Price */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            <i className="fas fa-money-bill-wave me-2"></i>
                                            Giá (VND/buổi) *
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="1000"
                                            placeholder="Nhập giá tiền..."
                                        />
                                    </div>

                                    {/* Video URL */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            <i className="fas fa-video me-2"></i>
                                            URL Video giới thiệu
                                        </label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            name="videoUrl"
                                            value={formData.videoUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                    </div>

                                    {/* Availability */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            <i className="fas fa-calendar-alt me-2"></i>
                                            Lịch có thể dạy
                                        </label>
                                        {formData.availability.map((slot, index) => (
                                            <div key={slot._id || index} className="row g-2 mb-2">
                                                <div className="col-md-4">
                                                    <select
                                                        className="form-select"
                                                        value={slot.day}
                                                        onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                                                    >
                                                        <option value="Monday">Thứ 2</option>
                                                        <option value="Tuesday">Thứ 3</option>
                                                        <option value="Wednesday">Thứ 4</option>
                                                        <option value="Thursday">Thứ 5</option>
                                                        <option value="Friday">Thứ 6</option>
                                                        <option value="Saturday">Thứ 7</option>
                                                        <option value="Sunday">Chủ nhật</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={slot.time}
                                                        onChange={(e) => handleAvailabilityChange(index, 'time', e.target.value)}
                                                        placeholder="09:00-10:00"
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm w-100"
                                                        onClick={() => removeAvailabilitySlot(index)}
                                                    > Xóa
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={addAvailabilitySlot}
                                        >
                                            <i className="fas fa-plus me-1"></i>
                                            Thêm khung giờ
                                        </button>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button 
                                            className="btn btn-outline-secondary me-md-2"
                                            onClick={handleCancel}
                                        >
                                            <i className="fas fa-times me-2"></i>
                                            Hủy
                                        </button>
                                        <button 
                                            className="btn btn-success"
                                            onClick={handleSave}
                                        >
                                            <i className="fas fa-save me-2"></i>
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TutorProfile;
