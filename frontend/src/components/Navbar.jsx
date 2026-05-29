const Navbar = ({ user, onLogout }) => {
  return (
    <nav
      className="border-b border-slate-200 bg-white"
      style={{ padding: "1rem 1.5rem" }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-[#1d4ed8] sm:text-xl">
            Meeting Room Booking
          </h1>
          <p className="text-sm text-[#537ec5]">Single room schedule</p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="min-w-0 text-left sm:text-right">
            <p className="truncate font-bold text-[#1b435d]">{user.name}</p>
            <p className="text-sm capitalize text-[#005689]">{user.role}</p>
          </div>

          <button
            onClick={onLogout}
            className="shrink-0 rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 cursor-pointer"
            style={{ padding: "0.5rem 1rem" }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
