"use client";

import { createUsername } from "@/db/actions";
import { usernameValidator } from "@/lib/validations";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";


const WelcomeCard = ({}) => {
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const validatedUsername = usernameValidator.parse(username.trim());
      const {success, message} = await createUsername(validatedUsername);
      if (success) {
        toast.success(message);
        router.push("/general-chat");
      } else {
        toast.error(message);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setErrorMessage(error.errors[0].message);
        return;
      }
      console.error(error);
    }
  };

  return (
    <Card className="w-96 h-48 bg-background/80">
      <CardHeader className="flex justify-center">
        <h2 className="text-xl">
          Welcome to{" "}
          <span className="font-semibold text-gray-500">Real-Time Chat</span>
        </h2>
      </CardHeader>
      <CardBody className="flex flex-col justify-end">
        <Input
          type="text"
          label="create a username"
          variant="bordered"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage("");
          }}
          onKeyDown={(e) => {e.key === 'Enter' && onSubmit()}}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          className="w-full text-gray-800"
          color="primary"
          variant="shadow"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WelcomeCard;
