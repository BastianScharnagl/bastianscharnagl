import './globals.css'
import { Providers } from './components/providers'

export const metadata = {
  title: 'Bastian Scharnagl',
  description: 'Persönliche Webseite von Bastian Scharnagl',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}

        <main>
          <div id="menu">
            <nav>
              <ol>
                <li><a href="/">Wurzeln </a></li>
                <li><a href="/inspiration">Inspiration </a></li>
                {/*<li><a href="/world">World </a></li>*/}
                <li><a href="/lebenslauf">Lebenslauf </a></li>
                <li><a href="/projekte">Projekte </a></li>
                <li><a href="/contact">BS-3PO </a></li>
              </ol>
            </nav>
          </div>
        </main>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
