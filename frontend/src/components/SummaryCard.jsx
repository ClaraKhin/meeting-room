const SummaryCard = ({ title, value }) => {
  return (
    <div className="rounded border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
};

export default SummaryCard;
