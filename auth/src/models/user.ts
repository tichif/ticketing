import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new User
interface userAttrs {
  email: string;
  password: string;
}

// an interface that describes the properties
// that an User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: userAttrs): UserDoc;
}

// an interface that describes the properties
// that an User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User };
