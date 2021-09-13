import { Document } from "mongoose";
import { TransferVerificationParams } from "../../models/transferRequestVerification";
import { TransferType } from "../../schemas/transferRequestVerification";


export class TransferVerificationDocument extends Document<TransferVerificationParams> implements TransferVerificationParams{
    transferRequestId: String;
    approved: Boolean;
    type: TransferType;
    transferData: String;
}

export interface TransferVerificationRepo{
    createTransferRequestVerificationParams(request: TransferVerificationParams): Promise<any>;
    findVerification(requestId: String): Promise<any>;
}