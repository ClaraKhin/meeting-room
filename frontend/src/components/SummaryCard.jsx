const SummaryCard = ({ title, value }) => {
  return (
    <div
      className="rounded border border-slate-200 bg-white shadow-sm"
      style={{ padding: "1rem" }}
    >
      <p
        className="text-sm font-medium text-[#537ec5]"
        style={{ marginBottom: "0.5rem" }}
      >
        {title}
      </p>
      <p className="mt-2 text-3xl font-bold text-[#1d4ed8]">{value}</p>
    </div>
  );
};

export default SummaryCard;
