import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import WelcomeScreen from "./WelcomeScreen";

function ChatWindow({
  selectedUser,
  messages,
  currentUser,
  message,
  setMessage,
  onSend,
  onRefresh,
  onBack,
  loading,
}) {

  if (!selectedUser) {
    return <WelcomeScreen />;
  }

  return (
    <main className="flex flex-1 flex-col min-w-0 bg-slate-50">

      <ChatHeader
        selectedUser={selectedUser}
        onBack={onBack}
        onRefresh={onRefresh}
      />

      <MessageList
        messages={messages}
        currentUser={currentUser}
        loading={loading}
      />

      <MessageInput
        message={message}
        setMessage={setMessage}
        onSend={onSend}
      />

    </main>
  );
}

export default ChatWindow;