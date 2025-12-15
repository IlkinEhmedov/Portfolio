import { Chat } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../assets/styles/ChatBot.scss";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_MESSAGES = {
    az: "Salam, sizə necə kömək edə bilərəm?",
    en: "Hello, how can I assist you today?"
};

const systemPrompt = `
You are Ilkin's personal assistant chatbot.
You know about Ilkin's personal and professional information:
- Full Name: Ilkin Ahmadov
- Profession: Frontend Developer
- Worked Companies: Proweb | Rəqəmsal həllər (06.2025 - present) as a Frontend Developer, Project Management Sytems (12.2024 - 05.2025) as Frontend Developer, LNQ Company (04.2024 - 12.2024) as a Frontend intern
- Experience time: 2 years
- Skills: Front End --- HTML / CSS, SCSS / Bootstrap / TailwindCSS / Material UI / Chakra UI, Javascript (ES6+) / TypeScript / Jquery, React js / ContextAPI / Redux Toolkit, Thunk, Next.js (SSR / SSG / ISR). Backend --- Node.js / Express.js / MongoDB, Mongoose / RESTful API Development / JSON, Socket.io
- Projects: Proweb | Rəqəmsal həllər (Description: Modern corporate website developed using pure JavaScript, Bootstrap, and CSS, presenting company services, portfolio, blogs, news, and corporate content in a responsive layout.), Isguzar.az (Description: Developed isguzar.az, a job and service marketplace platform allowing clients and service providers to register, post listings, apply to opportunities, and communicate via real-time chat.), Azerbaijan Judo Federation (Description: Developed the official Azerbaijan Judo Federation website, presenting federation news, events, athlete information, competition results, and organizational content with a modern, responsive design.), Melhem International Hosptital (Description: Built a dynamic hospital website with user login and registration, doctor profile management, appointment scheduling, and detailed service and patient information.), Hertz Azerbaijan (Description: Built a rent-a-car website presenting car rentals, airport transfers, regional transfers, chauffeur services, and tours with a responsive and intuitive design.), NN Service (Description: Developed a service website for a household appliance repair company, presenting repair services for refrigerators, boilers, washing machines, and air conditioners with an easy booking system.), Alpi mobile az (Description: Developed the Alpi Mobile website under Bakcell, providing users with the ability to order mobile phones and SIM numbers through a clean, user-friendly interface.)
- Project links: https://proweb.az, https://isguzar.az, https://melhemhospital.com, https://hertz.org.az, https://nnservice.az, alpi mobile and Azerbaijan judo - incompleted projects
- Email: ilkin656.u@gmail.com
- Phone: +994505798656 
- Linkedin: https://www.linkedin.com/in/ilkin-ahmadov-728460249/
- instagram: https://www.instagram.com/ilkin.ahmad/
- whatsapp: https://wa.me/+994505798656
- Portfolio: https://ilkinahmadov.netlify.app
- Date of birth: 5 july 2003
- Living place: AZerbaijan, Baku city Binagadi district.
- Date of place: Azerbaijan, Ucar, Qaradaghli.
- Bachelor degree: Azerbaijan Technical university, Information technologies. graduated with honor diploma. (2020 - 2024)
- Master degree: Azerbaijan Technical university, Information technologies and telecommunication systems engineering. (2024-present)
- Langugae skilss: English-B1, Turkish-B2
- Website prices: Contact Ilkin
- CV link: user can view and download from portfolio wesbite.


IMPORTANT RULES:
1. Only share the information listed above.
2. If the user asks for information about Ilkin that is personal/private and does not exist above, answer like (English or Azerbaijani): Ilkin does not allow to share not allowed informations.
3. If the user asks my projects, just send project name and links. then send more information about project if he or she asks.

Answer politely in the language selected (English or Azerbaijani) according to the user's preference.
If the user asks unrelated questions, answer politely but briefly.
`;

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState("en");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { sender: "bot", text: DEFAULT_MESSAGES.en }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    /* ---------------------------------- Utils --------------------------------- */

    const scrollToBottom = () => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth"
        });
    };

    const isDesktop = window.innerWidth >= 1024;

    /* -------------------------------- Effects --------------------------------- */

    useEffect(scrollToBottom, [messages, isOpen]);


    const focus = () => {
        setIsOpen(x => !x)
        setTimeout(() => {
            if (isDesktop) {
                inputRef.current?.focus();
            }
        }, 100);
    }

    useEffect(() => {
        if (isDesktop) {
            console.log('inputRef.current', inputRef.current)
            inputRef.current?.focus();
        }
    }, [isOpen, isLoading, lang, isDesktop]);
    
    useEffect(() => {
        setMessages([{ sender: "bot", text: DEFAULT_MESSAGES[lang] }]);
    }, [lang]);

    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    /* ------------------------------- Chat Logic -------------------------------- */

    const buildChatPayload = (userMessage) => {
        return [...messages, userMessage]
            .filter(m => m.text)
            .map(m => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text
            }));
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: "user", text: input };
        setInput("");

        setMessages(prev => [...prev, userMessage, { sender: "bot", typing: true }]);
        setIsLoading(true);

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: buildChatPayload(userMessage),
                    systemPrompt,
                    lang
                })
            });

            if (!res.ok) throw new Error("Chat request failed");

            const { reply } = await res.json();
            typeWriter(reply);
        } catch (error) {
            console.log(error);
            setMessages(prev => [
                ...prev.slice(0, -1),
                {
                    sender: "bot",
                    text: lang === "az"
                        ? "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."
                        : "An error occurred. Please try again."
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const typeWriter = (text) => {
        let index = 0;
        const interval = setInterval(() => {
            setMessages(prev => [
                ...prev.slice(0, -1),
                { sender: "bot", text: text.slice(0, index) }
            ]);

            index++;
            if (index > text.length) clearInterval(interval);
        }, 8);
    };

    /* ------------------------------- Email Logic ------------------------------- */

    const sendEmail = async () => {
        setIsSendingEmail(true);

        try {
            const formattedMessages = messages
                .map(m => `${m.sender}: ${m.text}`)
                .join("\n");

            const res = await fetch(`${API_URL}/share-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: formattedMessages,
                    timestamp: new Date().toISOString()
                })
            });

            if (!res.ok) throw new Error("Email failed");

            toast.success(lang === "en"
                ? "Messages sent via email!"
                : "Mesajlar email ilə göndərildi!"
            );

            setIsShareOpen(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSendingEmail(false);
        }
    };

    /* ---------------------------------- UI ---------------------------------- */

    const TypingDots = () => (
        <span className="typing">
            <span />
            <span />
            <span />
        </span>
    );

    return (
        <div className={`portfolio-chatbot ${isOpen ? "is-open" : ""}`}>
            <button className="pc-toggle" onClick={focus}>
                <Chat />
                <span>Chat</span>
            </button>

            <aside className="pc-panel" aria-hidden={!isOpen}>
                <header className="pc-header">
                    <h3>İlkin {lang === "en" ? "Assistant" : "Assistent"} 🦾</h3>

                    <div className="pc-lang">
                        {["az", "en"].map(l => (
                            <button
                                key={l}
                                className={lang === l ? "active" : ""}
                                onClick={() => setLang(l)}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="share">
                        {messages.length > 2 && (
                            <button onClick={() => setIsShareOpen(p => !p)}>
                                <IoIosSend />
                            </button>
                        )}
                        <button onClick={() => setIsOpen(false)}>✕</button>

                        {isShareOpen && (
                            <div className="sendModal active">
                                <p>{lang === "en" ? "Send this chat to Ilkin" : "Söhbəti İlkinə göndər"}</p>
                                <div className="btns">
                                    <button onClick={() => setIsShareOpen(false)}>
                                        {lang === "en" ? "Cancel" : "Ləğv et"}
                                    </button>
                                    <button disabled={isSendingEmail} onClick={sendEmail}>
                                        {isSendingEmail
                                            ? lang === "en" ? "Sending..." : "Göndərilir..."
                                            : lang === "en" ? "Send" : "Göndər"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <div className="pc-messages" ref={scrollRef}>
                    {messages.map((m, i) => (
                        <div key={i} className={`pc-msg ${m.sender}`}>
                            {m.typing ? (
                                <TypingDots />
                            ) : (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {m.text}
                                </ReactMarkdown>
                            )}
                        </div>
                    ))}
                </div>

                <footer className="pc-input">
                    <input
                        autoFocus
                        ref={inputRef}
                        value={input}
                        disabled={isLoading}
                        placeholder={lang === "en" ? "Type a message..." : "Mesaj yaz..."}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage} disabled={isLoading}>
                        {lang === "en" ? "Send" : "Göndər"}
                    </button>
                </footer>
            </aside>
        </div>
    );
}

export default Chatbot;
