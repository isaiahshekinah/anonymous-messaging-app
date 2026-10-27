import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function Messages() {

    const { username } = useParams();

    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
      event.preventDefault();

      if(!content.trim()) {
        setMessage("Please enter a message");
        return;
      }

      try {
        setLoading(true);
        setMessage("");

        const res = await fetch("http://localhost:3000/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username, 
            content
          })
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
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 font-sans">
      
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
        
        <div className="flex items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <span className="font-semibold text-gray-900 text-md">Send me an anonymous confession to {username}</span>
          </div>
        </div>

        <div className="relative">
          <textarea 
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows="4" 
            placeholder="Type your anonymous message here..."
            className="w-full bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-md text-gray-900 focus:outline-none focus:ring-2 black focus:bg-white resize-none transition placeholder:text-lg"
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
        type='submit'
        disabled={loading}
        className="w-full bg-black hover:bg-black/90 text-white font-medium py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md transition">
          <span>{loading ? "Sending..." : "Send Anonymous Message"} </span>
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>

    </form>
    </div>
  )
}