const menuItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "bookings", label: "Bookings" },
  { key: "users", label: "Users", adminOnly: true },
];

const Sidebar = ({ activeTab, role, onTabChange }) => {
  return (
    <aside
      className="border-b border-slate-200 bg-slate-50 md:min-h-[calc(100vh-73px)] md:w-64 md:border-b-0 md:border-r"
      style={{ padding: "1rem" }}
    >
      <nav
        className="flex gap-2 overflow-x-auto md:block md:space-y-2"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        {menuItems
          .filter((item) => !item.adminOnly || role === "admin")
          .map((item) => (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`shrink-0 rounded text-left text-sm font-medium md:w-full ${
                activeTab === item.key
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
              style={{
                padding: "0.5rem",
                marginBottom: "0.35rem",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
