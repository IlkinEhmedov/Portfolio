import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        isComplete: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
