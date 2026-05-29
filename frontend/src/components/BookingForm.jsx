import React from "react";

const BookingForm = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Book a Meeting Room</h2>
      <form className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="room">
            Room
          </label>
          <select
            id="room"
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="room1">Room 1</option>
            <option value="room2">Room 2</option>
            <option value="room3">Room 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
