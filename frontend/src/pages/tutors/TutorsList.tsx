import { useEffect, useState } from "react";
import tutorService from "../../services/tutor.service";
import { Link,  } from "react-router-dom";

interface Availability {
    _id: string;
    day: string;
    time: string;
}

interface Tutor {
    _id: string,
    userId: {
        _id: string,
        name: string,
        email: string
    },
    bio: string;
    experience: string;
    price: number;
    videoUrl: string;
    availability?: Availability[];
    __v?: number;
}


function TutorsList() {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                setLoading(true);
                const data = await tutorService.getAll();
                setTutors(data);
            } catch (err) {
                setError("Không thể tải danh sách gia sư");
                console.error("Error fetching tutors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

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
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="text-center mb-4">
                        <i className="fas fa-chalkboard-teacher me-2"></i>
                        Danh Sách Gia Sư Tiếng Anh
                    </h2>
                    <div className="text-center">
                        <span className="badge bg-info fs-6">
                            Tổng cộng: {tutors.length} gia sư
                        </span>
                    </div>
                </div>
            </div>

            <div className="row">
                {tutors.map((tutor) => (
                    <div key={tutor._id} className="col-lg-6 col-xl-4 mb-4">
                        <div className="card h-100 shadow-sm border-0">
                            {/* Video Preview */}
                            {tutor.videoUrl && (
                                <div className="card-img-top position-relative" style={{ height: "200px" }}>
                                    <iframe
                                        src={toEmbedUrl(tutor.videoUrl)}
                                        title={`Video giới thiệu gia sư ${tutor.userId.name}`}
                                        className="w-100 h-100 rounded-top"
                                        style={{ border: "none" }}
                                        allowFullScreen
                                    />
                                </div>
                            )}

                            <div className="card-body d-flex flex-column">
                                {/* Price Badge */}
                                <div className="position-absolute top-0 end-0 mt-2 me-2">
                                    <span className="badge bg-success fs-6">
                                        {formatPrice(tutor.price)}
                                    </span>
                                </div>

                                {/* Tutor Name */}
                                <div className="mb-3">
                                    <h5 className="card-title text-primary">
                                        <i className="fas fa-user-graduate me-2"></i>
                                        {tutor.userId.name}
                                    </h5>
                                    <small className="text-muted">
                                        <i className="fas fa-envelope me-1"></i>
                                        {tutor.userId.email}
                                    </small>
                                </div>

                                {/* Bio Section */}
                                <div className="mb-3">
                                    <h6 className="text-info">
                                        <i className="fas fa-quote-left me-2"></i>
                                        Giới thiệu
                                    </h6>
                                    <p className="card-text text-muted">
                                        <small>{tutor.bio}</small>
                                    </p>
                                </div>

                                {/* Experience Section */}
                                <div className="mb-3">
                                    <h6 className="text-warning">
                                        <i className="fas fa-medal me-2"></i>
                                        Kinh nghiệm
                                    </h6>
                                    <p className="card-text">{tutor.experience}</p>
                                </div>

                                {/* Availability Section */}
                                {tutor.availability && tutor.availability.length > 0 && (
                                    <div className="mb-3">
                                        <h6 className="text-success">
                                            <i className="fas fa-calendar-alt me-2"></i>
                                            Lịch có thể dạy
                                        </h6>
                                        <div className="row g-1">
                                            {tutor.availability.map((slot) => (
                                                <div key={slot._id} className="col-12">
                                                    <div className="d-flex justify-content-between align-items-center bg-light rounded p-2 mb-1">
                                                        <span className="badge bg-primary">
                                                            {getDayInVietnamese(slot.day)}
                                                        </span>
                                                        <span className="text-dark fw-bold">
                                                            <i className="fas fa-clock me-1"></i>
                                                            {slot.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="mt-auto">
                                    <div className="d-grid gap-2">
                                        <Link 
                                            to={`/tutors/${tutor._id}`} 
                                            className="btn btn-primary"
                                        >
                                            <i className="fas fa-eye me-2"></i>
                                            Xem chi tiết
                                        </Link>
                                        
                                    </div>
                                </div>

                                {/* Tutor ID for reference */}
                                <div className="mt-2">
                                    <small className="text-muted">
                                        ID: {tutor._id}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {tutors.length === 0 && (
                <div className="text-center mt-5">
                    <div className="alert alert-info" role="alert">
                        <i className="fas fa-info-circle me-2"></i>
                        Hiện tại chưa có gia sư nào. Vui lòng quay lại sau!
                    </div>
                </div>
            )}
        </div>
    );
}

export default TutorsList;