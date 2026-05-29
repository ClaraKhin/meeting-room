import BookingCard from "./BookingCard";

const BookingList = ({ bookings, currentUser, onDelete }) => {
  const canDeleteBooking = (booking) => {
    return (
      currentUser.role === "admin" ||
      currentUser.role === "owner" ||
      booking.userId === currentUser.id
    );
  };

  return (
    <section
      className="rounded border border-slate-200 bg-white p-5 shadow-sm"
      style={{ padding: "1rem" }}
    >
      <div
        className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
        style={{ marginBottom: "1rem" }}
      >
        <h2 className="text-lg font-bold text-[#1d4ed8]">Booking List</h2>
        <span className="text-sm text-[#537ec5]">
          {bookings.length} bookings
        </span>
      </div>

      {bookings.length === 0 ? (
        <p
          className="rounded bg-slate-50 p-4 text-sm text-slate-600"
          style={{ padding: "1rem" }}
        >
          No bookings yet.
        </p>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              canDelete={canDeleteBooking(booking)}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookingList;
