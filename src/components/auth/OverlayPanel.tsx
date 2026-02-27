interface Props {
  isSignUp: boolean
  onSwitch: () => void
}

export default function OverlayPanel({ isSignUp, onSwitch }: Props) {
  return (
    <div
      className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-10"
      style={{ transform: isSignUp ? 'translateX(-100%)' : 'translateX(0)' }}
    >
      {/* Inner sliding container — 200% wide, slides left/right */}
      <div
        className="relative flex w-[200%] h-full transition-transform duration-700 ease-in-out"
        style={{ transform: isSignUp ? 'translateX(0)' : 'translateX(-50%)' }}
      >
        {/* Left panel — visible in Sign Up mode */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center px-10 bg-gradient-to-br from-blue-700 to-blue-500 text-white relative overflow-hidden">
          <Decoration />
          <div className="relative z-10 text-center">
            <BriefcaseIcon />
            <h3 className="text-3xl font-bold mb-3 tracking-tight">TrackJobs</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-8 max-w-xs">
              Already have an account? Sign in and continue where you left off.
            </p>
            <button
              onClick={onSwitch}
              className="px-8 py-2.5 rounded-full border-2 border-white text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-blue-700 transition-all duration-200"
            >
              SIGN IN
            </button>
          </div>
        </div>

        {/* Right panel — visible in Sign In mode */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center px-10 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
          <Decoration />
          <div className="relative z-10 text-center">
            <BriefcaseIcon />
            <h3 className="text-3xl font-bold mb-3 tracking-tight">TrackJobs</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-8 max-w-xs">
              New here? Create an account and take control of your job search.
            </p>
            <button
              onClick={onSwitch}
              className="px-8 py-2.5 rounded-full border-2 border-white text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-blue-700 transition-all duration-200"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BriefcaseIcon() {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  )
}

function Decoration() {
  return (
    <>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5" />
      <div className="absolute top-1/2 -right-8 w-32 h-32 rounded-full bg-white/5" />
    </>
  )
}
