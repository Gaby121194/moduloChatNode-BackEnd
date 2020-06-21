import * as mongoose from "mongoose";
import { strict } from "assert";

export interface IChat extends mongoose.Document {
  id: string;
  sender: string;
  receptor: string;
  messages: Array<IMessage>;
  created: Number;
  enabled: Boolean;
}

export interface IMessage extends mongoose.Document {
    id: string;
    text: string;
    created: Number;
    receptor: string,

  }

  export let ChatSchema = new mongoose.Schema({
    id: {
      type: String,
      default: "",
      trim: true,
      
    },
    sender: {
        type: String,
        default: ""
        
      },
    receptor: {
        type: String,
        default: "",
        
      },
    messages: {
        type: Array,
        default: []
    },
    created: {
      type: Date,
      default: Date.now()
    },
    enabled: {
      type: Boolean,
      default: true
    }
  }, { collection: "chat" });


  export let Chat = mongoose.model<IChat>("Chat", ChatSchema);