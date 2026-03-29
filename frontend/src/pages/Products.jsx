import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, 
  Trash2, 
  Edit3, 
  Plus, 
  X
} from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [partners, setPartners] = useState([]);
    const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', supplier: 'Unassigned' });
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

    const fetchData = async () => {
        try {
            const [pRes, cRes] = await Promise.all([
                axios.get(API_URL),
                axios.get(`${import.meta.env.VITE_API_URL}/api/customers`)
            ]);
            setProducts(pRes.data);
            setPartners(cRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await axios.put(`${API_URL}/update/${editingId}`, form);
                setEditingId(null);
            } else {
                await axios.post(`${API_URL}/add`, form);
            }
            setForm({ name: '', category: '', price: '', stock: '', supplier: 'Unassigned' });
            fetchData();
        } catch (err) {
            console.error('Error saving product:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setForm({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            supplier: product.supplier || 'Unassigned'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setForm({ name: '', category: '', price: '', stock: '', supplier: 'Unassigned' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this asset entry?')) return;
        try {
            await axios.delete(`${API_URL}/delete/${id}`);
            fetchData();
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>Asset Registry</h1>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3, width: '16px' }} />
                    <input
                        type="text"
                        className="slate-input"
                        placeholder="Search assets..."
                        style={{ paddingLeft: '40px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="layout-grid" style={{ gridTemplateColumns: '1fr 350px', alignItems: 'start' }}>
                {/* Enhanced Registry Table */}
                <div className="widget-panel" style={{ padding: '0' }}>
                    <table className="slate-table">
                        <thead>
                            <tr>
                                <th>Registry Info</th>
                                <th>Category</th>
                                <th>Valuation</th>
                                <th>Stock</th>
                                <th>Partner</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? filtered.map(product => (
                                <tr key={product._id} style={{ opacity: editingId === product._id ? 0.5 : 1 }}>
                                    <td>
                                        <div style={{ fontWeight: 700, color: '#fff' }}>{product.name}</div>
                                        <div style={{ fontSize: '11px', color: '#555' }}>ID: {product._id.slice(-6)}</div>
                                    </td>
                                    <td><span style={{ color: '#8b949e' }}>{product.category}</span></td>
                                    <td><span style={{ fontWeight: 600, color: '#fff' }}>₹{Number(product.price).toLocaleString()}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: product.stock < 10 ? '#f85149' : '#3fb950' }}></div>
                                            <span style={{ fontWeight: 600 }}>{product.stock} Units</span>
                                        </div>
                                    </td>
                                    <td><span style={{ fontSize: '13px', opacity: 0.6 }}>{product.supplier}</span></td>
                                    <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button 
                                                onClick={() => handleEdit(product)} 
                                                style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer' }}
                                                title="Edit Asset"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product._id)} 
                                                style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer' }}
                                                title="Delete Asset"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '100px', color: '#555' }}>No asset records found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Maintenance Portal (Edit/Add Form) */}
                <div className="widget-panel" style={{ border: editingId ? '1px solid var(--primary)' : '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                            {editingId ? 'Edit Asset Registry' : 'Register New Asset'}
                        </h3>
                        {editingId && (
                            <button onClick={handleCancelEdit} style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer' }}>
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Asset Name</label>
                            <input
                                type="text"
                                className="slate-input"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Category</label>
                            <input
                                type="text"
                                className="slate-input"
                                required
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Strategic Partner (Supplier)</label>
                            <select 
                                className="slate-input" 
                                style={{ padding: '10px' }}
                                value={form.supplier}
                                onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                            >
                                <option value="Unassigned">Select Strategic Partner...</option>
                                {partners.map(p => (
                                    <option key={p._id} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Unit Value</label>
                                <input
                                    type="number"
                                    className="slate-input"
                                    required
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '11px', color: '#8b949e', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Inventory</label>
                                <input
                                    type="number"
                                    className="slate-input"
                                    required
                                    value={form.stock}
                                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                />
                            </div>
                        </div>
                        <button type="submit" className="slate-btn" style={{ width: '100%', padding: '14px' }} disabled={loading}>
                            {loading ? 'Processing...' : (editingId ? 'Update Asset Info' : 'Commit Registry Entry')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Products;
