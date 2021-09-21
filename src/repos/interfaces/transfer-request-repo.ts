import { Document } from "mongoose";
import { WalletTransferRequest } from "../../models/walletTransfer";
import { WalletTransferMoneyMessageParams } from "../../processors/messages/wallet-transfer-money-message";

export class TransferDocument extends Document<WalletTransferMoneyMessageParams> implements WalletTransferMoneyMessageParams{
    currency: string;
    sourceWalletId: string;
    destinationWalletId: string;
    amount: number;
    requestId: string;
}

export interface ITransferRequestRepo{
    createWalletTransferRequest(request: WalletTransferRequest): Promise<any>;
}