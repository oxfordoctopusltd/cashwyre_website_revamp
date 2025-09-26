"use client"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F0F0F' }}>
      {children}
    </div>
  )
}