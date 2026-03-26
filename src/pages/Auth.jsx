import { useState } from 'react'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)

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
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-on-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
            </div>
            <h1 className="text-2xl font-bold text-on-background tracking-tight">BrokerPortal</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/10 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-on-surface tracking-tight mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-secondary text-sm">
                {isLogin ? 'Enter your credentials to access your dashboard' : 'Join our institutional trading environment'}
              </p>
            </div>

            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">First Name</label>
                    <input type="text" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 outline-none" placeholder="Alexander" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Last Name</label>
                    <input type="text" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 outline-none" placeholder="Vance" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-lg">mail</span>
                  <input type="email" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 pl-10 outline-none" placeholder="a.vance@institutional.capital" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Password</label>
                  {isLogin && <a href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot password?</a>}
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-lg">lock</span>
                  <input type="password" className="w-full bg-background border border-outline-variant/15 rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary/20 p-3 pl-10 outline-none" placeholder="••••••••" />
                </div>
              </div>

              <button className="w-full bg-dark text-white py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-dark/90 transition-all mt-6">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-secondary text-xs">
                {isLogin ? 'New to BrokerPortal?' : 'Already have an account?'}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-primary font-bold hover:underline"
                >
                  {isLogin ? 'Create an account' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center sm:flex sm:items-center sm:justify-center gap-4 text-[10px] text-secondary/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-primary transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </div>
  )
}
