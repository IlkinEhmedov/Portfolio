import { Chat } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../assets/styles/ChatBot.scss";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";

const API_URL = import.meta.env.VITE_API_URL

const systemPrompt = `
You are Ilkin's personal assistant chatbot.
You know about Ilkin's personal and professional information:
- Full Name: Ilkin Ahmadov
- Profession: Frontend Developer
- Worked Companies: Proweb | Rəqəmsal həllər (06.2025 - present) as a Frontend Developer, Project Management Sytems (12.2024 - 05.2025) as Frontend Developer, LNQ Company (04.2024 - 12.2024) as a Frontend intern
- Experience time: 2 years
- Skills: Front End --- HTML / CSS, SCSS / Bootstrap / TailwindCSS / Material UI / Chakra UI, Javascript (ES6+) / TypeScript / Jquery, React js / ContextAPI / Redux Toolkit, Thunk, Next.js (SSR / SSG / ISR). Backend --- Node.js / Express.js / MongoDB, Mongoose / RESTful API Development / JSON, Socket.io
- Projects: Proweb | Rəqəmsal həllər (Description: Modern corporate website developed using pure JavaScript, Bootstrap, and CSS, presenting company services, portfolio, blogs, news, and corporate content in a responsive layout.), Isguzar.az (Description: Developed isguzar.az, a job and service marketplace platform allowing clients and service providers to register, post listings, apply to opportunities, and communicate via real-time chat.), Azerbaijan Judo Federation (Description: Developed the official Azerbaijan Judo Federation website, presenting federation news, events, athlete information, competition results, and organizational content with a modern, responsive design.), Melhem International Hosptital (Description: Built a dynamic hospital website with user login and registration, doctor profile management, appointment scheduling, and detailed service and patient information.), Hertz Azerbaijan (Description: Built a rent-a-car website presenting car rentals, airport transfers, regional transfers, chauffeur services, and tours with a responsive and intuitive design.), NN Service (Description: Developed a service website for a household appliance repair company, presenting repair services for refrigerators, boilers, washing machines, and air conditioners with an easy booking system.), Alpi mobile az (Description: Developed the Alpi Mobile website under Bakcell, providing users with the ability to order mobile phones and SIM numbers through a clean, user-friendly interface.)
- Project links: https://proweb.az, https://isguzar.az, https://melhemhospital.com, https://hertz.org.az, https://nnservice.az
- Email: ilkin656.u@gmail.com
- Phone: +994505798656 
- Linkedin: https://www.linkedin.com/in/ilkin-ahmadov-728460249/
- instagram: https://www.instagram.com/ilkin.ahmad/
- whatsapp: https://wa.me/+994505798656
- Portfolio: https://ilkinahmadov.netlify.app
- Date of birth: 5 july 2003
- Date of place Azerbaijan, Ucar, Qaradaghli.
- Bachelor degree: Azerbaijan Technical university, Information technologies. graduated with honor diploma. (2020 - 2024)
- Master degree: Azerbaijan Technical university, Information technologies and telecommunication systems engineering. (2024-present)
- Langugae skilss: English-B1, Turkish-B2
- Website prices: Contact Ilkin
- CV link: user can view and download from portfolio wesbite.


IMPORTANT RULES:
1. Only share the information listed above.
2. If the user asks for information about Ilkin that is personal/private and does not exist above, answer like (English or Azerbaijani): Ilkin does not allow to share not allowed informations.

Answer politely in the language selected (English or Azerbaijani) according to the user's preference.
If the user asks unrelated questions, answer politely but briefly.
`;

