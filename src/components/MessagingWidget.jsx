import { useState, useEffect } from "react";

const MessagingWidget = ({ isMobile }) => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  // Simulate receiving a new message
  useEffect(() => {
    const timer = setTimeout(() => {
      setUnread(3);
      if (!isMobile) setOpen(true); // auto-open on desktop
    }, 3000); // after 3s
    return () => clearTimeout(timer);
  }, [isMobile]);

  if (isMobile) {
    return (
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        onClick={() => setOpen(!open)}
      >
        💬
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 py-0.5 rounded-full">
            {unread}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-0 left-0 bg-gray-800 text-white transition-all duration-300 ${
        open ? "w-72 h-64" : "w-60 h-10"
      } rounded-t-md shadow-lg`}
    >
      <div
        className="flex items-center justify-between p-2 cursor-pointer bg-gray-900"
        onClick={() => setOpen(!open)}
      >
        <span>Messages</span>
        {unread > 0 && (
          <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">
            {unread}
          </span>
        )}
      </div>

      {open && (
        <div className="p-3 overflow-y-auto">
          <p>Chat messages here...</p>
        </div>
      )}
    </div>
  );
};

export default MessagingWidget;