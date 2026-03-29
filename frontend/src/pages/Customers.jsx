import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Users, 
    UserPlus, 
    Search, 
    Trash2, 
    Mail, 
    Phone, 
    MapPin, 
    Plus
} from 'lucide-react';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = `${import.meta.env.VITE_API_URL}/api/customers`;

    const fetchCustomers = async () => {
        try {
            const res = await axios.get(API_URL);
            setCustomers(res.data);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/add`, form);
            setForm({ name: '', email: '', phone: '', address: '' });
            fetchCustomers();
        } catch (err) {
            console.error('Error adding customer:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this partner?')) return;
        try {
            await axios.delete(`${API_URL}/delete/${id}`);
            fetchCustomers();
        } catch (err) {
            console.error('Error deleting customer:', err);
        }
    };

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>Strategic Partnerships</h1>
                <div style={{ position: 'relative', width: '320px' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3, width: '16px' }} />
                    <input
                        type="text"
                        className="slate-input"
                        placeholder="Search indexed partners..."
                        style={{ paddingLeft: '40px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="layout-grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 350px', alignItems: 'start' }}>
                {/* Table Section */}
                <div className="widget-panel" style={{ padding: '0' }}>
                    <table className="slate-table">
                        <thead>
                            <tr>
                                <th>Corporate Entity</th>
                                <th>Contact Portal</th>
                                <th>HQ Location</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? filtered.map(c => (
                                <tr key={c._id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '34px', height: '34px', background: 'var(--border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--primary)' }}>
                                                {c.name.charAt(0)}
                                            </div>
                                            <div style={{ fontWeight: 700, color: '#fff' }}>{c.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                                            <Mail size={12} style={{ opacity: 0.5 }} /> {c.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#8b949e' }}>
                                            <MapPin size={12} style={{ opacity: 0.5 }} /> {c.address || 'Global HQ'}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button 
                                            onClick={() => handleDelete(c._id)} 
                                            style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '100px', color: '#555' }}>No partner records found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Form Sidebar */}
                <div className="widget-panel">
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>Onboard Partner</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Entity Name</label>
                            <input
                                type="text"
                                className="slate-input"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Primary Email</label>
                            <input
                                type="email"
                                className="slate-input"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Phone Line</label>
                            <input
                                type="text"
                                className="slate-input"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Global HQ</label>
                            <input
                                type="text"
                                className="slate-input"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="slate-btn" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Processing...' : 'Onboard Partner'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Customers;
