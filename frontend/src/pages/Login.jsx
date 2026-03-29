import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, KeyRound, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const AUTH_API = `${import.meta.env.VITE_API_URL}/api/auth`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${AUTH_API}/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            const msg = err.response?.data?.message
                || err.response?.data?.error
                || (err.response ? `Server error ${err.response.status}` : 'Cannot reach server. Backend may be starting up — wait 30s and try again.');
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }} className="fade-in">
            <div className="widget-panel" style={{ maxWidth: '420px', width: '100%', padding: '48px', textAlign: 'center' }}>
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'var(--bg)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', border: '1px solid var(--border)' }}>
                        <ShieldCheck size={28} color="var(--primary)" />
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>Identity Portal</h1>
                    <p style={{ color: 'var(--text-dim)', fontWeight: 500, fontSize: '13px' }}>Authorize access to PLM Enterprise</p>
                </div>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Corporate Email</label>
                        <input
                            type="email"
                            className="slate-input"
                            placeholder="admin@enterprise.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Security Token</label>
                        <input
                            type="password"
                            className="slate-input"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="slate-btn" style={{ width: '100%', padding: '14px' }} disabled={loading}>
                        {loading ? 'Verifying...' : 'Authenticate'}
                    </button>
                    
                    <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-dim)', textAlign: 'center' }}>
                        New User? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>Register Access</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
