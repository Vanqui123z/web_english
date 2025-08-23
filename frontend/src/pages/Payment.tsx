// src/pages/Checkout.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import paymentService from '../services/payment.service';
import tutorService from '../services/tutor.service';
import bookingService from '../services/booking.service';



function Payment() {
  const navigate = useNavigate();
  const { idTutor } = useParams();
  const [tutorId, setTutorId] = useState(idTutor || "");
  const [tutor, setTutor] = useState<any>(null);
  const [date, setDate] = useState(new Date());

  const PACKS = [
    { id: 'trial-30', name: 'Học thử', amount: tutor?.price * 0.15 },
    { id: 'basic-5', name: 'Gói 5 buổi', amount: tutor?.price * 0.25 },
    { id: 'pro-10', name: 'Gói 10 buổi', amount: tutor?.price * 0.5 },
  ];


  const [packageId, setPackageId] = useState(PACKS[0].id);
  const [me, setMe] = useState<any>(null);



  useEffect(() => {
    const medata = async () => {
      const me = await paymentService.me();
      setMe(me);
    }
    const tutor = async () => {
      const tutor = await tutorService.getById(tutorId);
      setTutor(tutor);
    }
    medata()
    tutor();
  }, []);

  const selected = PACKS.find(p => p.id === packageId)!;

  const pay = async () => {
  try {
    console.log("selected.amount",selected.amount, "packageId",packageId, "tutorId",tutorId);
    // thoanh toan
    const data = await paymentService.checkout(selected.amount, packageId, tutorId);
    if (!data) {
      alert("Thanh toán thất bại!");
      return;
    }
    // tạo booking
    const bookingData = await bookingService.create(tutorId, date);
    if (!bookingData) {
      alert("Thanh toán thành công nhưng đặt lịch thất bại!");
      return;
    }

    // Thành công cả 2 bước
    alert(`Thanh toán thành công! +${data.transaction.pointsAwarded} điểm`);
    setMe(data.user);
    navigate(`/booking/courses`);
  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  }
};


  return (
    <div className="container mt-4">
      <h3>Thanh toán mock</h3>
      <div className="mb-3">
        <label className="form-label">Chọn gói</label>
        <select className="form-select" value={packageId} onChange={e => setPackageId(e.target.value)}>
          {PACKS.map(p => <option key={p.id} value={p.id}>{p.name} — {p.amount.toLocaleString()} VND</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" placeholder="Name" value={tutor?.userId.name} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">bio</label>
        <input className="form-control" placeholder="bio" value={tutor?.bio} disabled />
      </div>
      <div className="mb-3">
        <label className="form-label">experience</label>
        <input className="form-control" placeholder="experience" value={tutor?.experience} disabled />
      </div>

      <div className="mb-3">
        <p>Giả lập mã QR (mock):</p>
        <div className="border p-3 text-center">[ QR CODE MOCK ]</div>
      </div>

      <button className="btn btn-success" onClick={pay}>Thanh toán</button>

      <hr />
      <h5>Tài khoản của tôi</h5>
      {me ? <p>Xin chào <b>{me.name}</b> — Điểm: <b>{me.points}</b></p> : <em>Loading...</em>}
    </div>
  );
}
export default Payment;