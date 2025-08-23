import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import adminService from "../../services/admin.service";

function AdminPage() {
    const { section } = useParams(); 
    const [users, setUsers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

    useEffect(() => {
        if (section === "users") {
            loadUsers();
        } else if (section === "details") {
            loadCourses();
        }
    }, [section]);

    const loadUsers = async () => {
        const list = await adminService.ListUsers();
        setUsers(list);
    };

  const loadCourses = async () => {
    const list = await adminService.ListCousres();

    const coursesWithUser = await Promise.all(
        list.map(async (course: any) => {
            const user = await adminService.getUserById(course.userId);
            if(!user){return 0}
            return { ...course, user };
        })
    );

    setCourses(coursesWithUser);
};

    const toggleCourseDetails = (courseId: string) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };


    const updateStateUser = async (id: string, status: "active" | "blocked") => {
        await adminService.updateUsers(id, status);
        loadUsers();
    };

    const deleteUser = async (id: string) => {
        await adminService.deleteUser(id);
        loadUsers();
    };

    const updateCourses = async (id: string, body: any) => {
        await adminService.ListTupdateCourses(id, body);
        alert("Cập nhật thành công");
        loadCourses();
    };
    console.log(courses)
    if(!users|| ! courses){return(<div>Loading...</div>)}
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>{section === "users" ? "Users Manage" : "Information Details"}</h3>
                <div className="btn-group">
                    <Link to="/admin/users" className="btn btn-primary">Users</Link>
                    <Link to="/admin/details" className="btn btn-primary">Information Details</Link>
                </div>
            </div>

            {section === "users" && (
                <table className="table table-dark table-striped">
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Points</th><th>Actions</th></tr></thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>{u.status}</td>
                                <td>{u.points || 0}</td>
                                <td>
                                    {u.status === "active"
                                        ? <button className="btn btn-sm btn-warning me-2" onClick={() => updateStateUser(u._id, "blocked")}>Block</button>
                                        : <button className="btn btn-sm btn-success me-2" onClick={() => updateStateUser(u._id, "active")}>Unblock</button>
                                    }
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {section === "details" && (
                <div className="row">
                    {/* Students List */}
                    <div className="col-md-6">
                        <h5 className="text-info mb-3">
                            <i className="bi bi-person-fill me-2"></i>
                            Học viên đã đặt ({courses.filter(c => c.user?.role === 'student').length})
                        </h5>
                        {courses.filter(course => course.user?.role === 'student').map(course => (
                            <div key={course._id} className="card mb-2 border-info">
                                <div 
                                    className="card-body p-3 cursor-pointer" 
                                    onClick={() => toggleCourseDetails(course._id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="mb-1">
                                                <span className="badge bg-info me-2">STUDENT</span>
                                                {course.user?.name}
                                            </h6>
                                            <small className="text-muted">{course.user?.email}</small>
                                            <div className="mt-1">
                                                <span className={`badge ${course.user?.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                                    {course.user?.status}
                                                </span>
                                            </div>
                                        </div>
                                        <i className={`bi ${expandedCourse === course._id ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                    </div>

                                    {/* Student Details - Only basic info */}
                                    {expandedCourse === course._id && (
                                        <div className="mt-3 pt-3 border-top">
                                            <div className="row">
                                                <div className="col-12">
                                                    <p><strong>ID:</strong> {course.user?._id}</p>
                                                    <p><strong>Tên:</strong> {course.user?.name}</p>
                                                    <p><strong>Email:</strong> {course.user?.email}</p>
                                                    <p><strong>Trạng thái:</strong> 
                                                        <span className={`badge ms-2 ${course.user?.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                                            {course.user?.status}
                                                        </span>
                                                    </p>
                                                    {course.user?.points && (
                                                        <p><strong>Điểm:</strong> {course.user.points}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tutors List */}
                    <div className="col-md-6">
                        <h5 className="text-success mb-3">
                            <i className="bi bi-mortarboard-fill me-2"></i>
                            Gia sư đã được đặt({courses.filter(c => c.user?.role === 'tutor').length})
                        </h5>
                        {courses.filter(course => course.user?.role === 'tutor').map(course => (
                            <div key={course._id} className="card mb-2 border-success">
                                <div 
                                    className="card-body p-3 cursor-pointer" 
                                    onClick={() => toggleCourseDetails(course._id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="mb-1">
                                                <span className="badge bg-success me-2">TUTOR</span>
                                                {course.user?.name}
                                            </h6>
                                            <small className="text-muted">{course.user?.email}</small>
                                            <div className="mt-1">
                                                <span className="text-success fw-bold">
                                                    {course.price ? course.price.toLocaleString('vi-VN') + ' VNĐ' : 'Chưa có giá'}
                                                </span>
                                                <span className={`badge ms-2 ${course.user?.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                                    {course.user?.status}
                                                </span>
                                            </div>
                                        </div>
                                        <i className={`bi ${expandedCourse === course._id ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                    </div>

                                    {/* Tutor Details - Full info */}
                                    {expandedCourse === course._id && (
                                        <div className="mt-3 pt-3 border-top">
                                            {/* User Information */}
                                            <div className="mb-3">
                                                <h6 className="text-primary">Thông tin cá nhân:</h6>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p><strong>ID:</strong> {course.user?._id}</p>
                                                        <p><strong>Tên:</strong> {course.user?.name}</p>
                                                        <p><strong>Email:</strong> {course.user?.email}</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p><strong>Trạng thái:</strong> 
                                                            <span className={`badge ms-2 ${course.user?.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                                                {course.user?.status}
                                                            </span>
                                                        </p>
                                                        {course.user?.points && (
                                                            <p><strong>Điểm:</strong> {course.user.points}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Course Information */}
                                            <div className="mb-3">
                                                <h6 className="text-primary">Thông tin khóa học:</h6>
                                                <p><strong>Giá:</strong> 
                                                    <span className="text-success fw-bold ms-2">
                                                        {course.price ? course.price.toLocaleString('vi-VN') + ' VNĐ' : 'Chưa có giá'}
                                                    </span>
                                                </p>
                                                {course.videoUrl && (
                                                    <p><strong>Video giới thiệu:</strong> 
                                                        <a href={course.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary ms-2">
                                                            Xem video
                                                        </a>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Bio and Experience */}
                                            {course.bio && (
                                                <div className="mb-3">
                                                    <h6 className="text-primary">Giới thiệu:</h6>
                                                    <p className="text-muted small">{course.bio}</p>
                                                </div>
                                            )}

                                            {course.experience && (
                                                <div className="mb-3">
                                                    <h6 className="text-primary">Kinh nghiệm:</h6>
                                                    <p className="text-muted small">{course.experience}</p>
                                                </div>
                                            )}

                                            {/* Availability Schedule */}
                                            {course.availability && course.availability.length > 0 && (
                                                <div className="mb-3">
                                                    <h6 className="text-primary">Lịch có thể dạy:</h6>
                                                    <div className="row">
                                                        {course.availability.map((schedule: any, index: number) => (
                                                            <div key={schedule._id || index} className="col-md-6 mb-1">
                                                                <div className="border rounded p-2 bg-light small">
                                                                    <strong>{schedule.day}:</strong> {schedule.time}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="mt-3 border-top pt-3">
                                                <h6 className="text-primary">Hành động quản lý:</h6>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    <button 
                                                        className="btn btn-sm btn-outline-success" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateCourses(course._id, { price: (course.price || 0) + 50000 });
                                                        }}
                                                    >
                                                        Tăng giá +50k
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-outline-warning" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateCourses(course._id, { price: Math.max(0, (course.price || 0) - 50000) });
                                                        }}
                                                    >
                                                        Giảm giá -50k
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-outline-info" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateCourses(course._id, { status: course.status === 'active' ? 'inactive' : 'active' });
                                                        }}
                                                    >
                                                        {course.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
