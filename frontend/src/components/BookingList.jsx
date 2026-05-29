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
    <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Booking List</h2>
        <span className="text-sm text-slate-500">
          {bookings.length} bookings
        </span>
      </div>

      {bookings.length === 0 ? (
        <p className="rounded bg-slate-50 p-4 text-sm text-slate-600">
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
