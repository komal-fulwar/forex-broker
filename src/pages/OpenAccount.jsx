import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetPlansQuery,
  useCreateTradingAccountMutation,
} from "../features/trading/tradingApi";

const ICON_MAP = {
  0: "layers",
  1: "monetization_on",
  2: "trending_up",
  3: "query_stats",
  4: "data_usage",
};

function planToRow(plan, idx) {
  return {
    id: plan.id,
    name: plan.name,
    desc: plan.description,
    minDeposit: `${Number(plan.minDeposit).toLocaleString()} USD`,
    spread: `${plan.spread} pips`,
    leverage: "1:Unlimited",
    commission:
      plan.commission === 0
        ? "No commission"
        : `${plan.commission} USD per lot/side`,
    icon: ICON_MAP[idx] ?? "account_balance",
  };
}

export default function OpenAccount() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [accountMode, setAccountMode] = useState("real");
  const [currency] = useState("USD");
  const [balance, setBalance] = useState("500");
  const [nickname, setNickname] = useState("");
  const [leverage, setLeverage] = useState("1:2000");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: plansData, isLoading: plansLoading } = useGetPlansQuery();
  const [createAccount, { isLoading: creating }] =
    useCreateTradingAccountMutation();

  const plans = plansData?.templates ?? [];
  const rows = plans.map(planToRow);
  const effectiveId = selectedPlanId ?? plans[0]?.id ?? null;
  const selectedRow = rows.find((r) => r.id === effectiveId);

  const isPasswordValid =
    password.length >= 8 &&
    password.length <= 15 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleCreate = async () => {
    setApiError("");
    const leverageNum = parseInt(leverage.replace("1:", "")) || 2000;
    const body = {
      planTemplateId: effectiveId,
      accountType: accountMode.toUpperCase(),
      baseCurrency: currency,
      leverage: leverageNum,
      nickname,
      tradingPassword: password,
      ...(accountMode === "demo" ? { demoBalance: parseFloat(balance) } : {}),
    };
    try {
      await createAccount(body).unwrap();
      setIsSuccess(true);
      setTimeout(() => navigate("/accounts"), 2500);
    } catch (err) {
      setApiError(
        err?.data?.message ?? "Failed to create account. Please try again.",
      );
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto animate-fade-in pb-12">
      {!isSuccess && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (step === 2 ? setStep(1) : navigate("/accounts"))}
              className="w-10 h-10 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center hover:bg-background transition-colors text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-on-surface">
              {step === 1 ? "Open account" : "Set up your account"}
            </h1>
          </div>
          {step === 1 && (
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Contract specifications
              <span className="material-symbols-outlined text-[16px]">
                open_in_new
              </span>
            </a>
          )}
        </div>
      )}

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-20 lg:py-32 animate-scale-in">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping shadow-[0_0_20px_rgba(52,211,153,0.4)]"></div>
            <span className="material-symbols-outlined text-[48px] text-emerald-600 relative z-10">
              check_circle
            </span>
          </div>
          <h2 className="text-3xl font-black text-on-surface mb-3 tracking-tight">
            Account Created Successfully
          </h2>
          <p className="text-secondary text-base">
            Your new {accountMode.toUpperCase()} account is ready for trading.
            Redirecting you to Accounts...
          </p>
        </div>
      ) : (
        <>
          {step === 1 && (
            <div className="space-y-8 lg:space-y-12">
              <div className="hidden lg:grid grid-cols-12 gap-4 px-6 text-xs font-bold uppercase tracking-widest text-secondary mt-4">
                <div className="col-span-6">Account plans</div>
                <div className="col-span-2 text-right">Min deposit</div>
                <div className="col-span-2 text-right">Min spread</div>
                <div className="col-span-2 text-right">Commission</div>
              </div>

              {plansLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-24 bg-white rounded-2xl border border-outline-variant/20 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {rows.map((acc) => (
                    <AccountRow
                      key={acc.id}
                      acc={acc}
                      isSelected={effectiveId === acc.id}
                      onSelect={() => setSelectedPlanId(acc.id)}
                    />
                  ))}
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => setStep(2)}
                  disabled={!effectiveId}
                  className="w-full sm:w-[280px] bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start">
              <div className="w-full lg:w-2/3 space-y-8">
                <div className="bg-background p-1.5 rounded-xl border border-outline-variant/20 flex w-full">
                  <button
                    onClick={() => setAccountMode("demo")}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${accountMode === "demo" ? "bg-white text-on-surface shadow-sm" : "text-secondary hover:text-on-surface"}`}
                  >
                    Demo
                  </button>
                  <button
                    onClick={() => setAccountMode("real")}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${accountMode === "real" ? "bg-white text-on-surface shadow-sm" : "text-secondary hover:text-on-surface"}`}
                  >
                    Real
                  </button>
                </div>

                <p className="text-sm text-on-surface font-medium">
                  {accountMode === "real"
                    ? "Trade with real money and withdraw any profit you may make."
                    : "Risk-free account. Trade with virtual money."}
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">
                      Currency
                    </label>
                    <div className="w-full bg-background border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-medium text-on-surface">
                      USD - United States Dollar
                    </div>
                  </div>

                  {accountMode === "demo" && (
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-2">
                        Starting balance <span className="text-error">*</span>
                      </label>
                      <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="w-full bg-white border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium text-on-surface outline-none transition-all"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">
                      Nickname <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      maxLength={36}
                      className="w-full bg-white border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium text-on-surface outline-none transition-all"
                    />
                    <div className="flex justify-between items-center mt-2 px-1">
                      <p className="text-xs text-secondary">
                        {
                          "Nicknames can't contain special characters: <>\"'&?^*#@"
                        }
                      </p>
                      <p className="text-xs text-secondary">
                        {nickname.length}/36
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">
                      Max leverage <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={leverage}
                        onChange={(e) => setLeverage(e.target.value)}
                        className="w-full bg-white border border-outline-variant/20 hover:border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-on-surface appearance-none outline-none transition-all cursor-pointer"
                      >
                        <option>1:Unlimited</option>
                        <option>1:2000</option>
                        <option>1:1000</option>
                        <option>1:500</option>
                        <option>1:100</option>
                        <option>1:50</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[20px]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-2">
                      Trading password <span className="text-error">*</span>
                    </label>
                    <div className="relative mb-3">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-on-surface outline-none transition-all font-mono"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors flex items-center justify-center p-1"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                    <div className="space-y-1.5 px-1">
                      <RuleItem
                        text="Between 8-15 characters"
                        met={password.length >= 8 && password.length <= 15}
                      />
                      <RuleItem
                        text="At least one upper and one lower case letter"
                        met={/[a-z]/.test(password) && /[A-Z]/.test(password)}
                      />
                      <RuleItem
                        text="At least one number"
                        met={/\d/.test(password)}
                      />
                      <RuleItem
                        text="At least one special character"
                        met={/[!@#$%^&*(),.?":{}|<>]/.test(password)}
                      />
                    </div>
                  </div>

                  {apiError && (
                    <p className="text-sm text-error bg-error/5 border border-error/20 rounded-xl px-4 py-3">
                      {apiError}
                    </p>
                  )}

                  <div className="pt-6 border-t border-outline-variant/10">
                    <button
                      onClick={handleCreate}
                      disabled={!isPasswordValid || creating}
                      className={`w-full py-4 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                        isPasswordValid && !creating
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-outline-variant/10 text-secondary cursor-not-allowed"
                      }`}
                    >
                      {creating && (
                        <span className="material-symbols-outlined text-[18px] animate-spin">
                          progress_activity
                        </span>
                      )}
                      {creating ? "Creating..." : "Create account"}
                    </button>
                  </div>
                </div>
              </div>

              {selectedRow && (
                <div className="hidden lg:block w-1/3 shrink-0">
                  <div className="bg-white rounded-2xl border border-outline-variant/15 p-6 shadow-sm sticky top-6">
                    <h3 className="text-xl font-bold text-on-surface mb-6">
                      {selectedRow.name}
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs text-secondary mb-1">
                          Min deposit
                        </p>
                        <p className="text-sm font-medium text-on-surface">
                          {selectedRow.minDeposit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">
                          Min spread
                        </p>
                        <p className="text-sm font-medium text-on-surface">
                          {selectedRow.spread}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">
                          Commission
                        </p>
                        <p className="text-sm font-medium text-on-surface">
                          {selectedRow.commission}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-outline-variant/10">
                      <a
                        href="#"
                        className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                      >
                        Contract specifications
                        <span className="material-symbols-outlined text-[16px]">
                          open_in_new
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AccountRow({ acc, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-xl md:rounded-2xl transition-all cursor-pointer bg-white group hover:shadow-md
        ${isSelected ? "border-primary ring-1 ring-primary shadow-sm" : "border-outline-variant/20 hover:border-primary/50"}
      `}
    >
      <div className="p-4 md:p-6 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:items-center">
        <div className="col-span-6 flex gap-4">
          <div className="flex items-start gap-4 shrink-0">
            <div
              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
              ${isSelected ? "border-primary" : "border-outline-variant/30 group-hover:border-primary/50"}
            `}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-scale-in"></div>
              )}
            </div>
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors
              ${isSelected ? "bg-primary/10 text-primary" : "bg-background text-secondary"}
            `}
            >
              <span className="material-symbols-outlined">{acc.icon}</span>
            </div>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-on-surface mb-1">
              {acc.name}
            </h3>
            <p className="text-xs md:text-sm text-secondary leading-relaxed max-w-sm">
              {acc.desc}
            </p>
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-2 gap-4 mt-2 ml-14 border-t border-outline-variant/10 pt-4">
          <div>
            <p className="text-[10px] uppercase text-secondary font-bold mb-1">
              Min Deposit
            </p>
            <p className="text-sm font-medium text-on-surface">
              {acc.minDeposit}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-secondary font-bold mb-1">
              Min Spread
            </p>
            <p className="text-sm font-medium text-on-surface">{acc.spread}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] uppercase text-secondary font-bold mb-1">
              Commission
            </p>
            <p className="text-sm font-medium text-on-surface">
              {acc.commission}
            </p>
          </div>
        </div>

        <div className="hidden lg:block col-span-2 text-right">
          <p className="text-sm font-medium text-on-surface">
            {acc.minDeposit}
          </p>
        </div>
        <div className="hidden lg:block col-span-2 text-right">
          <p className="text-sm font-medium text-on-surface whitespace-nowrap">
            {acc.spread}
          </p>
        </div>
        <div className="hidden lg:block col-span-2 text-right">
          <p className="text-sm font-medium text-on-surface">
            {acc.commission}
          </p>
        </div>
      </div>
    </div>
  );
}

function RuleItem({ text, met }) {
  return (
    <div
      className={`flex items-start gap-2 text-xs transition-colors ${met ? "text-emerald-600" : "text-secondary"}`}
    >
      <span className="material-symbols-outlined text-[14px] mt-0.5">
        {met ? "check_circle" : "radio_button_unchecked"}
      </span>
      <span>{text}</span>
    </div>
  );
}
