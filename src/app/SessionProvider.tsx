'use client';
import { SessionProvider as Provider } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
type Props = {
  children: React.ReactNode;
}

export default function SessionProvider({children}: Props) {
  return (
    <Provider>
      
      <ProgressBar color="#7e22ce" options={{ showSpinner: false }}/>
      {children}
    </Provider>
  )
}
