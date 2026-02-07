import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Users, Activity, AlertTriangle } from 'lucide-react';

// --- Mock Data Simulating Aggregated, Anonymized DB Queries ---
const kpiData = {
    overallStress: 6.2,
    atRiskStudents: 87,
    activeInterventions: 12,
};

const stressByDeptData = [
    { dept: 'Engineering', stress: 8.1, color: '#d9534f' },
    { dept: 'Arts & Humanities', stress: 5.5, color: '#f0ad4e' },
    { dept: 'Business', stress: 7.2, color: '#d9534f' },
    { dept: 'Medicine', stress: 8.9, color: '#d9534f' },
    { dept: 'Law', stress: 6.8, color: '#f0ad4e' },
    { dept: 'Sciences', stress: 7.5, color: '#d9534f' },
];

const semesterStressTrend = [
    { week: '1-2', avgStress: 3.5 }, { week: '3-4', avgStress: 4.1 },
    { week: '5-6', avgStress: 5.8 }, { week: '7-8 (Midterms)', avgStress: 8.2 },
    { week: '9-10', avgStress: 6.1 }, { week: '11-12', avgStress: 7.5 },
    { week: '13-14 (Finals)', avgStress: 9.1 }, { week: '15-16', avgStress: 5.2 },
];

export default function AdminDashboard() {
    return (
        <div>
            <header className="main-header">
                <h2>University Administration Dashboard</h2>
                <p>Aggregated and anonymized student wellness overview.</p>
            </header>

            {/* KPI Cards */}
            <div className="kpi-grid">
                <div className="card kpi-card">
                    <Activity size={28} className="kpi-icon" />
                    <div className="kpi-info">
                        <span className="kpi-value">{kpiData.overallStress}/10</span>
                        <span className="kpi-label">Overall Stress Level</span>
                    </div>
                </div>
                <div className="card kpi-card">
                    <AlertTriangle size={28} className="kpi-icon" />
                    <div className="kpi-info">
                        <span className="kpi-value">{kpiData.atRiskStudents}</span>
                        <span className="kpi-label">Students At-Risk</span>
                    </div>
                </div>
                <div className="card kpi-card">
                    <Users size={28} className="kpi-icon" />
                    <div className="kpi-info">
                        <span className="kpi-value">{kpiData.activeInterventions}</span>
                        <span className="kpi-label">Active Interventions</span>
                    </div>
                </div>
            </div>

            <div className="card-grid">
                {/* Semester Trend Chart */}
                <div className="card">
                    <h3>Semester Stress Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={semesterStressTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis domain={[0, 10]}/>
                            <Tooltip />
                            <Legend />
                            <ReferenceLine x="7-8 (Midterms)" stroke="red" label="Midterms" />
                            <ReferenceLine x="13-14 (Finals)" stroke="red" label="Finals" />
                            <Line type="monotone" dataKey="avgStress" name="Avg. Stress" stroke="#f44336" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Departmental Stress Heatmap */}
                <div className="card">
                    <h3>Departmental Stress Levels (Heatmap)</h3>
                    <div className="heatmap-container">
                        {stressByDeptData.map(item => (
                            <div className="heatmap-item" key={item.dept}>
                                <div className="heatmap-color" style={{ backgroundColor: item.color }}>{item.stress}</div>
                                <div className="heatmap-label">{item.dept}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}