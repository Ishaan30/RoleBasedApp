const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    // tokens object for maintaining multiple logins
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Custom property to get all tasks of a user
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});
// Custom method on instance to return userobject without password and tokens
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ user: { id: user._id, role: user.role } }, 'valorant');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}
// Custom static method on schema to check if user exists and password is correct
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
        throw new Error('Unable to login');
    }
    return user;
}
// Hashing the password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})
// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next()
})

const User = mongoose.model('User', userSchema);
module.exports = User