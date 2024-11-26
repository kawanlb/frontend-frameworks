export default function Button({ label, type = "submit", isLoading }) {
  return (
    <button
      type={type}
      className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="border-4 border-t-4 border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
      ) : (
        label
      )}
    </button>
  );
}
