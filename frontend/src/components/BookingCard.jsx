const formatDateTime = (value) => {
  return new Date(value).toLocaleString();
};

const BookingCard = ({ booking, canDelete, onDelete }) => {
  const bookedBy = booking.user?.name || "Unknown User";

  return (
    <article className="rounded border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h3 className="font-bold text-slate-900">{bookedBy}</h3>
          <p className="mt-1 text-sm text-slate-600">
            {formatDateTime(booking.startTime)} to {formatDateTime(booking.endTime)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Created {formatDateTime(booking.createdAt)}
          </p>
        </div>

        {canDelete && (
          <button
            onClick={() => onDelete(booking.id)}
            className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
};

export default BookingCard;
