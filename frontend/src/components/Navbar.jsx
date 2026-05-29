const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Meeting Room Booking
          </h1>
          <p className="text-sm text-slate-500">Single room schedule</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-medium text-slate-900">{user.name}</p>
            <p className="text-sm capitalize text-slate-500">{user.role}</p>
          </div>

          <button
            onClick={onLogout}
            className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
