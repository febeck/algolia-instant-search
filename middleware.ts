import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { geo } = request
  const response = NextResponse.next()
  
  if (geo?.latitude && geo?.longitude) {
    response.cookies.set('latitude', geo.latitude)
    response.cookies.set('longitude', geo.longitude)
  }

  if (geo?.country) response.cookies.set('country', geo.country)

  return response
}

export const config = {
  matcher: ['/'],
}