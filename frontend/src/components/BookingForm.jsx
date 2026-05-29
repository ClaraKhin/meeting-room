import { useState } from "react";
import { getErrorMessage } from "../services/api";

const BookingForm = ({ onCreate }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onCreate({
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      });

      setStartTime("");
      setEndTime("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="rounded border border-slate-100 bg-white shadow-sm"
      style={{ padding: "1rem" }}
    >
      <h2 className="text-lg font-bold text-[#1d4ed8]">Create Booking</h2>

      {error && (
        <p
          className="rounded border border-red-20o text-sm"
          style={{
            marginTop: "1rem",
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

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-3"
        style={{ marginTop: "0.5rem" }}
      >
        <div>
          <label
            className=" block text-sm font-medium text-[#537ec5]"
            style={{ marginBottom: "0.1rem" }}
            htmlFor="startTime"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            className="w-full rounded border border-slate-300 text-sm"
            style={{ padding: "0.5rem" }}
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-[#537ec5]"
            style={{ marginBottom: "0.1rem" }}
            htmlFor="endTime"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            className="w-full rounded border border-slate-300 text-sm"
            style={{ padding: "0.5rem" }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="self-end rounded bg-[#6730ec] text-sm font-medium text-white hover:bg-[#7984ee] cursor-pointer"
          style={{ padding: "0.7em" }}
        >
          {loading ? "Saving..." : "Book Room"}
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
