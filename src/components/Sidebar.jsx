import {
  MessageCircle,
  User,
  LogOut,
  RefreshCw,
} from "lucide-react";

import UserList from "./UserList";
import ConversationList from "./ConversationList";

function Sidebar({
  user,
  users,
  conversations,
  selectedUser,
  onSelectUser,
  onLogout,
  onRefresh,
  search,
  setSearch,
}) {

  return (
    <aside className="w-full md:w-[350px] lg:w-[380px] bg-white border-r flex flex-col shrink-0">

      {/* Header */}
      <div className="bg-indigo-600 text-white p-5">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <MessageCircle size={28} />

            <div>
              <h1 className="text-xl font-bold">
                ChatApp
              </h1>

              <p className="text-xs text-indigo-100">
                Messaging Dashboard
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={onRefresh}
              title="Refresh"
              className="p-2 hover:bg-indigo-500 rounded-lg"
            >
              <RefreshCw size={18} />
            </button>

            <button
              onClick={onLogout}
              title="Logout"
              className="p-2 hover:bg-indigo-500 rounded-lg"
            >
              <LogOut size={20} />
            </button>

          </div>

        </div>

        <div className="mt-5 flex items-center gap-3">

          <div className="bg-white/20 rounded-full p-3">
            <User size={23} />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold truncate">
              {user?.name || user?.username || "User"}
            </h3>

            <p className="text-xs text-indigo-100 truncate">
              {user?.email}
            </p>
          </div>

        </div>

      </div>

      {/* Users */}
      <UserList
        users={users}
        selectedUser={selectedUser}
        onSelectUser={onSelectUser}
        search={search}
        setSearch={setSearch}
        currentUser={user}
      />

      {/* Conversations */}
      <ConversationList
        conversations={conversations}
        users={users}
        onSelectUser={onSelectUser}
      />

    </aside>
  );
}

export default Sidebar;