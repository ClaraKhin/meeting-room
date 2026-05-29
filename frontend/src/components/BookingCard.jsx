import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{booking.roomName}</h3>
      <p className="text-gray-600 mb-1">Date: {booking.date}</p>
      <p className="text-gray-600 mb-1">
        Time: {booking.startTime} - {booking.endTime}
      </p>
      <p className="text-gray-600 mb-1">Booked by: {booking.bookedBy}</p>
    </div>
  );
};

export default BookingCard;
