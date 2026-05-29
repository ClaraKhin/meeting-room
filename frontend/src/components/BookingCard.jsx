const formatDateTime = (value) => {
  return new Date(value).toLocaleString();
};

const BookingCard = ({ booking, canDelete, onDelete }) => {
  const bookedBy = booking.user?.name || "Unknown User";

  return (
    <article
      className="rounded border border-slate-200 bg-white"
      style={{ padding: "1rem" }}
    >
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h3 className="font-bold text-[#1d4ed8]">{bookedBy}</h3>
          <p className="text-sm text-[#537ec5]" style={{ marginTop: "0.5rem" }}>
            {formatDateTime(booking.startTime)} to{" "}
            {formatDateTime(booking.endTime)}
          </p>
          <p
            className="text-xs text-[#537ec5]"
            style={{ marginTop: "0.25rem" }}
          >
            Created {formatDateTime(booking.createdAt)}
          </p>
        </div>

        {canDelete && (
          <button
            onClick={() => onDelete(booking.id)}
            className="rounded w-25 bg-red-600 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
            style={{ padding: "0.5rem" }}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
};

export default BookingCard;
