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
    <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Create Booking</h2>

      {error && (
        <p className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-700"
            htmlFor="startTime"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-700"
            htmlFor="endTime"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="self-end rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Saving..." : "Book Room"}
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
