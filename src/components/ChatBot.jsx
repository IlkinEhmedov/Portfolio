import { Chat } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../assets/styles/ChatBot.scss";

const API_URL = import.meta.env.VITE_API_URL;
const systemPrompt = import.meta.env.VITE_SYSTEM_PROMTP;

const DEFAULT_MESSAGES = {
    az: "Salam, sizə necə kömək edə bilərəm?",
    en: "Hello, how can I assist you today?"
};


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

    const focus = () => {
        setIsOpen(x => !x)
        setTimeout(() => {
            if (isDesktop) {
                inputRef.current?.focus();
            }
        }, 100);
    }

    /* -------------------------------- Effects --------------------------------- */

    useEffect(scrollToBottom, [messages, isOpen]);

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
