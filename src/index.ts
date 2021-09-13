import { Consumer as KafkaConsumer, EachBatchPayload, Kafka, KafkaConfig } from "kafkajs";
import * as topics from "./topics";
import config from "../src/config";
import { KafkaService } from "./kafka";
import { WalletCreditMessage } from "./processors/messages/WalletCreditMessage";
import { connect } from "./db/connection";
import app from "./app";
import { Message } from "./processors/messages/interface/message";
import { WALLET_CREATED, WALLET_CREDIT } from "./message_types";
import { matchMessage } from "./helpers/messages";
import TransferService, { TransferRequestMessage } from "./services/transferService";
import { WalletCreatedMessage } from "./processors/messages/account-created-msg";
import { WalletTransferMoneyMessage } from "./processors/messages/wallet-transfer-money-message";
import { UserAccountBalance, USER_ACCOUNT_BALANCE_MSG } from "./processors/messages/UserAccountBalance";
import AccountService from "./services/accountService";
import { TransferVerificationMessage } from "./processors/messages/TransferVerificationMessage";

export const WALLET_TRANSFER_REQUEST_MSG = "wallet-transfer-money-message";
export const TRANSFER_VERIFICATION_MSG = "transfer-verification-message";

const processTrxEvents = async ()=>{
    const kafkaService = await KafkaService.getInstance();
    await kafkaService.consumer.subscribe({ topic: topics.WALLET_TRX_EVENTS_TOPIC, });

    await kafkaService.consumer.run({
        autoCommit:true,
        eachBatch: async(payload: EachBatchPayload) => {
            for (let message of payload.batch.messages){
                console.log(message);
                // matchMessage(USER_ACCOUNT_BALANCE_MSG, message.value.toString(), new UserAccountBalance(), handleUserAccountBalanceEvent);
                matchMessage(TRANSFER_VERIFICATION_MSG, message.value.toString(), new TransferVerificationMessage(), handleTransferVerificationEvent)
            }
        }
    })
}

export interface MessageHandler{
    (message: Message): any;
}


// const handleUserAccountBalanceEvent = async(message: UserAccountBalance) => {
//     AccountService.processUserAccountBalanceMessage(message);
// }

const handleTransferVerificationEvent = async(message: TransferVerificationMessage) => {
    TransferService.processTransferVerificationRequestMessage(message);
}

connect().then(async connection => {
    processTrxEvents();
    app.listen(config.PORT);
});