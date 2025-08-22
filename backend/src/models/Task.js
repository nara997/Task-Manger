import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
