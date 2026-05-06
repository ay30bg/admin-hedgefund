import React from "react";

const AdminPlans = () => {
  const plans = [
    { _id: "1", name: "Starter", price: 100, roi: 10 },
    { _id: "2", name: "Pro", price: 500, roi: 25 },
  ];

  return (
    <div>
      <h2>Plans</h2>

      {plans.map(plan => (
        <div key={plan._id} className="card">
          <h3>{plan.name}</h3>
          <p>${plan.price}</p>
          <p>{plan.roi}% ROI</p>
        </div>
      ))}
    </div>
  );
};

export default AdminPlans;