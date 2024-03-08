import WelcomeCard from "@/components/layout/WelcomeCard";
import { GridBackground } from "@/components/widgets/Backgrounds";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <GridBackground>
      <div className="h-full flex justify-center items-center">
        <WelcomeCard></WelcomeCard>
      </div>
    </GridBackground>
  );
}
