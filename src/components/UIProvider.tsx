// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { Toaster } from 'sonner';

export function UIProvider({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <Toaster theme='dark' />
    </NextUIProvider>
  )
}