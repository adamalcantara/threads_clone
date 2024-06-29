import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    // One user can have many threads
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    onboarded: {
        type: Boolean,
        default: false,
    },
    // One user can have many communities
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
});

// fall back to creating a user if there isn't a mongoose model in the database
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;