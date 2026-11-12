
import { useEffect, useRef } from "react";
import { MessageCircle, Loader2 } from "lucide-react";

function MessageList({ messages, currentUser, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const currentId =
    currentUser?._id ||
    currentUser?.id ||
    currentUser?.userId;

  const getSenderId = (sender) => {
    if (!sender) return "";
    if (typeof sender === "object") {
      return String(sender._id || sender.id || "");
    }
    return String(sender);
  };

  const getSenderName = (sender, isMine) => {
    if (isMine) return "You";

    if (typeof sender === "object") {
      return (
        sender.fullName ||
        sender.name ||
        sender.username ||
        "User"
      );
    }

    return "User";
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">

      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2
            className="animate-spin text-indigo-600"
            size={30}
          />
        </div>
      ) : messages.length > 0 ? (
        messages.map((m, index) => {
          const sender = m.senderId || m.sender || m.from;

          const senderId = getSenderId(sender);

          const isMine =
            senderId === String(currentId);

          const senderName = getSenderName(
            sender,
            isMine
          );

          const text =
            m.message || m.content || m.text || "";

          return (
            <div
              key={m._id || index}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] md:max-w-[65%] px-4 py-3 rounded-2xl shadow-sm ${
                  isMine
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >

                {/* Sender Name */}
                <p
                  className={`text-xs font-bold mb-2 ${
                    isMine
                      ? "text-indigo-200"
                      : "text-indigo-600"
                  }`}
                >
                  {senderName}
                </p>

                {/* Message */}
                <p className="text-sm break-words">
                  {text}
                </p>

                {/* Time */}
                <p
                  className={`text-[10px] text-right mt-2 ${
                    isMine
                      ? "text-indigo-200"
                      : "text-gray-400"
                  }`}
                >
                  {m.createdAt
                    ? new Date(m.createdAt).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : ""}
                </p>

              </div>
            </div>
          );
        })
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MessageCircle
              size={55}
              className="mx-auto mb-3 opacity-30"
            />
            <p>No messages yet</p>
            <p className="text-sm mt-1">
              Start a conversation!
            </p>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
