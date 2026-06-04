'use client'

import { useEffect } from 'react'

type LogoutOnCloseProps = {
  enabled: boolean
}

const LOGOUT_ENDPOINT = '/api/users/logout?allSessions=false'

export default function LogoutOnClose({ enabled }: LogoutOnCloseProps) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const sendLogoutSignal = () => {
      const logoutURL = new URL(LOGOUT_ENDPOINT, window.location.origin).toString()

      if (typeof navigator.sendBeacon === 'function') {
        navigator.sendBeacon(logoutURL, new Blob([], { type: 'application/json' }))
        return
      }

      void fetch(logoutURL, {
        method: 'POST',
        credentials: 'include',
        keepalive: true,
      })
    }

    window.addEventListener('pagehide', sendLogoutSignal)

    return () => {
      window.removeEventListener('pagehide', sendLogoutSignal)
    }
  }, [enabled])

  return null
}
