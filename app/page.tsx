import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      
      <div id="menu">
      <nav>
      <ol>
      <li><a href="/">Wurzel </a></li>
      <li><a href="https://linkedin.com/in/bastianscharnagl">Lebenslauf </a></li>
      <li><a href="/contact">BS-3PO </a></li>
      </ol>
      </nav>
      </div>

      <div className='outer-div'>
        <div className='middle-div'>
          <p className="align-middle text-lg italic">Formale Logik ist unabhängig von Erfahrung</p>
        </div>
      </div>
    </main>
  )
}
