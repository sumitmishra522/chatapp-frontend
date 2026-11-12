import { Send } from "lucide-react";

function MessageInput({
  message,
  setMessage,
  onSend,
}) {

  return (
    <form
      onSubmit={onSend}
      className="bg-white border-t p-4 flex items-center gap-3"
    >

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-gray-100 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        type="submit"
        disabled={!message.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-3 rounded-full transition"
      >
        <Send size={20} />
      </button>

    </form>
  );
}

export default MessageInput;