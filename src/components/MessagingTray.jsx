import { useState } from "react";

const MessagingTray = () => {
  const [openChats, setOpenChats] = useState([]);
  const [minimized, setMinimized] = useState(true);

  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how’s it going?" },
    { id: 2, name: "Jane Smith", lastMessage: "Let's meet tomorrow" },
  ];

  const openChat = (chat) => {
    if (!openChats.find((c) => c.id === chat.id)) {
      setOpenChats([...openChats, chat]);
      setMinimized(false);
    }
  };

  const closeChat = (id) => {
    setOpenChats(openChats.filter((c) => c.id !== id));
  };

  return (
    <div className="fixed bottom-0 right-0 flex items-end gap-2 p-2 z-50">
      {/* Chat Windows */}
      {openChats.map((chat) => (
        <div
          key={chat.id}
          className="w-72 bg-white border border-gray-300 rounded-t-lg shadow-lg flex flex-col"
        >
          {/* Header */}
          <div className="bg-gray-100 p-2 flex justify-between items-center cursor-pointer">
            <span className="font-semibold">{chat.name}</span>
            <button onClick={() => closeChat(chat.id)}>✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-2 overflow-y-auto text-sm">
            <div className="mb-2 text-gray-600">{chat.lastMessage}</div>
          </div>

          {/* Input */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button className="ml-1 text-blue-600 font-bold">Send</button>
          </div>
        </div>
      ))}

      {/* Messaging Bar */}
      {minimized && (
        <div
          className="bg-gray-100 border border-gray-300 rounded-t-lg px-4 py-2 shadow cursor-pointer hover:bg-gray-200"
          onClick={() => {
            setMinimized(false);
            openChat(chats[0]); // Open first chat for demo
          }}
        >
          Messaging
        </div>
      )}
    </div>
  );
};

export default MessagingTray;