import mongoose, { mongo } from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: (pass) => {
                /^(?=.[a-z])(?=.[A-Z])(?=.*\W).{8,}$/.test(pass)
            },
            message: () => `password must be 8 character above,
                        one spiceal character, one uppercase, one lowercase
            `
        }
    },
    email: {
        type: String,
        required: true,
        unique : true,
        validate: {
            validator: (mail) => {
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)
            },
            message: () => `invaild email address.`
        }
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: (num) => {
                /^\d{10}$/.test(num)
            },
            message: () => `Phone number must be 10 digit.`
        }
    },
    role: {
        type: String,
        required: true,
        enum: ["customer", "provider", "admin"]
    }
})

const UserModel = mongoose.model('auth_user', UserSchema)

export default UserModel;