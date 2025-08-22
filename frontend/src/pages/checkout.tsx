// src/pages/Checkout.tsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PACKS = [
  { id: 'trial-30', name: 'Học thử', amount: 30000 },
  { id: 'basic-5', name: 'Gói 5 buổi', amount: 500000 },
  { id: 'pro-10', name: 'Gói 10 buổi', amount: 1200000 },
];

export default function Checkout() {
  const [search] = useSearchParams();
  const presetTutorId = search.get('tutorId') || undefined;

  const [packageId, setPackageId] = useState(PACKS[0].id);
  const [tutorId, setTutorId] = useState(presetTutorId || '');
  const [me, setMe] = useState<any>(null);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    fetch('http://localhost:3000/users/me', { headers: { Authorization: 'Bearer ' + token } })
      .then(r => r.json()).then(setMe);
  }, []);

  const selected = PACKS.find(p => p.id === packageId)!;

  const pay = async () => {
    const res = await fetch('http://localhost:3000/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ amount: selected.amount, packageId, tutorId }),
    });
    const data = await res.json();
    alert(`Thanh toán thành công! +${data.transaction.pointsAwarded} điểm`);
    setMe(data.user);
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
        <label className="form-label">Tutor (tùy chọn)</label>
        <input className="form-control" placeholder="TutorId" value={tutorId} onChange={e => setTutorId(e.target.value)} />
      </div>

      {/* Mô phỏng quét mã: hiển thị ảnh QR tĩnh (mock) */}
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
