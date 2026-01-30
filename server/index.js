/* eslint-disable no-undef */
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";
import { Resend } from "resend";
import multer from "multer"
import cloudinary from "./middleware/cloudinary.js"
import Portfolio from "./Models/Portfolio.js";
import mongoose from "mongoose"





dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

const upload = multer({ dest: 'uploads/' });

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/chat", limiter);


// OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const resend = new Resend(process.env.RESEND_API_KEY);

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

// Add portfolio
app.post('/portfolio', upload.single('image'), async (req, res) => {
    try {
        const { title, description, isComplete, link } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'portfolio',
            resource_type: 'image'
        });

        // Save to MongoDB
        const portfolio = await Portfolio.create({
            image: result.secure_url,
            title,
            link,
            description,
            isComplete: isComplete === "true"
        });

        res.status(201).json({
            message: "Portfolio created successfully",
            data: portfolio
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get all portfolios
app.get('/portfolio', async (req, res) => {
    try {
        const portfolios = await Portfolio.find().sort({ createdAt: -1 }).sort({ createdAt: 1 });

        res.status(200).json({
            count: portfolios.length,
            data: portfolios
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update portfolio
app.put('/portfolio/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, description, isComplete, link } = req.body;

        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        // Image update varsa
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'portfolio',
                resource_type: 'image'
            });
            portfolio.image = result.secure_url;
        }

        if (link !== undefined) portfolio.link = link;
        if (title !== undefined) portfolio.title = title;
        if (description !== undefined) portfolio.description = description;
        if (isComplete !== undefined)
            portfolio.isComplete = isComplete === "true";

        await portfolio.save();

        res.status(200).json({
            message: "Portfolio updated successfully",
            data: portfolio
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete portfolio
app.delete('/portfolio/:id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        await portfolio.deleteOne();

        res.status(200).json({
            message: "Portfolio deleted successfully"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Share Messages with email
app.post("/share-email", async (req, res) => {
    try {
        const { messages, timestamp } = req.body;

        if (!messages) {
            return res.status(400).json({ error: "No messages to send" });
        }

        await resend.emails.send({
            from: "Chatbot <onboarding@resend.dev>",
            to: [process.env.EMAIL_USER],
            subject: `Chatbot messages from user - ${timestamp}`,
            text: messages
        });


        res.json({ status: "ok", message: "Email sent successfully" });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ error: "Failed to send email" });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

mongoose.connect(MONGODB_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB error:", err));

