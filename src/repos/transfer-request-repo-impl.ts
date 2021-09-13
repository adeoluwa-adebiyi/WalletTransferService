import { Document } from "mongoose";
import walletTransfer, { WalletTransferRequest } from "../models/walletTransfer";
import { WalletTransferMoneyMessageParams } from "../processors/messages/wallet-transfer-money-message";
import { ITransferRequestRepo, TransferDocument } from "./interfaces/transfer-request-repo";

export class TransferRequestRepo implements ITransferRequestRepo{

    async createWalletTransferRequest(request: WalletTransferRequest): Promise<any> {
        return await new walletTransfer(request).save();
    }

}

export default new TransferRequestRepo();