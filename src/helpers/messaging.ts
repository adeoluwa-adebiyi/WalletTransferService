import { IEventBus, IEventBusMetaData } from "../bus/event-bus"
import { Message } from "../processors/messages/interface/message"

export const sendMessage = async(messenger: IEventBus<IEventBusMetaData>,topic:String, message: Message): Promise<void> =>{
    console.log("MESSAGE:");
    console.log(message);
    await messenger.submitRequest(message, topic.toString());
}