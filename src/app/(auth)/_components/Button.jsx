export default function Button({ label, type = "submit" }) {
    return (
      <button
        type={type}
        className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {label}
      </button>
    );
  }
  