import { WalletTransferMoneyMessage } from "../processors/messages/wallet-transfer-money-message";
import transferRequestVerficationRepo from "../repos/transfer-request-verfication-repo";
import { TransferVerificationParams } from "../models/transferRequestVerification";
import { TransferVerificationMessage } from "../processors/messages/TransferVerificationMessage";
import { sendMessage } from "../helpers/messaging";
import eventBus from "../bus/event-bus";
import { WALLET_TRX_EVENTS_TOPIC } from "../topics";
import { TransferCompletedMessage } from "../processors/messages/TransferCompletedMessage";
import { FulfillBankPayoutMessage } from "../processors/messages/bank-payout-message";
import { createMessage } from "../utils";

export type TransferRequestMessage = WalletTransferMoneyMessage;

export interface TransferService {
    processTransferVerificationRequestMessage(message: TransferVerificationMessage): Promise<void>;
    processTransfer(requestId: String): Promise<TransferVerificationParams>;
}

class TransferServiceImpl implements TransferService {

    async processTransfer(requestId: String): Promise<TransferVerificationParams> {
        const params = await transferRequestVerficationRepo.findVerification(requestId);
        console.log("PARAMS:");
        console.log({key: params?.key});
        console.log(params);
        if (!params.approved)
            throw Error("Illegal transaction");
        switch (params.type) {
            case "wallet-transfer":
                const walletTrx = createMessage<TransferCompletedMessage, String>(TransferCompletedMessage, {
                    transferRequestId: params.transferRequestId
                }, params.key);
                await sendMessage(await eventBus, WALLET_TRX_EVENTS_TOPIC, walletTrx);
                break;

            case "bank-transfer":
                const bankTrx = createMessage<FulfillBankPayoutMessage, String>(FulfillBankPayoutMessage,{
                    ...(params.transferData)
                }, params.key);
                await sendMessage(await eventBus, WALLET_TRX_EVENTS_TOPIC, bankTrx);
                break;
            default:
                break;
        }
        return params;
    }

    async processTransferVerificationRequestMessage(message: TransferVerificationMessage): Promise<void> {
        await transferRequestVerficationRepo.createTransferRequestVerificationParams(message);
    }
}

export default new TransferServiceImpl();