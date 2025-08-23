
import { useEffect, useState } from "react";
import bookingService from "../services/booking.service";
import LogoutButton from "../components/buttonLogout";

function ListStudentBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
          const fetchAPI = async () => {
               const bookingData =await bookingService.getByStudent();
               console.log(bookingData);
               setBookings(bookingData)
          }
          fetchAPI();
      }, [])

  if (!bookings) { return <div>Khong co quyen </div> }

  return (
   <div className="container mt-4">
  <h2 className="mb-3">Student Bookings</h2>
  <a href="/tutor/me" className="btn btn-danger mb-3">Back</a>
   <LogoutButton redirectTo="/" />
  <div className="row">
    {bookings.map((b: any, index: number) => (
      <div key={index} className="col-md-6 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title">Booking #{index + 1}</h5>
              <span
                className={`badge ${
                  b.status === "pending"
                    ? "bg-warning"
                    : b.status === "confirmed"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {b.status}
              </span>
            </div>
            
            <div className="mb-3">
              <h6 className="text-primary">Student Information:</h6>
              <p className="mb-1"><strong>Name:</strong> {b.student?.name || 'N/A'}</p>
              <p className="mb-1"><strong>Email:</strong> {b.student?.email || 'N/A'}</p>
            </div>

            <div className="mb-3">
              <h6 className="text-success">Tutor Information:</h6>
              <p className="mb-1"><strong>Bio:</strong> {b.tutor?.bio || 'N/A'}</p>
              <p className="mb-1"><strong>Price:</strong> {b.tutor?.price ? `$${b.tutor.price.toLocaleString()}` : 'N/A'}</p>
            </div>

            {b.dateTime && (
              <div className="mb-2">
                <h6 className="text-info">Booking Details:</h6>
                <p className="mb-1"><strong>Date & Time:</strong> {new Date(b.dateTime).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default ListStudentBooking;
