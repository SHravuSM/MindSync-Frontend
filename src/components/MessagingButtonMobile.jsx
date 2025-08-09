import { useState } from "react";

const MessagingButtonMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
        onClick={() => setOpen(true)}
      >
        💬
      </button>

      {open && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
            <span className="font-semibold text-lg">Messaging</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 p-2 border-b">John Doe: Hey, how’s it going?</div>
            <div className="mb-4 p-2 border-b">Jane Smith: Let’s meet tomorrow</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagingButtonMobile;
