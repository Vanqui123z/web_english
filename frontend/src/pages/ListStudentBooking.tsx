
import { useEffect, useState } from "react";
import bookingService from "../services/booking.service";
import LogoutButton from "../components/buttonLogout";
import { Link } from "react-router-dom";

function ListStudentBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const bookingData = await bookingService.getByStudent();
      console.log(bookingData);
      setBookings(bookingData)
    }
    fetchAPI();
  }, [])

  if (!bookings) { return <div>Khong co quyen </div> }

  const handleUpdateStatus = async (bookingId: string, status: "confirmed" | "rejected") => {
    const result = await bookingService.updateStatus(bookingId, status);
    console.log(result);
    alert("Cập nhật thành công");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Student Bookings</h2>
      <div className="d-flex justify-content-between mb-3">
        <Link to="/tutor/me" className="btn btn-danger">Back</Link>
       <div>
         <Link to="/tutors/create" className="btn btn-primary me-2">Create</Link>
        <LogoutButton redirectTo="/" />
       </div>
      </div>
      <div className="row">
        {bookings.map((b: any, index: number) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title">Booking #{index + 1}</h5>
                  <span
                    className={`badge ${b.status === "pending"
                        ? "bg-warning"
                        : b.status === "confirmed"
                          ? "bg-success"
                          : b.status === "rejected"
                            ? "bg-danger"
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

                {b.status === "pending" && (
                  <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-sm btn-success" onClick={() => handleUpdateStatus(b.bookingId, "confirmed")}>Confirmed</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleUpdateStatus(b.bookingId, "rejected")}>Rejected</button>
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
