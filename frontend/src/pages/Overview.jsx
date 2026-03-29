import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    LayoutDashboard, 
    Box, 
    Users, 
    AlertTriangle, 
    TrendingUp,
    DollarSign,
    Package
} from 'lucide-react';

const Overview = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pRes, cRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/products`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/customers`)
                ]);
                setProducts(pRes.data);
                setCustomers(cRes.data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Core Metrics
    const totalAssets = products.length;
    const totalStock = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
    const totalInventoryValue = products.reduce((acc, p) => acc + ((Number(p.price) || 0) * (Number(p.stock) || 0)), 0);
    const lowStockItems = products.filter(p => p.stock < 10).length;

    // Category Distribution (Simple)
    const categories = [...new Set(products.map(p => p.category))];
    const categoryStats = categories.map(cat => ({
        name: cat,
        count: products.filter(p => p.category === cat).length
    })).sort((a, b) => b.count - a.count).slice(0, 10);

    const maxCount = Math.max(...categoryStats.map(s => s.count), 1);

    if (loading) return <div className="container">Accessing Asset Insights...</div>;

    return (
        <div className="container fade-in">
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff' }}>Strategic Inventory Overview</h1>
            </div>

            {/* Main Stats Row */}
            <div className="stats-grid">
                <div className="stat-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <span className="stat-label">Total Inventory Worth</span>
                    <span className="stat-value" style={{ color: '#fff' }}>₹ {totalInventoryValue.toLocaleString()}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Total Stock Units</span>
                    <span className="stat-value" style={{ color: '#58a6ff' }}>{totalStock}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Unique Assets</span>
                    <span className="stat-value" style={{ color: '#3fb950' }}>{totalAssets}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Low Stock Alerts</span>
                    <span className="stat-value" style={{ color: '#f85149' }}>{lowStockItems}</span>
                </div>
            </div>

            <div className="dashboard-main" style={{ gridTemplateColumns: '1fr' }}>
                {/* Visual Distribution Widget */}
                <div className="widget-panel">
                    <h2 className="widget-title">Resource Distribution by Category</h2>
                    <div className="breakdown-list" style={{ maxWidth: '800px' }}>
                        {categoryStats.length > 0 ? categoryStats.map((stat, i) => {
                            const colors = ['#58a6ff', '#3fb950', '#a855f7', '#f97316', '#22c55e', '#ef4444'];
                            return (
                                <div className="breakdown-item" key={stat.name} style={{ gridTemplateColumns: '160px 1fr 40px' }}>
                                    <span className="breakdown-label">{stat.name}</span>
                                    <div className="progress-track" style={{ height: '12px' }}>
                                        <div 
                                            className="progress-bar" 
                                            style={{ 
                                                width: `${(stat.count / maxCount) * 100}%`,
                                                background: colors[i % colors.length]
                                            }}
                                        ></div>
                                    </div>
                                    <span className="breakdown-val">{stat.count}</span>
                                </div>
                            );
                        }) : (
                            <div style={{ color: '#444', textAlign: 'center', padding: '40px' }}>No categories registered in inventory.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
