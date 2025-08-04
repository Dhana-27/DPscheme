export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-lg">DF</span>
        </div>
        <p className="text-dpurpose-dark">Loading your dashboard...</p>
      </div>
    </div>
  )
}
