import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean, 
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User