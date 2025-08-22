import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import adminService from "../../services/admin.service";

function AdminPage() {
    const { section } = useParams(); 
    const [users, setUsers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        if (section === "users") {
            loadUsers();
        } else if (section === "courses") {
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
    if(!users|| ! courses){return(<div>Loading...</div>)}
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>{section === "users" ? "Users Manage" : "Cousres Manage"}</h3>
                <div className="btn-group">
                    <Link to="/admin/users" className="btn btn-primary">Users</Link>
                    <Link to="/admin/courses" className="btn btn-primary">Courses</Link>
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

            {section === "courses" && (
                <>
                    {courses.map(t => (
                        <div key={t._id} className="card mb-3">
                            <div className="card-body">
                                <div className="row g-2">
                                    <div className="col-md-3">   <b>User:</b> {t.user?.name} ({t.user?.email})</div>
                                    <div className="col-md-3"><b>Price:</b> {t.price}</div>
                                    <div className="col-md-6"><b>Bio:</b> {t.bio}</div>
                                </div>
                                <div className="mt-2 d-flex gap-2">
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => updateCourses(t._id, { price: (t.price || 0) + 50000 })}>+50k</button>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => updateCourses(t._id, { price: Math.max(0, (t.price || 0) - 50000) })}>-50k</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default AdminPage;
