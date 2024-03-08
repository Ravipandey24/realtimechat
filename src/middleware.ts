import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const pathname = new URL(request.url).pathname
    const isLandingPage = pathname === '/'
    const isGeneralChat = pathname === '/general-chat'

    const cookie = request.cookies.get('username')

    if (isLandingPage && cookie?.value) {
        return NextResponse.redirect(new URL('/general-chat', request.url))
    }
    if (isGeneralChat && !cookie?.value) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:['/', '/general-chat'],
}