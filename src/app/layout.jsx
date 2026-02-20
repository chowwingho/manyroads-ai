import './globals.css'
import LenisScroll from '../components/LenisScroll'

export const metadata = {
  title: {
    default: 'Many Roads AI',
    template: '%s — Many Roads AI',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisScroll />
        {children}
      </body>
    </html>
  )
}
