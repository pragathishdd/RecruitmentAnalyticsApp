export default function Header() {

  const user = JSON.parse(
    localStorage.getItem(
      "loggedInUser"
    ) || "{}"
  );

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "loggedInUser"
    );

    window.location.href =
      "/login";
  };

  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        Recruitment Analytics
      </h1>

      <div className="flex items-center gap-4">

        <div className="text-sm font-medium text-gray-700">
          {user.firstName} {user.lastName}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}
