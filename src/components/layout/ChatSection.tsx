"use client";

import { Avatar, Badge, Button, Card, Input } from "@nextui-org/react";
import { FC, useState } from "react";
import { IconSendMessage } from "../Icons";
import { Message } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface ChatSectionProps {
  username: string;
  initialMessages: Message[];
}

const ChatSection: FC<ChatSectionProps> = ({ username, initialMessages }) => {
  const [allMessage, setAllMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const isSenderUser = (sender: string) => sender === username;

  const sendMessage = () => {
    // send message to the server
  };
  return (
    <div className="flex container mx-auto flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex justify-center w-full items-center gap-4">
          <h2 className="text-xl font-bold text-gray-200">General Chat</h2>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        {allMessage.map(({sender, text, timestamp, id}) => (
          <div className={cn("flex items-end gap-2 ", isSenderUser(sender) && 'justify-end')} key={id}>
            <Avatar size="sm" showFallback />
            <Card className="p-2 space-y-0.5">
              <span className="text-gray-400">{sender}</span>
              <p className="text-base">{text}</p>
              <span className="flex justify-end text-sm text-gray-300">
                {timestamp}
              </span>
            </Card>
          </div>
        ))}
        {/* <div className="flex items-end justify-end gap-2">
          <Card className="p-2">
            <p>I'm having some issues with my account.</p>
          </Card>
          <Avatar size="sm" src="/placeholder.svg?height=30&width=30" />
        </div> */}
      </main>
      <footer className="p-4">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onKeyDown={(e) => {
              e.key === "Enter" && null;
            }}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            className="flex-grow text-base text-gray-300"
            size="lg"
            variant="bordered"
            placeholder="Type your message"
          />
          <Button
            variant="shadow"
            disabled={!newMessage}
            className="h-10 w-10"
            isIconOnly
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
