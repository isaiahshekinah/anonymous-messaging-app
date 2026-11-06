import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Messages() {
  const { username } = useParams();

  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!content.trim()) {
      setMessage("Please enter a message");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("https://anonymously-yours.vercel.app/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "could not send message");
        return;
      }

      setMessage("Message sent successfully");
      setContent("");
    } catch (error) {
      setMessage("Could not connect to server");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (message === "Message sent successfully") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      <header className="flex items-center justify-between bg-gray-100 pt-6 md:px-9 px-4">
        <div className="flex items-center gap-1  font-extrabold md:text-[24px] text-[18px]">
          <div className="w-6 h-6">
            <img src="/anony.jpg" className="rounded" />
          </div>
          ANONYMOUSLY
        </div>

        <button className="bg-black text-white text-[14px] md:px-6 px-4 py-2 rounded-xl hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in font-bold">
          <Link to="/signup">Sign up</Link>
        </button>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="md:min-h-150 min-h-120 bg-gray-100 flex flex-col items-center justify-center px-4 font-sans">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center border-b border-gray-100 pb-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6">
                  <img src="anony.jpg" className="rounded"/>
                </div>
                <div className="font-bold text-gray-900 md:text-[17px] text-[15px]">
                  Send me an anonymous confession to {username}
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows="4"
                placeholder="Type your anonymous message here..."
                className="w-full bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-md text-gray-900 focus:outline-none focus:ring-2 black focus:bg-white resize-none transition md:placeholder:text-lg"
                maxLength={250}
                required
              ></textarea>
            </div>
            {message && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-xl p-3 text-sm font-medium ${
                  message === "Message sent successfully"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          <div className="w-full max-w-lg mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-black/90 text-white font-medium py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md transition"
            >
              <span>{loading ? "Sending..." : "Send Anonymous Message"} </span>
              <Send className="w-4 h-4" />
            </button>
            <a className="block py-4 text-center text-pink-900 font-bold"><Link to="/signup">Sign up to share your link</Link></a>
          </div>
        </div>
      </form>
    </div>
  );
}
