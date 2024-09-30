import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ setIsMobileMenuOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Urban Uplift</h1>
      <div className="flex items-center space-x-4">
        <Input 
          type="search" 
          placeholder="Search issues..." 
          className="max-w-sm bg-gray-700 text-white placeholder-gray-400 border-gray-600"
        />
          <Link href='/user/id/profile'>
        <Avatar>
          <AvatarImage src="https://promptopia-mauve.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocIeRpDQ_iMQE5KKxJIcDB67m9JTPlRleUKi2wg_yooyheS9tU-C%3Ds96-c&w=48&q=75" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
          </Link>
        <Button
          variant="ghost"
          className="md:hidden text-white hover:bg-gray-700"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}