import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-2 text-white/60">
      <p>&copy; 2025 Cosmos_Website</p>
      <div className="flex space-x-4 text-sm">
        <Link href="#" className="hover:text-white transition-colors">Help</Link>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
    </footer>
  )
}

export default Footer