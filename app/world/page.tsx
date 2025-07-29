"use client"

import { useSession } from "next-auth/react"

import LoginButton from '@/app/components/login-btn'

export default function World() {
  const { data: session } = useSession()
  if (session) {
    return (
      <main>
        <div className='outer-div'>
          <div className='middle-div'>
            <p className="align-middle text-lg italic">World</p>
          </div>
        </div>
        </main>
    )
  }
  else {
    return (
      <main>
        <div className='outer-div'>
          <div className='middle-div'>
            <LoginButton />
          </div>
        </div>
      </main>
    )
  }
   
}
