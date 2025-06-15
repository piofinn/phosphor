export const metadata = {
  title: 'YPSILON-14 STATION TERMINAL',
  description: 'AUTHORIZED ACCESS ONLY',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="amber">
      <body>{children}</body>
    </html>
  )
}
