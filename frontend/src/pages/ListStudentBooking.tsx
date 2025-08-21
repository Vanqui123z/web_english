
import { useEffect, useState } from "react";
import bookingService from "../services/booking.service";

function ListStudentBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
          const fetchAPI = async () => {
               const bookingData =await bookingService.getByStudent();
               console.log(bookingData)
               setBookings(bookingData)
          }
          fetchAPI();
      }, [])

  return (
   <div className="container mt-4">
  <h2 className="mb-3">Student Booked</h2>
  <ul className="list-group">
    {bookings.map((b: any) => (
      <li
        key={b._id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>Student:</strong> {b.student.name} <br />
          <small>
            <strong>Date:</strong> {new Date(b.dateTime).toLocaleString()}
          </small>
        </div>
        <span
          className={`badge rounded-pill ${
            b.status === "pending"
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
