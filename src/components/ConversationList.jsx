import { MessageCircle } from "lucide-react";

function ConversationList({ conversations, users, onSelectUser }) {

  const findUser = (conversation) => {

    const other =
      conversation.user ||
      conversation.sender ||
      conversation.receiver ||
      conversation.participant ||
      conversation;

    const id =
      other._id || other.id || other.userId;

    return users.find((u) =>
      String(u._id || u.id || u.userId) === String(id)
    ) || other;
  };

  return (
    <div className="border-t p-4">

      <h3 className="font-semibold text-gray-700 mb-3">
        Recent Conversations
      </h3>

      <div className="max-h-32 overflow-y-auto space-y-2">

        {conversations.map((conversation, index) => {

          const user = findUser(conversation);

          return (
            <button
              key={conversation._id || index}
              onClick={() => onSelectUser(user)}
              className="w-full text-left text-sm text-gray-600 hover:text-indigo-600 truncate"
            >
              <MessageCircle
                size={14}
                className="inline mr-2"
              />

              {user.name || user.username || "Conversation"}

            </button>
          );
        })}

        {conversations.length === 0 && (
          <p className="text-xs text-gray-400">
            No conversations yet
          </p>
        )}

      </div>

    </div>
  );
}

export default ConversationList;