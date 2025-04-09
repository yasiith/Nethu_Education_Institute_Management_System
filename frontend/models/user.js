import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      password: {
        type: String,
        required: [true, 'password is required'],
      },
      role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'student',
      },
});

const User = models.User || model("User", UserSchema);

export default User;
