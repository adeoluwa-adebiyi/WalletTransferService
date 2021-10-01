import { TRANSFER_VERIFICATION_MSG } from "../..";
import { TransferVerificationParams } from "../../models/transferRequestVerification";
import { TransferType } from "../../schemas/transferRequestVerification";
import { Message } from "./interface/message";

export class TransferVerificationMessage implements Message, TransferVerificationParams {
    key?: String;
    entityId: String;
    version: String = "1";
    name: String = TRANSFER_VERIFICATION_MSG;
    data: any;

    transferRequestId: String;
    approved: Boolean;
    type: TransferType;
    transferData: any;

    constructor(params?: TransferVerificationParams) {
        if (params) {
            this.transferRequestId = params.transferRequestId;
            this.approved = params.approved;
            this.type = params.type;
            this.transferData = params.transferData;
        }
    }
    setKey(key: String) {
        this.key = key;
    }

    getVersion(): string {
        return this.version.toString();
    }

    getKey(): String {
        return this.key;
    }

    serialize(): string {
        return JSON.stringify({
            entityId: this.entityId,
            version: this.version,
            name: this.name,
            data: {
                transferRequestId: this.transferRequestId,
                approved: this.approved,
                type: this.type,
                transferData: this.transferData
            },
            key: this.key
        })
    }

    deserialize(json: string): Message {
        const object: any = JSON.parse(json);
        const data: any = object.data;
        this.version = data.version;
        this.name = object.name;
        this.transferRequestId = data.transferRequestId;
        this.approved = data.approved;
        this.type = data.type;
        this.transferData = data.transferData;
        this.key = object.key;
        return this;
    }
}