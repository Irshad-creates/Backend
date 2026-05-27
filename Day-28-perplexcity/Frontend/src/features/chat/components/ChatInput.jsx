import React from "react";

const ChatInput = ({ chatInput, setChatInput, handleSubmitMessage }) => {
  return (
    <footer className="sticky bottom-0 mt-4 pb-4">
      <form onSubmit={handleSubmitMessage} className="mx-auto max-w-4xl">
        <div
          className="
                flex items-end gap-3
                rounded-2xl
                border border-zinc-800
                bg-zinc-900/70
                backdrop-blur-xl
                px-5 py-4
                shadow-2xl
                transition-all
                duration-300
                focus-within:border-zinc-600
            "
        >
          <textarea
            rows={1}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto";

              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                handleSubmitMessage(e);
              }
            }}
            placeholder="Ask anything..."
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className=" max-h-40 min-h-12 flex-1  bg-transparent text-white placeholder:text-zinc-500 outline-none resize-none textarea::-webkit-scrollbar {
  display: none;
}"
            
          />

          <button
            type="submit"
            className=" 
                    flex h-11 w-11 items-center justify-center
                    rounded-full
                    bg-zinc-800
                    text-white
                    transition-all
                    hover:bg-zinc-700
                    hover:scale-105
                    active:scale-95
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
    </footer>
  );
};

export default ChatInput;
