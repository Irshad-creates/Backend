import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/Hooks/useAuth";

const ChatsPage = () => {
  const chat = useChat();

  const navigate = useNavigate();

  const chats = useSelector((state) => state.chat.chats);

  const { handleLogout } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");

  const [deleteChatId, setDeleteChatId] = useState(null);

  const filteredChats = Object.values(chats)
    .sort(
        (a, b) =>
            new Date(b.lastUpdated) - new Date(a.lastUpdated)
    )
    .filter((chatItem) =>
        chatItem.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    )

  useEffect(() => {
    if (Object.keys(chats).length === 0) {
      chat.handleGetChats();
    }
  }, []);

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);

    navigate("/chats/new");
  };

  return (
    <AppLayout chats={chats} openChat={openChat} handleLogout={handleLogout}>
      <section className="w-full overflow-y-auto p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-4xl font-bold text-white">Chats</h1>

          {/* Search */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex flex-1 items-center rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your chats..."
                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* Empty State */}
          {filteredChats.length === 0 && (
            <div className="flex h-[50vh] items-center justify-center">
              <p className="text-zinc-500 text-lg">No chats found</p>
            </div>
          )}

          {/* Chats Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredChats.map((chatItem) => (
              <div
                key={chatItem.id}
                className="relative rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-600 hover:bg-zinc-900"
              >
                {/* Delete Button */}
                <button
                  onClick={() => setDeleteChatId(chatItem.id)}
                  className="absolute right-4 top-4 text-zinc-600 transition hover:scale-110 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07A2.25 2.25 0 0116.666 22H7.334a2.25 2.25 0 01-2.242-2.27L4.087 6.66l-.209.035a.75.75 0 11-.256-1.478A48.567 48.567 0 017.5 4.705v-.227A2.25 2.25 0 019.75 2.25h4.5a2.25 2.25 0 012.25 2.228zM10.5 10.5a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm4.5-.75a.75.75 0 00-.75.75v6a.75.75 0 001.5 0v-6a.75.75 0 00-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Card Click Area */}
                <div
                  onClick={() => openChat(chatItem.id)}
                  className="cursor-pointer"
                >
                  {/* Date */}
                  <div className="mb-6 inline-block rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
                    {new Date(chatItem.lastUpdated).toLocaleString()}
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-2xl font-semibold text-white">
                    {chatItem.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-zinc-500">Chat session</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delete Modal */}
      {deleteChatId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-2 text-2xl font-semibold text-white">
              Delete Chat?
            </h2>

            <p className="mb-6 text-zinc-400">This action cannot be undone.</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteChatId(null)}
                className="rounded-xl border border-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  chat.handleDeleteChat(deleteChatId);
                  setDeleteChatId(null);
                }}
                className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default ChatsPage;
