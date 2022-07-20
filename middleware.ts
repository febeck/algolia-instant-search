import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { geo, ip } = request
  const response = NextResponse.next()
  
  // if (geo?.latitude && geo.longitude) {
  //   response.cookies.set('latitude', geo.latitude)
  //   response.cookies.set('longitude', geo.longitude)
  // }
  response.cookies.set('latitude', "40.71")
  response.cookies.set('longitude', "-74.01")

  if (geo?.city) response.cookies.set('city', geo.city)
  // if (geo?.country) response.cookies.set('country', geo.country)
  response.cookies.set('country', 'US')
  if (ip) response.cookies.set('ip', ip)

  return response
}

export const config = {
  matcher: ['/'],
}