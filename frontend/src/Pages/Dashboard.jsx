import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { token, logout } = useUserContext();
  const [messageLink, setMessageLink] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesError, setMessagesError] = useState("");
  const [messagesLoading, setMessagesLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function getLink() {
      try {
        const res = await fetch("http://localhost:3000/mylink", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          return;
        }

        setMessageLink(data.link);
      } catch (error) {
        setError("Could not connect to server");
      }
    }

    if (token) {
      getLink();
    }
  }, [token]);

  useEffect(() => {
    async function getMessages() {
      try {
        setMessagesLoading(true);
        setMessagesError("");

        const res = await fetch("http://localhost:3000/message", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setMessagesError(data.message || "Could not load messages");
          return;
        }

        setMessages(data.message);
      } catch {
        setMessagesError("Could not connect to server");
      } finally {
        setMessagesLoading(false);
      }
    }

    if (token) {
      getMessages();
    }
  }, [token]);


  function handleLogout() {
  logout();
  navigate("/login", { replace: true });
}

  return (
    <div className="min-h-screen bg-white flex text-gray-900 font-sans relative overflow-hidden">
      <aside className="w-64 border-r border-gray-100 flex flex-col justify-between py-6 px-4 bg-white select-none">
        <div>
          <div className="text-xl font-bold mb-6">Anonymous</div>

          <nav className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 font-semibold text-gray-900 transition-colors">
              <span>Inbox</span>
            </div>
          </nav>
        </div>

        <div>
          <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 items-center justify-center min-h-screen p-8 lg:p-12 ">
        <div className="md:100 lg:w-150 bg-white border border-gray-200 rounded-2xl px-9 py-8 shadow-sm">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center border border-pink-100 shadow-inner">
                <span className="text-lg">💌</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-base">
                  Send me an anonymous confession
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{messageLink}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400   ">
              <button className="p-2 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition"></button>
              <button className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg transition"></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(messageLink);
                  alert("Link Copied!");
                } catch {
                  setError("Could not copy link");
                }
              }}
              disabled={!messageLink}
              className="flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-xl font-medium text-sm hover:bg-gray-800 transition shadow-sm"
            >
              <span>Copy Link</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-50 text-gray-900 border border-gray-200/60 py-3 px-4 rounded-xl font-medium text-sm hover:bg-gray-100 transition">
              <span>Share</span>
            </button>
            {error && <p className="text-red-600">{error}</p>}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"></span>
              <span className="flex items-center gap-1.5"></span>
            </div>

            <button className="flex items-center gap-1.5 text-gray-600 hover:text-black font-medium transition"></button>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-8">
          <h2 className="text-xl font-bold mb-4">
            Your Messages ({messages.length})
          </h2>

          {messagesLoading ? (
            <p className="text-gray-500">Loading messages...</p>
          ) : messagesError ? (
            <p className="text-red-600">{messagesError}</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500">
              No messages yet. Share your link to receive anonymous messages!
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="border border-gray-200 rounded-2xl p-5 shadow-sm"
                >
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {msg.content}
                  </p>

                  {msg.created_at && (
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
