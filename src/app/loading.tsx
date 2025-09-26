export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#FF6B35]/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#FF6B35] rounded-full animate-spin"></div>
        </div>
        <p className="text-white/60 mt-4">Loading Cashwyre...</p>
      </div>
    </div>
  )
}