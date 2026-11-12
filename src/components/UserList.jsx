import { Search, Users } from "lucide-react";

function UserList({
  users,
  selectedUser,
  onSelectUser,
  search,
  setSearch,
  currentUser,
}) {

  const currentId =
    currentUser?._id || currentUser?.id || currentUser?.userId;

  const filteredUsers = users.filter((user) => {

    const userId =
      user._id || user.id || user.userId;

    const name = user.name || user.username || "";
    const email = user.email || "";

    return (
      String(userId) !== String(currentId) &&
      (
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
    <div className="flex flex-col flex-1 min-h-0">

      <div className="p-4 border-b">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
          />

        </div>

      </div>

      <div className="px-4 py-3">

        <h2 className="font-semibold text-gray-700 flex gap-2 items-center">
          <Users size={18} />
          All Users
          <span className="text-gray-400 text-sm">
            ({filteredUsers.length})
          </span>
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto">

        {filteredUsers.map((user, index) => {

          const id =
            user._id || user.id || user.userId;

          const active =
            String(
              selectedUser?._id ||
              selectedUser?.id ||
              selectedUser?.userId
            ) === String(id);

          return (
            <button
              key={id || index}
              onClick={() => onSelectUser(user)}
              className={`w-full p-4 flex items-center gap-3 text-left border-b hover:bg-indigo-50 ${
                active ? "bg-indigo-50" : ""
              }`}
            >

              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0">
                {(user.name || user.username || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="font-semibold text-gray-800 truncate">
                  {user.name || user.username || "Unknown"}
                </h3>

                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>

              </div>

              {active && (
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
              )}

            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 p-6 text-sm">
            No users found
          </p>
        )}

      </div>

    </div>
  );
}

export default UserList;