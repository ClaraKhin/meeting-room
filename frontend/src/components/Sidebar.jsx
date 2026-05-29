const menuItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "bookings", label: "Bookings" },
  { key: "users", label: "Users", adminOnly: true },
];

const Sidebar = ({ activeTab, role, onTabChange }) => {
  return (
    <aside className="min-h-[calc(100vh-73px)] w-full border-r border-slate-200 bg-slate-50 p-4 md:w-64">
      <nav className="space-y-2">
        {menuItems
          .filter((item) => !item.adminOnly || role === "admin")
          .map((item) => (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`w-full rounded px-4 py-2 text-left text-sm font-medium ${
                activeTab === item.key
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
