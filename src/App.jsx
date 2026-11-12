
import { useState, useEffect, useCallback } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

import {
  getUsers,
  getProfile,
  getConversations,
  getMessages,
  sendMessage,
} from "./services/api";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const getArray = (data, keys = []) => {

    if (Array.isArray(data)) return data;

    for (const key of keys) {
      if (Array.isArray(data?.[key])) return data[key];

      if (Array.isArray(data?.data?.[key])) {
        return data.data[key];
      }
    }

    if (Array.isArray(data?.data)) return data.data;

    return [];
  };

  const getUserId = (u) =>
    u?._id || u?.id || u?.userId || u?.user?._id;

  // Login success
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUser(null);
    setUsers([]);
    setConversations([]);
    setMessages([]);
    setSelectedUser(null);
  };

  // Load dashboard
  const loadDashboard = useCallback(async () => {

    try {

      const [
        profileRes,
        usersRes,
        conversationsRes,
      ] = await Promise.all([
        getProfile(),
        getUsers(),
        getConversations(),
      ]);

      const profileData =
        profileRes.data?.data || profileRes.data;

      setUser(
        profileData?.user ||
        profileData?.profile ||
        profileData
      );

      setUsers(
        getArray(usersRes.data, ["users"])
      );

      setConversations(
        getArray(conversationsRes.data, [
          "conversations",
          "messages",
        ])
      );

    } catch (error) {

      console.error("Dashboard error:", error);

      if (error.response?.status === 401) {
        logout();
      }

    }

  }, []);

  useEffect(() => {

    if (isLoggedIn) {
      loadDashboard();
    }

  }, [isLoggedIn, loadDashboard]);

  // Open chat
  const openChat = async (selected) => {

    const id = getUserId(selected);

    if (!id) return;

    setSelectedUser(selected);
    setMessages([]);
    setMessage("");
    setChatLoading(true);

    try {

      const res = await getMessages(id);

      setMessages(
        getArray(res.data, ["messages"])
      );

    } catch (error) {

      console.error("Messages error:", error);

    } finally {

      setChatLoading(false);

    }

  };

  // Refresh messages
  const refreshChat = useCallback(async () => {

    if (!selectedUser) return;

    try {

      const res = await getMessages(
        getUserId(selectedUser)
      );

      setMessages(
        getArray(res.data, ["messages"])
      );

    } catch (error) {

      console.error("Refresh error:", error);

    }

  }, [selectedUser]);

  // Auto refresh every 5 seconds
  useEffect(() => {

    if (!selectedUser) return;

    const interval = setInterval(() => {
      refreshChat();
    }, 5000);

    return () => clearInterval(interval);

  }, [selectedUser, refreshChat]);

  // Send message
  const handleSend = async (e) => {

    e.preventDefault();

    if (!message.trim() || !selectedUser) return;

    const text = message.trim();

    try {

      const res = await sendMessage(
        getUserId(selectedUser),
        { message: text }
      );

      const sentMessage =
        res.data?.message ||
        res.data?.data ||
        res.data;

      setMessages((prev) => [
        ...prev,
        sentMessage,
      ]);

      setMessage("");

      loadDashboard();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Message sending failed"
      );

    }

  };

  // Authentication
  if (!isLoggedIn) {

    return showRegister ? (

      <Register
        onLogin={() => setShowRegister(false)}
        onBack={() => setShowRegister(false)}
      />

    ) : (

      <Login
        onLogin={handleLogin}
        onRegister={() => setShowRegister(true)}
      />

    );

  }

  // Dashboard
  return (

    <div className="h-screen bg-gray-100 flex overflow-hidden">

      <div
        className={`${
          selectedUser ? "hidden md:flex" : "flex"
        } w-full md:w-auto`}
      >

        <Sidebar
          user={user}
          users={users}
          conversations={conversations}
          selectedUser={selectedUser}
          onSelectUser={openChat}
          onLogout={logout}
          onRefresh={loadDashboard}
          search={search}
          setSearch={setSearch}
        />

      </div>

      <div
        className={`${
          selectedUser ? "flex" : "hidden md:flex"
        } flex-1 min-w-0`}
      >

        <ChatWindow
          selectedUser={selectedUser}
          messages={messages}
          currentUser={user}
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
          onRefresh={refreshChat}
          onBack={() => setSelectedUser(null)}
          loading={chatLoading}
        />

      </div>

    </div>

  );

}

export default App;
