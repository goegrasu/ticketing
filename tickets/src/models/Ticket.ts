import mongoose from 'mongoose';

interface TicketsAttr {
    title: string;
    price: number;
    userId: string;
}

interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

interface TicketModel extends mongoose.Model<any> {
    build(attrs: TicketsAttr): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
    title: {
        // this is the global String constructor in javascript, is the mongoose related not typescript
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketSchema.statics.build = (attrs: TicketsAttr) => {
    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };