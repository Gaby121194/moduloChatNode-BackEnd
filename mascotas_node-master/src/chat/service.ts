import { IChat, Chat, IMessage } from "./schema";
import * as error from "../server/error";
import { hasUncaughtExceptionCaptureCallback } from "process";
import { IUser } from "../user/user";
const mongoose = require("mongoose");



export async function read(userId: string, receptorId: string): Promise<IChat> {
    try {
      const chat = await findForUser(userId, receptorId);
      if (!chat) {
        return Promise.resolve(new Chat());
      }
      return Promise.resolve(chat);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  
  async function findForUser(userId: string, receptorId: string): Promise<IChat> {
    
    let chat = await Chat.findOne({
      user1: userId,
      user2: receptorId,
      enabled: true
    });

    if(chat) {
      return chat
    }
    else {
      let chatInverted = await Chat.findOne({
        user1: receptorId,
        user2: userId,
        enabled: true
      });
      return chatInverted
    }

  }


  
export async function update(userId: string, body: IMessage): Promise<IChat> {
  
  try {
    let receptor = body.receptor
    let message = body
    let chat = await findForUser(userId, receptor);
  

    if (!chat) {
      chat = new Chat();
      chat.id = mongoose.Types.ObjectId.createFromHexString(userId);
      chat.user1 = userId;
      chat.user2 = receptor;
      chat.messages.push(body)
      chat.created = Date.now()
      chat.enabled = true
    }
    else {
      chat.messages.push(message)
    }
    
    await chat.save();
    return Promise.resolve(chat);
  } catch (err) {
    return Promise.reject(err);
  }
}
  