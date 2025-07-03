import './globals.css'
import React from 'react'

export const metadata = {
  title: 'AB MCP Server',
  description: 'A Model Context Protocol server with echo and lint tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 