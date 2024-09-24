const { Schema, model } = require('mongoose');
const { getMaxListeners } = require('./Thoughts');
const { Thoughts } = require('.');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxLength: 50
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxLength: 50,
        },
        Thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
        ]
    },
    {
        toJSON: {
            virtuals:true,
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});

const user = model('User', userSchema);

module.exports = user;