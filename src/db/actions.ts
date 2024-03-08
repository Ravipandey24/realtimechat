'use server'
 
import { cookieExpiryDate } from '@/lib/utils'
import { cookies } from 'next/headers'
import { addUserToDB, getAllUsersFromDB } from './redis'



export async function createUsername(username: string) {
    try {
        const cookieStore = cookies()
        const {users, success} = await getAllUsersFromDB();
        if(!success) {
            return { success: false, message: 'something went wrong while creating the username.' }
        }
        if (success && users.includes(username)) {
            return { success: false, message: 'Username already exists!' }
        }
        await addUserToDB(username)
        cookieStore.set('username', username, {expires: cookieExpiryDate(7)})
        return { success: true, message: 'Username created succesfully!' }
    } catch (error) {
        console.error(error)
        return { success: false, message: 'An error occurred while creating the username.' }
    }
}
export async function getUsername() {
    const cookieStore = cookies()
  return cookieStore.get('username')?.value;
}