function Chatbot() {

    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState("en");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMessageSending, setisMessageSending] = useState(false)
    const [sendModalOpen, setsendModalOpen] = useState(false)
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    const [messages, setMessages] = useState([
        { sender: "bot", text: lang === "az" ? "Salam, sizə necə kömək edə bilərəm?" : "Hello, how can I assist you?" }
    ]);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, open]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        setLoading(true);
        const userInput = input;
        setInput("");

        const userMsg = { sender: "user", text: userInput };

        // add user message + typing indicator
        setMessages(m => [...m, userMsg, { sender: "bot", typing: true }]);

        const safeMessages = [...messages, userMsg]
            .filter(m => m.text && typeof m.text === "string")
            .map(m => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text
            }));

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: safeMessages, systemPrompt, lang })
            });

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            const aiText = data.reply;

            // Typewriter effect
            let i = 0;
            const interval = setInterval(() => {
                if (i <= aiText.length) {
                    setMessages(prev => [
                        ...prev.slice(0, -1), // remove previous typing/partial message
                        { sender: "bot", text: aiText.slice(0, i) }
                    ]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 20); // hər hərf üçün 20ms, istəyə görə sürəti dəyişə bilərsiniz

        } catch (err) {
            console.error(err);
            setMessages(m => [
                ...m.slice(0, -1),
                { sender: "bot", text: lang === "az" ? "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin." : "An error occurred. Please try again." }
            ]);
        }

        setLoading(false);
    };







    // ESC close
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && open) setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const changeLang = (lang) => {
        setLang(lang)
    }

    useEffect(() => {
        const defaultMessage =
            lang === "az"
                ? "Salam, sizə necə kömək edə bilərəm?"
                : "Hello, how can I assist you?";

        setMessages([{ sender: "bot", text: defaultMessage }]);
    }, [lang]);

    const openModal = () => {
        setOpen((s) => !s)

        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop) {
            inputRef.current.focus();
        }
    }

    useEffect(() => {
        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop && open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open, loading, messages, lang]);


    const TypingDots = () => {
        return (
            <span className="typing">
                <span></span>
                <span></span>
                <span></span>
            </span>
        );
    };

    const sendEmail = async () => {
        setisMessageSending(true)
        try {
            const userMessages = messages
                .map(m => m.sender === "user" ? "user: " + m.text : "bot: " + m.text)
                .join("\n");

            const res = await fetch(`${API_URL}/share-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: userMessages,
                    timestamp: new Date().toISOString()
                })
            });

            if (!res.ok) throw new Error("Failed to send email");
            setisMessageSending(false)
            setsendModalOpen(false)
            toast.success(lang === "en" ? "Messages sent via email!" : "Mesajlar email ilə göndərildi!");
        } catch (err) {
            setisMessageSending(false)
            console.error(err);
        }
    }



    return (
        <div className={`portfolio-chatbot ${open ? "is-open" : ""}`} aria-live="polite">
            <button
                className="pc-toggle"
                aria-label={open ? "Close chat" : "Open chat"}
                aria-expanded={open}
                onClick={() => openModal()}
            >
                <span className="pc-icon" aria-hidden><Chat /></span>
                <span className="pc-label">Chat</span>
            </button>

            <aside className="pc-panel" role="dialog" aria-modal="false" aria-hidden={!open}>
                <header className="pc-header">
                    <div className="pc-title">İlkin {lang === 'en' ? "Assistant" : "Assistent"} 🦾</div>


                    <div className="pc-lang">
                        <button
                            className={lang !== "az" ? "active" : ""}
                            onClick={() => changeLang("az")}
                        >
                            AZ
                        </button>
                        <button
                            className={lang !== "en" ? "active" : ""}
                            onClick={() => changeLang("en")}
                        >
                            EN
                        </button>
                    </div>
                    <div className="share">
                        {messages.length >= 3 &&
                            <button
                                className={`pc-share active`}
                                onClick={() => setsendModalOpen(x => !x)}
                            >
                                <IoIosSend />
                            </button>
                        }
                        <button className="pc-close" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
                        <div className={`sendModal ${sendModalOpen ? "active" : ""}`}>
                            <p>Send this chat to Ilkin</p>
                            <div className="btns">
                                <button onClick={() => setsendModalOpen(x => !x)}>Cancel</button>
                                <button disabled={isMessageSending} onClick={sendEmail}>{!isMessageSending ? "Send" : "Sending..."}</button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="pc-messages" ref={scrollRef}>
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`pc-msg ${m.sender === "bot" ? "bot" : "user"}`}
                            role={m.sender === "bot" ? "status" : "article"}
                        >
                            {m.typing ? (
                                <TypingDots />
                            ) : (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        a: ({ href, children }) => (
                                            <a href={href} target="_blank" rel="noopener noreferrer">
                                                {children}
                                            </a>
                                        )
                                    }}
                                >
                                    {m.text}
                                </ReactMarkdown>
                            )}

                        </div>
                    ))}
                </div>


                <footer className="pc-input">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={lang === "en" ? "Type a message..." : "Mesaj yaz..."}
                        value={input}
                        disabled={loading}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => !loading && e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage} disabled={loading}>
                        {loading ? <TypingDots />
                            : (lang === "en" ? "Send" : "Göndər")}
                    </button>
                </footer>
            </aside>
        </div>
    );
}

export default Chatbot;
