import { useState, useRef, useEffect } from 'react'

const OtpInput = ({ onComplete }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus()
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value
    if (isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)
    
    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
    
    // Check if complete
    if (newOtp.every(v => v !== '') && onComplete) {
      onComplete(newOtp.join(''))
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('')
    if (pastedData.some(isNaN)) return
    
    const newOtp = [...otp]
    pastedData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char
    })
    setOtp(newOtp)
    
    const focusIndex = Math.min(pastedData.length, 5)
    inputRefs.current[focusIndex].focus()
    
    if (newOtp.every(v => v !== '') && onComplete) {
      onComplete(newOtp.join(''))
    }
  }

  return (
    <div className="flex justify-between gap-2 sm:gap-4 mb-8">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-10 h-12 sm:w-12 sm:h-14 text-center bg-background border border-outline-variant/20 rounded-xl text-lg sm:text-xl font-bold text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm"
          value={data}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          maxLength={1}
        />
      ))}
    </div>
  )
}

export default function Auth() {
  // Views: 'login', 'signup', 'forgot_password', 'verify_otp', 'reset_password'
  const [view, setView] = useState('login')
  const [context, setContext] = useState(null) // 'signup' or 'forgot_password'
  
  // Password validation state
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorLine, setErrorLine] = useState('')
  
  const handleSimulatedSubmit = (nextView, ctx = null) => {
    if (ctx) setContext(ctx)
    setView(nextView)
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    setErrorLine('')
    if (password !== confirmPassword) {
      setErrorLine('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setErrorLine('Password must be at least 8 characters')
      return
    }
    handleSimulatedSubmit('verify_otp', 'signup')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Left side — branding/decoration */}
      <div className="hidden md:flex md:w-1/2 bg-surface-container-low border-r border-outline-variant/10 flex-col items-center justify-center p-12 relative overflow-hidden bg-decoration">
        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <span className="material-symbols-outlined text-on-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          </div>
          <h1 className="text-3xl font-bold text-on-background mb-4 tracking-tight">BrokerPortal</h1>
          <p className="text-secondary leading-relaxed">The premier gateway for institutional traders. Advanced liquidity, uncompromising security.</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* Right side — Auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-on-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
            </div>
            <h1 className="text-2xl font-bold text-on-background tracking-tight">BrokerPortal</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/10 p-8 relative overflow-hidden">
            {/* Header Area */}
            <div className="text-center mb-8 animate-fade-in relative z-10">
              {view !== 'login' && view !== 'signup' && (
                <button 
                  onClick={() => setView('login')}
                  className="absolute left-0 top-1 text-secondary hover:text-on-surface transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
              )}
              
              <h2 className="text-2xl font-bold text-on-surface tracking-tight mb-2">
                {view === 'login' && 'Welcome Back'}
                {view === 'signup' && 'Create Account'}
                {view === 'forgot_password' && 'Reset Password'}
                {view === 'verify_otp' && 'Verification Required'}
                {view === 'reset_password' && 'Create New Password'}
              </h2>
              <p className="text-secondary text-sm px-4">
                {view === 'login' && 'Enter your credentials to access your dashboard'}
                {view === 'signup' && 'Join our institutional trading environment'}
                {view === 'forgot_password' && 'Enter your registered email address to receive a reset code.'}
                {view === 'verify_otp' && 'Enter the 6-digit verification code sent to your email.'}
                {view === 'reset_password' && 'Your new password must be at least 12 characters long.'}
              </p>
            </div>

            {/* Dynamic Form Area */}
            <div className="relative z-10">
              
              {/* LOGIN / SIGNUP */}
              {(view === 'login' || view === 'signup') && (
                <form className="space-y-4 animate-fade-in" onSubmit={e => {
                  if (view === 'signup') {
                    handleSignupSubmit(e)
                  } else {
                    e.preventDefault();
                    window.location.href = '/';
                  }
                }}>
                  {view === 'signup' && (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">First Name</label>
                        <input type="text" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 outline-none transition-all" placeholder="Alexander" required />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Last Name</label>
                        <input type="text" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 outline-none transition-all" placeholder="Vance" required />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Email Address</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-lg">mail</span>
                      <input type="email" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 pl-10 outline-none transition-all" placeholder="a.vance@institutional.capital" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">{view === 'signup' ? 'Create Password' : 'Password'}</label>
                      {view === 'login' && <button type="button" onClick={() => { setView('forgot_password'); setErrorLine(''); }} className="text-[10px] font-bold text-primary hover:underline">Forgot password?</button>}
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-lg">lock</span>
                      <input 
                        type="password" 
                        value={password}
                        onChange={e => { setPassword(e.target.value); setErrorLine(''); }}
                        className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 pl-10 outline-none transition-all" 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>
                  </div>

                  {view === 'signup' && (
                    <div className="space-y-1.5 animate-fade-in">
                      <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Confirm Password</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-lg">lock_reset</span>
                        <input 
                          type="password" 
                          value={confirmPassword}
                          onChange={e => { setConfirmPassword(e.target.value); setErrorLine(''); }}
                          className={`w-full bg-background border rounded-lg text-sm text-on-surface focus:ring-1 p-3 pl-10 outline-none transition-all ${
                            errorLine ? 'border-error/50 focus:ring-error/20 bg-error/5' : 'border-outline-variant/15 focus:ring-primary/20'
                          }`}
                          placeholder="••••••••" 
                          required 
                        />
                      </div>
                      {errorLine && (
                        <p className="text-error text-[10px] font-bold mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">error</span> {errorLine}
                        </p>
                      )}
                    </div>
                  )}

                  <button type="submit" className="w-full bg-dark text-white py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-dark/90 transition-all mt-6">
                    {view === 'login' ? 'Sign In' : 'Continue'}
                  </button>
                </form>
              )}

              {/* FORGOT PASSWORD */}
              {view === 'forgot_password' && (
                <form className="space-y-6 animate-fade-in" onSubmit={e => { e.preventDefault(); handleSimulatedSubmit('verify_otp', 'forgot_password'); }}>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Registered Email</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-lg">mail</span>
                      <input type="email" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 pl-10 outline-none transition-all" placeholder="a.vance@institutional.capital" required />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-dark text-white py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-dark/90 transition-all">
                    Send Reset Code
                  </button>
                </form>
              )}

              {/* VERIFY OTP */}
              {view === 'verify_otp' && (
                <div className="animate-fade-in flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">mark_email_read</span>
                  </div>
                  <OtpInput onComplete={() => {}} />
                  <button 
                    onClick={() => {
                      if (context === 'forgot_password') setView('reset_password')
                      else window.location.href = '/' // Signup success -> dashboard
                    }}
                    className="w-full bg-dark text-white py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-dark/90 transition-all"
                  >
                    Verify Code
                  </button>
                  <p className="text-secondary text-xs mt-6 text-center">
                    Didn't receive the code? <button className="text-primary font-bold hover:underline">Resend</button>
                  </p>
                </div>
              )}

              {/* RESET PASSWORD */}
              {view === 'reset_password' && (
                <form className="space-y-4 animate-fade-in" onSubmit={e => { e.preventDefault(); setView('login'); }}>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">New Password</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-lg">lock</span>
                      <input type="password" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 pl-10 outline-none transition-all" placeholder="••••••••" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Confirm Password</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-lg">lock</span>
                      <input type="password" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 pl-10 outline-none transition-all" placeholder="••••••••" required />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-dark text-white py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-dark/90 transition-all mt-6">
                    Update Password
                  </button>
                </form>
              )}

            </div>

            {/* Bottom Toggle links */}
            {(view === 'login' || view === 'signup') && (
              <div className="mt-6 text-center relative z-10">
                <p className="text-secondary text-xs">
                  {view === 'login' ? 'New to BrokerPortal?' : 'Already have an account?'}
                  <button 
                    onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setErrorLine(''); setPassword(''); setConfirmPassword(''); }}
                    className="ml-1 text-primary font-bold hover:underline"
                  >
                    {view === 'login' ? 'Create an account' : 'Sign in'}
                  </button>
                </p>
              </div>
            )}
            
            {/* Ambient Background decoration for card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
          </div>
          
          <div className="mt-8 text-center flex items-center justify-center gap-4 text-[10px] text-secondary/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </div>
  )
}
