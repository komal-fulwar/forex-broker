import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AccountsSkeleton as PageSkeleton } from '../components/Skeletons'

const CRYPTO_ASSETS = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: '0.00000000', usdValue: '0.00', icon: 'currency_bitcoin', iconColor: 'text-[#F7931A]', iconBg: 'bg-[#F7931A]/10' },
  { id: 'eth', name: 'Ether', symbol: 'ETH', balance: '0.00000000', usdValue: '0.00', icon: 'diamond', iconColor: 'text-[#627EEA]', iconBg: 'bg-[#627EEA]/10' },
  { id: 'usdt_trc20', name: 'Tether (USDT TRC20)', symbol: 'USDT', balance: '0.00', usdValue: '0.00', icon: 'toll', iconColor: 'text-[#26A17B]', iconBg: 'bg-[#26A17B]/10' },
  { id: 'usdt_erc20', name: 'Tether (USDT ERC20)', symbol: 'USDT', balance: '0.00', usdValue: '0.00', icon: 'toll', iconColor: 'text-[#26A17B]', iconBg: 'bg-[#26A17B]/10' },
  { id: 'trx', name: 'Tronix', symbol: 'TRX', balance: '0.000000', usdValue: '0.00', icon: 'change_circle', iconColor: 'text-[#FF0013]', iconBg: 'bg-[#FF0013]/10' },
  { id: 'usdc_bep20', name: 'USD Coin (USDC BEP20)', symbol: 'USDC', balance: '0.00', usdValue: '0.00', icon: 'monetization_on', iconColor: 'text-[#2775CA]', iconBg: 'bg-[#2775CA]/10' },
]

export default function CryptoWallet() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Accounts')
  const navigate = useNavigate()

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])

  if (loading) return <PageSkeleton />

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-20">
      
      {/* Educational Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-emerald-600">account_balance</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-on-surface">Institutional Crypto Gateway</h2>
            <p className="text-sm text-secondary mt-0.5">Access high-liquidity cross-chain networks seamlessly.</p>
          </div>
        </div>
        <button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 font-bold text-sm px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap">
          View Guide
        </button>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-6">Crypto wallet</h1>
        <div>
          <p className="text-sm text-secondary mb-1">Total balance</p>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-bold text-on-surface">0.00</span>
            <span className="text-lg font-bold text-secondary mb-1">USD</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-outline-variant/10 mb-6 flex gap-6">
        <button 
          onClick={() => setActiveTab('Accounts')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'Accounts' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
        >
          Accounts
        </button>
        <button 
          onClick={() => setActiveTab('External')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'External' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
        >
          External wallets
        </button>
      </div>

      {activeTab === 'Accounts' && (
        <div className="space-y-4">
          
          <div className="flex justify-between items-center mb-6">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant/20 rounded-lg text-sm text-on-surface font-medium hover:bg-surface-container transition-colors shadow-sm bg-white">
              <span className="material-symbols-outlined text-[16px]">sort</span>
              Account name
              <span className="material-symbols-outlined text-[16px] text-secondary">expand_more</span>
            </button>
          </div>

          <div className="space-y-4">
            {CRYPTO_ASSETS.map((asset) => (
              <div key={asset.id} className="bg-white rounded-2xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-shadow p-6 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                
                {/* Background watermark */}
                <span className={`material-symbols-outlined absolute -right-6 -bottom-6 text-[110px] opacity-[0.03] select-none z-0 ${asset.iconColor}`} style={{fontVariationSettings: "'FILL' 1"}}>{asset.icon === 'diamond' ? 'token' : asset.icon}</span>

                <div className="flex-1 min-w-0 relative z-10 flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${asset.iconBg} border-outline-variant/10`}>
                    <span className={`material-symbols-outlined text-2xl ${asset.iconColor}`}>{asset.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                       {asset.name}
                       <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant border border-outline-variant/10">{asset.symbol}</span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-8 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-outline-variant/10 relative z-10">
                  <div className="text-left sm:text-right flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-0.5">Wallet Balance</p>
                    <div className="flex items-baseline gap-2 justify-start sm:justify-end">
                      <p className="text-xl font-bold tabular-nums text-on-surface">{asset.balance} <span className="text-sm font-semibold">{asset.symbol}</span></p>
                    </div>
                    <p className="text-xs font-semibold text-secondary mt-0.5">≈ {asset.usdValue} USD</p>
                  </div>
                  
                  <div className="flex flex-wrap md:flex-nowrap gap-2 shrink-0 border-l border-outline-variant/10 pl-6 md:pl-8">
                    <button onClick={() => navigate('/deposit')} className="h-10 px-5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center min-w-[100px]">
                      Deposit
                    </button>
                    <button onClick={() => navigate('/withdraw')} className="h-10 px-5 bg-white hover:bg-background text-on-surface border border-outline-variant/20 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center min-w-[100px]">
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'External' && (
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-secondary text-2xl">account_balance_wallet</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">No external wallets saved</h3>
          <p className="text-secondary text-sm max-w-sm mx-auto">You can save destination wallet addresses during the withdrawal process for faster future transactions.</p>
        </div>
      )}

    </div>
  )
}
