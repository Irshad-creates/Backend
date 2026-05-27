import React, { useState } from "react";
import axios from "axios";

import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/Hooks/useAuth";
import toast from "react-hot-toast";

const EmailPage = () => {
  const chats = useSelector((state) => state.chat.chats);

  const navigate = useNavigate();

  const chat = useChat();

  const { handleLogout } = useAuth();

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    prompt: "",
  });

  const [loading, setLoading] = useState(false);

  const emailSuggestions = [
    "Write a professional leave request email",
    "Write a cold outreach email for internship",
    "Write a meeting follow-up email",
    "Write a professional apology email",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuggestionClick = (text) => {
    setFormData({
      ...formData,
      prompt: text,
    });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/email/send",
        formData,
      );

      toast.success("Email sent successfully");

      setFormData({
        to: "",
        subject: "",
        prompt: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);

    navigate("/chats/new");
  };

  return (
    <AppLayout chats={chats} openChat={openChat} handleLogout={handleLogout}>
      <section className="relative flex w-full justify-center overflow-y-auto p-4 md:p-8">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-150px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="absolute bottom-[-150px] right-[10%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
        </div>

        <div className="w-full max-w-6xl">
          {/* Hero */}
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10 text-white"
                >
                  <path d="M1.5 4.5h21v15h-21v-15Zm1.5 1.5v.511l9 5.4 9-5.4V6h-18Zm18 12v-9.339l-8.614 5.168a.75.75 0 0 1-.772 0L3 8.661V18h18Z" />
                </svg>
              </div>
            </div>

            <h1 className="mb-3 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              AI Email Assistant
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-zinc-400 md:text-base">
              Generate professional emails instantly using AI. Just enter
              recipient details and describe what you want.
            </p>
          </div>

          {/* Suggestion Pills */}
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {emailSuggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="
                  shrink-0 rounded-full
                  border border-zinc-700
                  bg-zinc-900/40
                  px-4 py-2
                  text-xs text-zinc-400
                  transition-all duration-300
                  hover:border-zinc-500
                  hover:bg-zinc-800
                  hover:text-white
                  md:text-sm
                "
              >
                {item}
              </button>
            ))}
          </div>

          {/* Main Layout */}
          <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
            {/* Form */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl md:p-8">
              <h2 className="mb-6 text-2xl font-semibold text-white">
                Compose Email
              </h2>

              <form onSubmit={handleSendEmail} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Recipient
                  </label>

                  <input
                    type="email"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="
                      w-full rounded-2xl
                      border border-zinc-800
                      bg-black/40
                      px-5 py-4
                      text-white
                      outline-none
                      placeholder:text-zinc-500
                      transition-all
                      focus:border-zinc-600
                    "
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Email subject..."
                    className="
                      w-full rounded-2xl
                      border border-zinc-800
                      bg-black/40
                      px-5 py-4
                      text-white
                      outline-none
                      placeholder:text-zinc-500
                      transition-all
                      focus:border-zinc-600
                    "
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    AI Instructions
                  </label>

                  <textarea
                    rows={10}
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleChange}
                    placeholder="Describe the email you want AI to write..."
                    className="
                      w-full resize-none rounded-2xl
                      border border-zinc-800
                      bg-black/40
                      px-5 py-4
                      text-white
                      outline-none
                      placeholder:text-zinc-500
                      transition-all
                      focus:border-zinc-600
                    "
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-2xl
                    bg-white
                    px-6 py-4
                    font-medium text-black
                    transition-all duration-300
                    hover:scale-[1.01]
                    hover:bg-zinc-200
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      Sending Email...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M1.5 12 21 3l-4.5 18-6-6-3 3V12l-6-6Z" />
                      </svg>
                      Generate & Send Email
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side Info */}
            <div className="space-y-4">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  What this can do
                </h3>

                <div className="space-y-4 text-sm text-zinc-400">
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />

                    <p>Generate professional AI-written emails instantly.</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-purple-500" />

                    <p>
                      Create outreach, apology, leave request, and business
                      emails.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-pink-500" />

                    <p>Powered using Mistral AI for natural responses.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">Tips</h3>

                <div className="space-y-3 text-sm text-zinc-400">
                  <p>• Be specific with your instructions.</p>

                  <p>• Mention tone like professional, friendly, or formal.</p>

                  <p>• Include important details AI should mention.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default EmailPage;
