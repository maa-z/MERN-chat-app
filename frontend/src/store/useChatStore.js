import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get)=>({
    messages : [],
    users : [],
    selectedUser : null,
    isUserLoading : false,
    isMessageLoading : false,
    onlineUsers : [],

    getUsers : async ()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally{
            set({isUserLoading:false});
        }
    },
    getMessages : async (userId)=>{
        set({isMessageLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
            // console.log("yeh to chal rha hai" );
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally{
            set({isMessageLoading:false});
        }
    },
    

    sendMessage : async (messageData)=>{
        const {selectedUser,messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.messages);
        }
    },

    // real time message
    subscribeToMessages : ()=>{
        const {selectedUser} = get();
        if(!selectedUser)return;

        // using variable of another store in this store

        const socket  =  useAuthStore.getState().socket;

        socket.on("newMessage",(newMessage)=>{
            const isMessageSendFromSelectedUser = newMessage.senderId === selectedUser._id;
            if(!isMessageSendFromSelectedUser)return;
            set({
                messages : [...get().messages,newMessage],
            })
        });
    },


    unSubscribeToMessages : ()=>{
        const socket  =  useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    
    setSelectedUser : (selectedUser)=>set({selectedUser:selectedUser}),

}))