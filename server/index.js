/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch";

dotenv.config();
const PING_INTERVAL = 5 * 60 * 1000;

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20 // 20 requests per minute
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/chat", limiter);


// OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

setInterval(async () => {
    try {
        const url = process.env.PING_URL || `https://portfolio-pa4g.onrender.com`;
        const res = await fetch(url);
        console.log(`Self-ping to ${url}: ${res.status}`);
    } catch (err) {
        console.error("Self-ping error:", err.message);
    }
}, PING_INTERVAL);

// Health check
app.get("/", (req, res) => {
    res.json({ status: "OK", message: "Chatbot API running" });
});

// Chat endpoint
app.post("/chat", async (req, res) => {
    try {
        const { messages, systemPrompt, lang } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Invalid messages format" });
        }

        // Date info
        const today = new Date();
        const formattedDate = today.toLocaleDateString(
            lang === "az" ? "az-AZ" : "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

        const systemPromptWithDate =
            systemPrompt + `\n\nToday's date is: ${formattedDate}`;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPromptWithDate },
                ...messages
            ],
            temperature: 0.6
        });

        res.json({
            reply: response.choices[0].message.content
        });

    } catch (error) {
        console.error("OpenAI error:", error);

        if (error.status === 429) {
            return res.status(429).json({
                error: "Rate limit reached. Please try again later."
            });
        }

        res.status(500).json({
            error: "Server error"
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
