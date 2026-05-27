import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../hooks/useChat.js";
import { useNavigate, NavLink } from "react-router-dom";
import { setCurrentChatId } from "../chat.slice.js";
import { useAuth } from "../../auth/Hooks/useAuth.js";

import AppLayout from "../components/AppLayout";

const Dashboard = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  const { handleLogout } = useAuth();

  useEffect(() => {
    chat.handleGetChats();
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedMessage = searchInput.trim();
    if (!trimmedMessage) {
      return;
    }
    console.log(
      `🏠 Dashboard: Starting chat with currentChatId:`,
      currentChatId,
    );
    handleStartChat(trimmedMessage);
  };

  const handleStartChat = (message) => {
    console.log(
      `🚀 Dashboard: handleStartChat called with currentChatId:`,
      currentChatId,
    );
    chat.handleSendMessage({ message, chatId: currentChatId || null });
    navigate("/chats/new");
    setSearchInput("");
  };

  const handleSuggestionClick = (suggestion) => {
    handleStartChat(suggestion);
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
    navigate("/chats/new");
  };

  const suggestedQuestions = [
    "Summarize this: TechCrunch | Startup and Technology News",
    "Tell me more about The Latest News in Technology ...",
    "What are the top 5 programming news today?",
    "Explain the latest tech market shifts",
  ];

  const newsResults = [
    {
      title: "TechCrunch | Startup and Technology News",
      source: "NEWS · TECHCRUNCH.COM",
    },
    {
      title: "The Latest News in Technology | PCMag",
      source: "NEWS · PCMAG.COM",
    },
    {
      title: "Technology - The New York Times",
      source: "NEWS · NYTIMES.COM",
    },
    {
      title: "Tech | CNN Business",
      source: "NEWS · CNN.COM",
    },
  ];

  return (
    <AppLayout chats={chats} openChat={openChat} handleLogout={handleLogout}>
      {/* Home Content Section */}
      <section className="relative w-full min-w-0 flex flex-1 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>
        <div className="mx-auto flex h-full w-full flex-col px-4 py-4 overflow-y-auto">
          {/* Perplexity Logo and Title */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex  items-center justify-center mb-10">
              <svg
                role="img"
                className="h-14 sm:h-16 md:h-20 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.73486 2L11.4299 7.24715V7.24595V2.01211H12.5385V7.27063L18.2591 2V7.98253H20.6078V16.6118H18.2663V21.9389L12.5385 16.9066V21.9967H11.4299V16.9896L5.74131 22V16.6118H3.39258V7.98253H5.73486V2ZM10.5942 9.0776H4.50118V15.5167H5.73992V13.4856L10.5942 9.0776ZM6.84986 13.9715V19.5565L11.4299 15.5225V9.81146L6.84986 13.9715ZM12.5704 15.4691L17.1577 19.4994V16.6118H17.1518V13.9663L12.5704 9.80608V15.4691ZM18.2663 15.5167H19.4992V9.0776H13.4516L18.2663 13.4399V15.5167ZM17.1505 7.98253V4.51888L13.3911 7.98253H17.1505ZM10.6028 7.98253L6.84346 4.51888V7.98253H10.6028Z"></path>
              </svg>

              <h1
                className="
                text-5xl
                sm:text-6xl
                md:text-8xl
                font-light
                text-center
                leading-none
              "
              >
                Perplexity
              </h1>
            </div>
            {/* Categories */}
            <div className="flex gap-1.5 md:gap-3 mb-8 flex-nowrap justify-center px-2 overflow-x-auto">
              <button
                onClick={() => handleSuggestionClick("Trending Tech")}
                className="flex items-center gap-1 px-2 py-1 rounded-full border text-zinc-500 border-white/30 hover:border-white hover:text-white cursor-pointer text-[10px] sm:text-xs md:text-sm transition whitespace-nowrap md:px-3 md:py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="size-6"
                  className="h-4 w-4 md:h-5 md:w-5 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                Trending Tech
              </button>
              <button
                onClick={() => handleSuggestionClick("Startups")}
                className="flex items-center gap-1 px-2 py-1 rounded-full border text-zinc-500 border-white/30 hover:border-white hover:text-white cursor-pointer text-[10px] sm:text-xs md:text-sm transition whitespace-nowrap md:px-3 md:py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="size-6"
                  className="h-4 w-4 md:h-5 md:w-5 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                Startups
              </button>
              <button
                onClick={() => handleSuggestionClick("AI Tools")}
                className="flex items-center gap-1 px-2 py-1 rounded-full border text-zinc-500 border-white/30 hover:border-white hover:text-white cursor-pointer text-[10px] sm:text-xs md:text-sm transition whitespace-nowrap md:px-3 md:py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="size-6"
                  className="h-4 w-4 md:h-5 md:w-5 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
                AI Tools
              </button>
              <button
                onClick={() => handleSuggestionClick("Gadgets")}
                className="flex items-center gap-1 px-2 py-1 rounded-full border text-zinc-500 border-white/30 hover:border-white hover:text-white cursor-pointer text-[10px] sm:text-xs md:text-sm transition whitespace-nowrap md:px-3 md:py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-compass-icon lucide-compass"
                  className="h-4 w-4 md:h-5 md:w-5 shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
                </svg>
                Gadgets
              </button>
            </div>

            {/* Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-3xl mb-10"
            >
              <div
                className="
                flex items-end gap-3
                rounded-2xl
                border border-zinc-800
                bg-zinc-900/70
                backdrop-blur-xl
                px-5 py-4
                shadow-2xl
                transition-all duration-300
                focus-within:border-zinc-600
    "
              >
                <textarea
                  rows={1}
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  onInput={(e) => {
                    e.target.style.height = "auto";

                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();

                      handleSearchSubmit();
                    }
                  }}
                  placeholder="Ask anything..."
                  style={{
                    scrollbarWidth: "none",
                  }}
                  className="
    flex-1
    bg-transparent
    text-white
    text-lg
    outline-none
    placeholder:text-zinc-500
    resize-none
  "
                />

                <button
                  type="submit"
                  disabled={!searchInput.trim()}
                  className="
                  flex h-11 w-11 items-center justify-center
                  rounded-full
                  bg-zinc-800
                  text-white
                  transition-all
                  hover:bg-zinc-700
                  hover:scale-105
                  active:scale-95
                  disabled:opacity-50
                "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M3.4 20.4L20.85 12.93C21.63 12.6 21.63 11.4 20.85 11.07L3.4 3.6C2.74 3.32 2.04 3.93 2.24 4.62L4.18 11L13 12L4.18 13L2.24 19.38C2.04 20.07 2.74 20.68 3.4 20.4Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Suggested Questions */}
          <div className="mb-8 px-4">
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-white/80"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* News Results Grid */}

          <div className="mb-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {newsResults.map((news, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(news.title)}
                  className="p-4 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition text-left"
                >
                  <div className="mb-3 text-zinc-500">
                    {index === 0 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                    )}

                    {index === 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    )}

                    {index === 2 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                        />
                      </svg>
                    )}

                    {index === 3 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-compass-icon lucide-compass"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-300 mb-1">
                    {news.title}
                  </h3>
                  <p className="text-xs text-white/60">{news.source}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities Section */}
          <div className="px-4">
            <h2 className="text-white/60 font-semibold text-sm mb-4">
              CAPABILITIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NavLink
                to="/Email"
                className="p-4 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="h-6 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                  </svg>
                  <h3 className="font-semibold text-white">Send Emails</h3>
                </div>
                <p className="text-sm text-white/70">
                  Draft and send professional emails straight from the chat
                  interface.
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Dashboard;
