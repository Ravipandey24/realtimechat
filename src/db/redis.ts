'use server'

import { Message } from '@/lib/validations'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const addUserToDB = async (username: string) => {
  try {
    await redis.sadd('users', username)
    return { success: true, message: 'Username created successfully!' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An error occurred while creating the username.' }
  }
}

export const getAllUsersFromDB = async () => {
  try {
    const users = await redis.smembers('users')
    return { success: true, users }
  } catch (error) {
    console.error(error)
    return { success: false, users: [] }
  }
}

export const addMessageToGeneralChat = async (message: Message) => {
  try {
    await redis.lpush('general:chat', message)
    return { success: true, message: 'Message sent successfully!' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An error occurred while sending the message.' }
  }
}

export const getAllMessagesFromGeneralChat = async () => {
  try {
    const messages = await redis.lrange('general:chat', 0, -1) as Message[]
    return { success: true, messages }
  } catch (error) {
    console.error(error)
    return { success: false, messages: [] }
  }
}
