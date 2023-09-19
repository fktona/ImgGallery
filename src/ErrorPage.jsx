import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const Navigate = useNavigate();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-2">Sorry, something went wrong.</p>
        <p className="text-gray-600 mt-2">
          {error.statusText || error.message}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => Navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
