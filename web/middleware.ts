import { NextResponse } from "next/server"

export function middleware(request: Request) {
    const origin = request.headers.get('origin') || ""
    console.log(origin)

    const response = NextResponse.next()

    const allowedOriginRegex = new RegExp(`/^https?:\/\/(www\.)?(kghandcrafted\.com|${process.env.SANITY_PROJECT_ID}.api.sanity.io)$/i`)

    response.headers.set("Access-Control-Allow-Origin", allowedOriginRegex.test(origin) ? origin : "")
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Sanity-Event-ID")
    response.headers.set("Access-Control-Max-Age", "86400")

    console.log('Middleware')
    console.log(request.method)
    console.log(request.url)

    return response
}

export const config = {
    matcher: '/api/:path*',
}