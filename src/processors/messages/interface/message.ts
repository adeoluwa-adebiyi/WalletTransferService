export interface Message{

    entityId: String;

    version: String;

    name: String;

    data: any;

    key?: any;

    getVersion(): string;

    getKey(): String;

    setKey(key: any);

    serialize(): string;

    deserialize(json: string): Message;

}