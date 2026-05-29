import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Meeting Room Booking</div>
        <div>
          <a href="/" className="px-3 py-2 hover:bg-gray-700 rounded">
            Home
          </a>
          <a href="/rooms" className="px-3 py-2 hover:bg-gray-700 rounded">
            Rooms
          </a>
          <a href="/bookings" className="px-3 py-2 hover:bg-gray-700 rounded">
            Bookings
          </a>
          <a href="/profile" className="px-3 py-2 hover:bg-gray-700 rounded">
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
