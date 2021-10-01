import { Message } from "./interface/message";

export interface WalletTransferMoneyMessageParams {
    sourceWalletId: string;
    destinationWalletId: string;
    amount: number;
    requestId: string;
    currency: string;
}

export class WalletTransferMoneyMessage implements Message, WalletTransferMoneyMessageParams {
    entityId: string;
    version: string = "1";
    name: String = "wallet-transfer-money-message";
    data: any;
    sourceWalletId: string;
    destinationWalletId: string;
    amount: number;
    requestId: string;
    currency: string;
    key?: String;

    constructor(params?: WalletTransferMoneyMessageParams) {
        this.sourceWalletId = params?.sourceWalletId;
        this.destinationWalletId = params?.destinationWalletId;
        this.amount = params?.amount;
        this.currency = params?.currency;
        this.requestId = params?.requestId;
    }

    getVersion(): string {
        return this.version;
    }

    getKey(): String {
        return this.key;
    }

    setKey(key: String){
        this.key = key;
    }

    serialize(): string {
        return JSON.stringify({
            entityId: this.entityId,
            version: this.version,
            name: this.name,
            data: {
                sourceWalletId: this.sourceWalletId,
                destinationWalletId: this.destinationWalletId,
                amount: this.amount,
                requestId: this.requestId,
                currency: this.currency
            },
            key: this.key
        })
    }

    deserialize(json: string): WalletTransferMoneyMessage {
        const obj = JSON.parse(json);
        const data = obj.data;
        this.amount = data.amount;
        this.sourceWalletId = data.sourceWalletId;
        this.destinationWalletId = data.destinationWalletId;
        this.requestId = data.requestId;
        this.currency = data.currency;
        this.key = obj.key;
        return this;
    }

}