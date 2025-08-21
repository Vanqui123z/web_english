import { useEffect, useState } from "react";
import tutorService from "../services/tutor.service";
import bookingService from "../services/booking.service";
import { Link, useParams,useNavigate } from "react-router-dom";


interface Tutor {
    _id: string,
    bio: string;
    experience: string;
    price: number;
    videoUrl: string;

}


function TutorDetail() {
    const navigate= useNavigate()
    const { idTutor } = useParams();
    const [tutor, setTutor] = useState<Tutor | null>(null)
    const [date,setDate] = useState( new Date())


    if (!idTutor) { return <div>"no idTutor"</div> }

    

    // coverts link
    function toEmbedUrl(url: string): string {
        return url.replace("watch?v=", "embed/");
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const dataTutor = await tutorService.getById(idTutor);
            setTutor(dataTutor);
        }
        fetchAPI();
    }, [idTutor])

     const handleBooking=async()=>{
            const bookingData =await bookingService.create(idTutor,date);
            if(! bookingData){
                alert("Đặt lịch thất bại !");
            }else{
                 alert("Đặt lịch thành công!");
                 navigate(`/booking/student`)
            }
        }

    if (!tutor) { return (<div>loading...</div>) }

    return (
        <div className="container mt-4">
            <h2>Thông tin giáo viên</h2>
            <p><b>Kinh nghiệm:</b> {tutor.experience}</p>
            <p><b>Bio:</b> {tutor.bio}</p>
            <p><b>Giá:</b> {tutor.price} VND/buổi</p>
            {tutor.videoUrl && (
                <div className="mb-3">
                    <iframe
                        width="100%"
                        height="300"
                        src={toEmbedUrl(tutor.videoUrl)}
                        title="Tutor Video"
                        allowFullScreen
                    />
                </div>
            )}
            <button className="btn btn-success" onClick={handleBooking} >Đặt lịch học thử</button>
        </div>
    );
}

export default TutorDetail;