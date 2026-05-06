import React from "react";

const AdminOverview = () => {
  const stats = {
    users: 1200,
    deposits: 54000,
    withdrawals: 21000,
    revenue: 9000,
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="admin-cards">
        <div className="card">Users: {stats.users}</div>
        <div className="card">Deposits: ${stats.deposits}</div>
        <div className="card">Withdrawals: ${stats.withdrawals}</div>
        <div className="card">Revenue: ${stats.revenue}</div>
      </div>
    </div>
  );
};

export default AdminOverview;