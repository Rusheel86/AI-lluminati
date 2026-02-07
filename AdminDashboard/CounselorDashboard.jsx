import React, { useState } from 'react';
import { Calendar, ShieldAlert, TrendingUp, AlertCircle } from 'lucide-react';

// --- Mock Data Simulating Backend API Response ---
const dailyScheduleData = [
    { time: '10:00 - 10:50 AM', studentId: '...A4B1', status: 'Booked', type: 'Private Session' },
    { time: '11:00 - 11:50 AM', studentId: '...C9D2', status: 'Booked', type: 'Follow-up' },
    { time: '12:00 - 01:00 PM', studentId: 'N/A', status: 'Open', type: 'Lunch Break' },
    { time: '02:00 - 02:50 PM', studentId: '...F6E5', status: 'Booked', type: 'Private Session' },
    { time: '03:00 - 03:50 PM', studentId: 'N/A', status: 'Available', type: 'Open Slot' },
];

const anonymizedReportsData = [
    {
        studentId: 'STU-87B1',
        riskScore: 7.8,
        riskLevel: 'High',
        journalTrend: 'Negative',
        lastScreening: 'Anxiety Screener: 18/21',
    },
    {
        studentId: 'STU-5C4A',
        riskScore: 4.2,
        riskLevel: 'Moderate',
        journalTrend: 'Neutral',
        lastScreening: 'Stress Screener: 12/20',
    },
];

export default function CounselorDashboard() {
    const [schedule, setSchedule] = useState(dailyScheduleData);
    const [reports, setReports] = useState(anonymizedReportsData);

    return (
        <div>
            <header className="main-header">
                <h2>Counselor Dashboard</h2>
                <p>Your confidential student overview for Wednesday, September 24th.</p>
            </header>

            <div className="card-grid">
                {/* Daily Schedule Card */}
                <div className="card full-width-card">
                    <h3><Calendar size={20} style={{ marginRight: '8px', verticalAlign: 'bottom' }} /> Today's Schedule</h3>
                    <table className="schedule-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Student ID</th>
                                <th>Status</th>
                                <th>Session Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((slot) => (
                                <tr key={slot.time}>
                                    <td>{slot.time}</td>
                                    <td>{slot.studentId}</td>
                                    <td><span className={`status-pill status-${slot.status.toLowerCase()}`}>{slot.status}</span></td>
                                    <td>{slot.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Anonymized Reports Section */}
                <div className="card-header-wrapper">
                  <h3><ShieldAlert size={20} style={{ marginRight: '8px', verticalAlign: 'bottom' }} />Anonymized Student Reports</h3>
                </div>
                {reports.map((report) => (
                    <div className="card report-card" key={report.studentId}>
                        <h4>Report for: {report.studentId}</h4>
                        <div className="report-metrics">
                            <div className="metric-item">
                                <AlertCircle size={18} />
                                <strong>Risk Score:</strong>
                                <span className={`risk-level-${report.riskLevel.toLowerCase()}`}>{report.riskScore} ({report.riskLevel})</span>
                            </div>
                            <div className="metric-item">
                                <TrendingUp size={18} />
                                <strong>Journaling Trend:</strong>
                                <span>{report.journalTrend}</span>
                            </div>
                        </div>
                        <p className="last-screening"><strong>Last Screening:</strong> {report.lastScreening}</p>
                        <button className="view-report-btn">View Full Report</button>
                    </div>
                ))}
            </div>
        </div>
    );
}