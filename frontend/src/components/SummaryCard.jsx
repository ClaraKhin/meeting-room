import React from "react";

const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default SummaryCard;
