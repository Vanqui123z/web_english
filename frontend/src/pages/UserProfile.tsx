import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    __v: number;
}

function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const userData = await userService.getProfile();
                setUser(userData);
                setFormData({
                    name: userData.name,
                    email: userData.email
                });
            } catch (err) {
                setError("Không thể tải thông tin người dùng");
                console.error("Error fetching user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const updatedUser = await userService.updateProfile(formData);
            setUser(updatedUser);
            setIsEditing(false);
            alert("Cập nhật thông tin thành công!");
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Cập nhật thông tin thất bại!");
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email
            });
        }
        setIsEditing(false);
    };

    const getRoleDisplay = (role: string) => {
        const roleMap: { [key: string]: string } = {
            'student': 'Học viên',
            'tutor': 'Gia sư',
            'admin': 'Quản trị viên'
        };
        return roleMap[role] || role;
    };

    const getStatusDisplay = (status: string) => {
        const statusMap: { [key: string]: { text: string; color: string } } = {
            'active': { text: 'Hoạt động', color: 'success' },
            'blocked': { text: 'Bị khóa', color: 'danger' },
            'pending': { text: 'Chờ duyệt', color: 'warning' }
        };
        return statusMap[status] || { text: status, color: 'secondary' };
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

    if (error || !user) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error || "Không thể tải thông tin người dùng"}
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

    const statusInfo = getStatusDisplay(user.status);

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="fw-bold text-primary">
                            <i className="fas fa-user-circle me-2"></i>
                            Thông Tin Cá Nhân
                        </h2>
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/")}
                        >
                            <i className="fas fa-arrow-left me-2"></i>
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Card */}
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="fas fa-id-card me-2"></i>
                                    Hồ Sơ Người Dùng
                                </h5>
                                <span className={`badge bg-${statusInfo.color}`}>
                                    {statusInfo.text}
                                </span>
                            </div>
                        </div>
                        
                        <div className="card-body p-4">
                            {!isEditing ? (
                                /* View Mode */
                                <div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <div className="info-item mb-3">
                                                <label className="form-label fw-bold text-muted">
                                                    <i className="fas fa-user me-2"></i>
                                                    Họ và tên
                                                </label>
                                                <p className="fs-5 text-dark">{user.name}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="info-item mb-3">
                                                <label className="form-label fw-bold text-muted">
                                                    <i className="fas fa-envelope me-2"></i>
                                                    Email
                                                </label>
                                                <p className="fs-5 text-dark">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <div className="info-item mb-3">
                                                <label className="form-label fw-bold text-muted">
                                                    <i className="fas fa-user-tag me-2"></i>
                                                    Vai trò
                                                </label>
                                                <p className="fs-5">
                                                    <span className="badge bg-info fs-6">
                                                        {getRoleDisplay(user.role)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="info-item mb-3">
                                                <label className="form-label fw-bold text-muted">
                                                    <i className="fas fa-id-badge me-2"></i>
                                                    ID Người dùng
                                                </label>
                                                <p className="fs-6 text-muted font-monospace">{user._id}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <i className="fas fa-edit me-2"></i>
                                            Chỉnh sửa thông tin
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Edit Mode */
                                <div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    <i className="fas fa-user me-2"></i>
                                                    Họ và tên *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Nhập họ và tên"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    <i className="fas fa-envelope me-2"></i>
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Nhập địa chỉ email"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="alert alert-info" role="alert">
                                        <i className="fas fa-info-circle me-2"></i>
                                        <strong>Lưu ý:</strong> Vai trò và trạng thái tài khoản không thể thay đổi.
                                    </div>

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

            {/* Additional Info */}
            <div className="row justify-content-center mt-4">
                <div className="col-lg-8">
                    <div className="card border-0 bg-light">
                        <div className="card-body text-center">
                            <i className="fas fa-shield-alt fa-2x text-success mb-3"></i>
                            <h6 className="fw-bold">Thông tin của bạn được bảo mật</h6>
                            <p className="text-muted mb-0">
                                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo chính sách bảo mật.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
