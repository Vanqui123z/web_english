
import { useEffect, useState } from "react";
import bookingService from "../services/booking.service";

function ListStudentBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const bookingData = await bookingService.getByTutor();
      setBookings(bookingData)
    }
    fetchAPI();
  }, [])
  if (!bookings) { return <div>Khong co quyen </div> }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Tutor Booked</h2>
      <a href="/tutors" className="btn btn-danger">Back</a>

      <ul className="list-group">
        {bookings.map((b: any) => (
          <li
            key={b._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <h6><b>Title:</b>{b.tutor.bio}</h6>
              <small>
                <strong>Experience:</strong> {b.tutor.experience} <br />
                <strong>Price:</strong> ${b.tutor.price} <br />
                <strong>Video Intro:</strong>{" "}
                <a href={b.tutor.videoUrl} target="_blank" rel="noreferrer">
                  Watch
                </a>
              </small>
              <br></br>
              <small>
                <strong>Date:</strong> {new Date(b.dateTime).toLocaleString()}
              </small>
            </div>
            <span
              className={`badge rounded-pill ${b.status === "pending"
                ? "bg-warning"
                : b.status === "confirmed"
                  ? "bg-success"
                  : "bg-secondary"
                }`}
            >
              {b.status}
            </span>
          </li>
        ))}
      </ul>
    </div>


  );
}

export default ListStudentBooking;
