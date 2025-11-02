import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Product Not Found</h1>
      <p className="text-gray-600 mb-8">The product or category you're looking for doesn't exist.</p>
      <Link href="/" className="hover:text-[#D87D4A] text-black px-6 py-3 rounded underline uppercase">
        Return Home
      </Link>
    </div>
  )
}