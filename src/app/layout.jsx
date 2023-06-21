import './globals.css'

export const metadata = {
  title: 'ZAIL',
  description: 'ZAIL SPACES',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}