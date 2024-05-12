import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;
