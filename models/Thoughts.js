const { Schema, model} = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        reactionBody:{
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeStamp(date)
        }
    },
    {toJSON: {
        getters: true,
    },
    id: false
}    
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            get: (date) => timeStamp(date)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, 
        },
        id: false,
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

