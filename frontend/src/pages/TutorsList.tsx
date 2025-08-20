import { useEffect, useState } from "react";
import tutorService from "../services/tutor.service";
import { Link } from "react-router-dom";


interface Tutor {
    _id: string,
    bio: string;
    experience: string;
    price: number;
    videoUrl: string;

}


function TutorsList() {
    const [tutors, setTutor] = useState<Tutor[]>([])
    useEffect(() => {
        const fetchAPI = async ()=>{
            const dataTutor = await tutorService.getAll();
            setTutor(dataTutor);
        }
        fetchAPI();
    }, [])

    return (
        <div className="container mt-4">
            <h2>Danh sách giáo viên</h2>
            <div className="row">
                {tutors.map((tutor) => (
                    <div key={tutor._id} className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{tutor.experience}</h5>
                                <p className="card-text">{tutor.bio}</p>
                                <p><b>Giá: </b>{tutor.price} VND/buổi</p>
                                <Link to={`/tutors/${tutor._id}`} className="btn btn-primary">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TutorsList;