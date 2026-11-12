import { ArrowLeft, RefreshCw } from "lucide-react";

function ChatHeader({ selectedUser, onBack, onRefresh }) {

  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <button
          onClick={onBack}
          className="md:hidden text-gray-600"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
          {(selectedUser?.name || selectedUser?.username || "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <h2 className="font-bold text-gray-800">
            {selectedUser?.name || selectedUser?.username}
          </h2>

          <p className="text-xs text-green-600">
            Chat
          </p>
        </div>

      </div>

      <button
        onClick={onRefresh}
        className="text-gray-500 hover:text-indigo-600 p-2"
      >
        <RefreshCw size={19} />
      </button>

    </header>
  );
}

export default ChatHeader;