import { pusherServer } from "@/lib/pusher";
import { NextApiRequest, NextApiResponse } from "next";


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body
  const response = await pusherServer.trigger('general_chat', 'message', {
    message,
  })
  res.json(response)
}