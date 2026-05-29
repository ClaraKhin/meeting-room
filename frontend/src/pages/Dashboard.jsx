import { useCallback, useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import UserTable from "../components/UserTable";
import { useUser } from "../context/UserContext";
import { bookingApi, getErrorMessage, userApi } from "../services/api";

const Dashboard = () => {
  const { currentUser, logout, saveKnownUsers } = useUser();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [summary, setSummary] = useState([]);
  const [groupedBookings, setGroupedBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const canViewAdminData =
    currentUser.role === "admin" || currentUser.role === "owner";

  const loadData = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const bookingResponse = await bookingApi.getAll(currentUser.id);
      setBookings(bookingResponse.data.data);

      if (canViewAdminData) {
        const summaryResponse = await bookingApi.getSummary(currentUser.id);
        const groupedResponse = await bookingApi.getGroupedByUser(
          currentUser.id
        );
        setSummary(summaryResponse.data.data);
        setGroupedBookings(groupedResponse.data.data);
      } else {
        setSummary([]);
        setGroupedBookings([]);
      }

      if (currentUser.role === "admin") {
        const userResponse = await userApi.getAll(currentUser.id);
        setUsers(userResponse.data.data);
        saveKnownUsers(userResponse.data.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [canViewAdminData, currentUser.id, currentUser.role, saveKnownUsers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadData]);

  const handleCreateBooking = async (data) => {
    await bookingApi.create(currentUser.id, data);
    setMessage("Booking created successfully");
    await loadData();
  };

  const handleDeleteBooking = async (bookingId) => {
    setError("");
    setMessage("");

    try {
      await bookingApi.delete(currentUser.id, bookingId);
      setMessage("Booking deleted successfully");
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleCreateUser = async (data) => {
    setError("");
    setMessage("");

    try {
      await userApi.create(currentUser.id, data);
      setMessage("User created successfully");
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleRoleChange = async (userId, role) => {
    setError("");
    setMessage("");

    try {
      await userApi.updateRole(currentUser.id, userId, role);
      setMessage("User role updated successfully");
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDeleteUser = async (userId) => {
    setError("");
    setMessage("");

    try {
      await userApi.delete(currentUser.id, userId);
      setMessage("User deleted successfully");
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const totalBookings = summary.reduce(
    (total, item) => total + item.totalBookings,
    0
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar user={currentUser} onLogout={logout} />

      <div className="flex flex-col md:flex-row">
        <Sidebar
          activeTab={activeTab}
          role={currentUser.role}
          onTabChange={setActiveTab}
        />

        <main className="min-w-0 flex-1 bg-[#d6e6f2]" style={{ padding: "1rem" }}>
          <section
            className="rounded border border-slate-100 bg-white"
            style={{ marginBottom: "1rem", padding: "1rem" }}
          >
            <p className="text-sm font-medium capitalize text-[#769fcd]">
              {currentUser.role}
            </p>
            <h2 className="mt-1 break-words text-xl font-bold text-[#1d4ed8] sm:text-2xl">
              Welcome, {currentUser.name}
            </h2>
          </section>

          {message && (
            <p
              className="rounded border border-green-200 bg-green-50 text-sm text-green-700"
              style={{ padding: "0.5rem 1rem", marginBottom: "1rem" }}
            >
              {message}
            </p>
          )}

          {error && (
            <p
              className="rounded border border-red-20o text-sm"
              style={{
                marginBottom: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#ff0000",
                color: "#ffcccc",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {loading ? (
            <p
              className="rounded bg-white text-slate-600"
              style={{ padding: "1rem" }}
            >
              Loading...
            </p>
          ) : (
            <div className="space-y-5">
              {(activeTab === "dashboard" || activeTab === "bookings") && (
                <>
                  <BookingForm onCreate={handleCreateBooking} />
                  <BookingList
                    bookings={bookings}
                    currentUser={currentUser}
                    onDelete={handleDeleteBooking}
                  />
                </>
              )}

              {activeTab === "dashboard" && canViewAdminData && (
                <>
                  <div className="grid gap-3 md:grid-cols-3">
                    <SummaryCard title="Total Bookings" value={totalBookings} />
                    <SummaryCard
                      title="Users With Bookings"
                      value={summary.length}
                    />
                    <SummaryCard
                      title="All Users"
                      value={users.length || "-"}
                    />
                  </div>

                  {summary.length > 0 && (
                    <section
                      className="rounded border border-slate-200 bg-white shadow-sm"
                      style={{ padding: "1rem" }}
                    >
                      <h2 className="text-lg font-bold text-[#1d4ed8]">
                        Usage Summary
                      </h2>
                      <div
                        className="grid gap-3 md:grid-cols-3"
                        style={{ marginTop: "1rem" }}
                      >
                        {summary.map((item) => (
                          <SummaryCard
                            key={item.userId}
                            title={item.name}
                            value={item.totalBookings}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  <section
                    className="rounded border border-slate-200 bg-white shadow-sm"
                    style={{ padding: "1rem" }}
                  >
                    <h2 className="text-lg font-bold text-[#1d4ed8]">
                      Bookings Grouped By User
                    </h2>
                    <div className="space-y-3" style={{ marginTop: "1rem" }}>
                      {groupedBookings.length === 0 ? (
                        <p className="text-sm text-slate-600">
                          No grouped bookings yet.
                        </p>
                      ) : (
                        groupedBookings.map((group) => (
                          <div
                            key={group.userId}
                            className="rounded border border-slate-200"
                            style={{ padding: "1rem" }}
                          >
                            <p className="font-medium text-[#1d4ed8]">
                              {group.name}
                            </p>
                            <p className="text-sm  text-[#537ec5]">
                              {group.bookings.length} bookings
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                </>
              )}

              {activeTab === "users" && currentUser.role === "admin" && (
                <UserTable
                  users={users}
                  currentUserId={currentUser.id}
                  onCreate={handleCreateUser}
                  onDelete={handleDeleteUser}
                  onRoleChange={handleRoleChange}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
