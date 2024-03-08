"use client";

import { Avatar, Badge, Button, Card, Input, Tooltip } from "@nextui-org/react";
import { FC, useEffect, useRef, useState } from "react";
import { IconSendMessage, LogoutIcon } from "../Icons";
import { Message } from "@/lib/validations";
import { cn, parseDateToTime } from "@/lib/utils";
import { logout, sendMessageToGeneralChat } from "@/db/actions";
import { pusherClient } from "@/lib/pusher";
import { ScrollShadow } from "@nextui-org/react";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChatSectionProps {
  username: string;
  initialMessages: Message[];
}

const ChatSection: FC<ChatSectionProps> = ({ username, initialMessages }) => {
  const [allMessage, setAllMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isSenderUser = (sender: string) => sender === username;
  const router = useRouter();

  useEffect(() => {
    pusherClient.subscribe("general-chat");

    const messageHandler = (message: Message) => {
      setAllMessages((prev) => [...prev, message]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe("general-chat");
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessage.length]);

  const sendMessage = async () => {
    // send message to the server
    if (!newMessage) return;
    const messageObject: Message = {
      id: nanoid(),
      sender: username,
      text: newMessage,
      timestamp: Date.now(),
    };
    await sendMessageToGeneralChat(messageObject);
    setNewMessage("");
  };

  const onLogout = async () => {
    const {success, message} = await logout(username);
    if(success) {
      toast.success(message);
      router.push('/');
    }else{
      toast.error(message);
    }
  };

  return (
    <div className="flex container mx-auto flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex justify-between w-full items-center gap-4">
          <h2 className="text-xl font-bold text-gray-200">General Chat</h2>
          <Tooltip offset={-3} content="logout" color="danger">
            <Button isIconOnly variant="light" color="danger" onClick={onLogout}>
              <LogoutIcon></LogoutIcon>
            </Button>
          </Tooltip>
        </div>
      </header>
      <ScrollShadow hideScrollBar>
        <div className="flex flex-grow flex-col justify-end p-4 space-y-4">
          <AnimatePresence>
            {allMessage.map(({ sender, text, timestamp, id }, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: "spring",
                    bounce: 0.3,
                    duration: index * 0.05 + 0.2,
                  },
                }}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
                className={cn(
                  "flex flex-row items-end gap-2 ",
                  isSenderUser(sender) && "justify-end"
                )}
                key={id}
              >
                <Card
                  className={cn(
                    "p-2 space-y-0.5 min-w-36 rounded-xl order-1 rounded-bl-none",
                    isSenderUser(sender) &&
                      "bg-gray-300 rounded-bl-xl rounded-br-none order-0"
                  )}
                >
                  <span
                    className={cn(
                      "text-gray-400 text-xs",
                      isSenderUser(sender) && "text-gray-600"
                    )}
                  >
                    {sender}
                  </span>
                  <p
                    className={cn(
                      "text-base",
                      isSenderUser(sender) && "text-gray-800"
                    )}
                  >
                    {text}
                  </p>
                  <span
                    className={cn(
                      "flex justify-end text-xs text-gray-300",
                      isSenderUser(sender) && "text-gray-600"
                    )}
                  >
                    {parseDateToTime(timestamp)}
                  </span>
                </Card>
                <Avatar size="sm" showFallback />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </ScrollShadow>
      <footer className="p-4">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage();
            }}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            classNames={{
              inputWrapper:'h-12'
            }}
            className="flex-grow text-base text-gray-300"
            size="md"
            variant="bordered"
            placeholder="Type your message"
          />
          <Button
            variant="shadow"
            isDisabled={!newMessage}
            className="h-12 w-12"
            isIconOnly
            onClick={sendMessage}
            color="primary"
          >
            <IconSendMessage className="h-6 w-6"></IconSendMessage>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ChatSection;
