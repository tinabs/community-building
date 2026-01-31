import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="text-3xl">🏃</div>
          <div>
            <h1 className="text-2xl font-athletic text-black">COMMUNITY SPORTS</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Dubai</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/home">
            <Button variant="ghost" className="hover:bg-gray-100 font-semibold text-black uppercase text-xs tracking-wider">
              Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="ghost" className="hover:bg-gray-100 font-semibold text-black uppercase text-xs tracking-wider">
              Search
            </Button>
          </Link>
          <Link href="/my-activities">
            <Button variant="ghost" className="hover:bg-gray-100 font-semibold text-black uppercase text-xs tracking-wider">
              My Activities
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="ghost" className="hover:bg-gray-100 relative uppercase text-xs tracking-wider">
              <span className="font-semibold text-black">Alerts</span>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button className="bg-black text-white border-0 ml-2 hover:bg-gray-900 font-bold uppercase text-xs tracking-wider btn-premium">
              Profile
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-black">
            <span className="text-2xl">☰</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
