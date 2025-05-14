
import React, { useState } from "react";
import { Avatar1, Avatar2, Avatar3, ChatHero, Three } from "../../assets/image";
import { FaUsers } from "react-icons/fa6";
import { BsFillSendFill, BsThreeDots } from "react-icons/bs";
import moment from "moment";
import useUser from "../../hooks/user/UseUser";

const ClientChatContainer = () => {
  const { data: user, isLoading, isError, refetch } = useUser();

  const [messages, setMessages] = useState([
    {
      image: Avatar1,
      message: "Hi I want to withdraw everything..!This is awesome",
      time: `${Date.now()}`,
      isSender: true,
    },
    {
      image: Avatar2,
      message: "Hey guys...How you all doing...It's been so long",
      time: `${Date.now()}`,
      isSender: false,
    },
    {
      image: Avatar1,
      message: "We are fine....What about you",
      time: `${Date.now()}`,
      isSender: true,
    },
    {
      image: Avatar3,
      message: "Awesome Buddy....",
      time: `${Date.now()}`,
      isSender: false,
    },
  ]);

  const [value, setValue] = useState("");

  const sendMessage = () => {
    setMessages([
      ...messages,
      { image: Avatar1, message: value, time: `${Date.now()}` },
    ]);
    setValue("");
  };
  return (
    <div className="w-full  h-screen bg-[#222222] shadow-lg flex-1 lg:h-[calc(100vh-120px)]  rounded-md overflow-hidden flex flex-col">
      {/* top */}
      <div className="w-full px-4  bg-[#2B2B2B] flex items-center justify-between">
        <div className="flex items-start justify-start flex-col gap-2 px-3">
          {/* title */}
          <div className="flex items-center justify-center gap-1 p-4 mt-4">
            <FaUsers className=" text-heroPrimary text-lg" />
            <p className="lg:text-base text-sm text-white font-medium">General Chat</p>
          </div>

          {/*online counts */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center">
              <img
                src={Avatar1}
                className="w-8 h-8 rounded-full object-cover"
                alt=""
              />
              <img
                src={Avatar2}
                className="w-8 h-8 rounded-full object-cover -ml-2"
                alt=""
              />
              <img
                src={Avatar3}
                className="w-8 h-8 rounded-full object-cover -ml-2"
                alt=""
              />
            </div>

            <p className="text-xs lg:text-sm text-lime-500 font-semibold">
              Online : <span className="text-white text-xs font-medium">172</span>
            </p>
          </div>
        </div>

        <img src={user?.picture} className=" lg:w-12 lg:h-12 w-10 h-10 object-contain rounded-full" alt="" />
      </div>

      {/* messages */}
      <div className="flex-grow overflow-y-scroll w-full px-4 py-2">
        {messages &&
          messages.map((msg, index) => (
            <>
              {msg.isSender ? (
                <Sender msg={msg} key={index} />
              ) : (
                <Reciever msg={msg} key={index} />
              )}
            </>
          ))}
      </div>

      {/* bottom */}
      <div className="w-full gap-2 h-24 bg-[#2B2B2B] px-6 py-4 flex items-center justify-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Send a message ..."
          className="flex-1 outline-none border-none bg-transparent text-[#9d9d9d] placeholder:text-[#cccbcb]"
        />
        <div className="w-[1px] h-6 bg-third"></div>
        <BsFillSendFill
          onClick={sendMessage}
          className="text-heroPrimary text-lg cursor-pointer -mt-4"
        />
      </div>
    </div>
  );
};

export const Reciever = ({ msg }) => {
  return (
    <div className="w-full bg-[#1B1B1B] px-2 py-3 rounded-2xl mb-4 shadow-lg shadow-[rgba(0,0,0,0.4)]">
      <div className=" flex items-start justify-between gap-2">
        <img
          src={msg?.image}
          className="w-12 h-12 rounded-full object-cover"
          alt=""
        />
        <p className="lg:text-sm text-xs text-zinc-300 flex-1 text-left">{msg?.message}</p>

        <BsThreeDots className="lg:text-2xl text-lg text-zinc-300" />
      </div>
      <div className="flex items-center justify-end px-4">
        <p className="text-sm text-zinc-500">
          {moment(new Date(parseInt(msg?.time)).toISOString()).fromNow()}
        </p>
      </div>
    </div>
  );
};

export const Sender = ({ msg }) => {
  return (
    <div className="w-full bg-gradient-to-b from-[#353535] to-[#353535] px-2 py-3 rounded-2xl mb-4 shadow-lg shadow-[rgba(0,0,0,0.4)]">
      <div className=" flex items-start justify-between gap-2">
        <img
          src={msg?.image}
          className="w-12 h-12 rounded-full object-cover"
          alt=""
        />
        <p className="lg:text-sm text-xs text-zinc-300 flex-1 text-left">{msg?.message}</p>

        <BsThreeDots className="lg:text-2xl text-lg text-zinc-300" />
      </div>
      <div className="flex items-center justify-end px-4">
        <p className="lg:text-sm text-xs text-zinc-500">
          {moment(new Date(parseInt(msg?.time)).toISOString()).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default ClientChatContainer;


