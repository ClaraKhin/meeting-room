const SummaryCard = ({ title, value }) => {
  return (
    <div
      className="min-w-0 rounded border border-slate-200 bg-white shadow-sm"
      style={{ padding: "1rem" }}
    >
      <p
        className="break-words text-sm font-medium text-[#537ec5]"
        style={{ marginBottom: "0.5rem" }}
      >
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold text-[#1d4ed8] sm:text-3xl">{value}</p>
    </div>
  );
};

export default SummaryCard;
