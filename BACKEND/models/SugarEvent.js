
import mongoose from 'mongoose';

const sugarEventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    itemName: { type: String, required: true },
    sugarGrams: { type: Number, required: true },
    calories: { type: Number },
    category: { type: String },
    method: { type: String, enum: ['Voice', 'Image', 'Manual'], required: true },
    correctiveActionCompleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('SugarEvent', sugarEventSchema);
