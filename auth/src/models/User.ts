import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes that are required to create a new user
// the interface will talk with the typescript
interface UserAttrs {
    email: string,
    password: string
}

// An interfaces that describes the properties that a User model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs) : UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}


// this is only talking with mongoose Schema, nothing related to typescript
const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    // instead of function is an object where we can send a set of options on how 
    // to transform the document to JSON
    toJSON: {
        // doc is user document
        // ret is what is going to return
        transform(doc, ret) {
            delete ret.password;
            // or set versionKey: false
            delete ret.__v;            
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

// using "function" keyword and not arrow functions to prevent that "this" keyword 
// doesn't refer to the entire model file but to the mongoose 
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    // the done function comes from mongoose to set the asyncronious work as done
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };