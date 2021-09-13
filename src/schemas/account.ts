import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const accountSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: () => uuidv4()
    },
    userId:{
        type: String,
        required: [true, "userId is required"]
    },
    walletId: {
        type: String,
        required: [true, "walletId is required"]
    },
    balance: {
        type: Number,
        default: 0.00
    },
    description: {
        type: String
    }

},{
    timestamps: true
});

export default accountSchema;
