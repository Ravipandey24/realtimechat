import ChatSection from "@/components/layout/ChatSection";
import { DotBackground } from "@/components/widgets/Backgrounds";
import { getUsername } from "@/db/actions";
import { getAllMessagesFromGeneralChat } from "@/db/redis";

export default async function Page(){
  const username = (await getUsername()) as string;
  const { messages } = await getAllMessagesFromGeneralChat();
  return (
    <DotBackground>
      <ChatSection username={username} initialMessages={messages.reverse()}></ChatSection>
    </DotBackground>
  );
};

