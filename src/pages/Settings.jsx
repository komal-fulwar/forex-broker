import { useGetProfileQuery } from "../features/user/userApi";
import { SettingsSkeleton } from "../components/Skeletons";

function VerificationBadge({ verified }) {
  return verified ? (
    <div className="bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-xs font-bold leading-none shrink-0 border border-[#A5D6A7]/50">
      Verified
    </div>
  ) : (
    <div className="bg-error/10 text-error px-3 py-1 rounded-full text-xs font-bold leading-none shrink-0 border border-error/20">
      Unverified
    </div>
  );
}

function utilityBillVerified(status) {
  return status === "VERIFIED";
}

export default function Settings() {
  const { data: profile, isLoading } = useGetProfileQuery();

  if (isLoading) return <SettingsSkeleton />;

  const initials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`
    : "?";

  // Step 1: personal details — verified only when kycContactVerified is explicitly true
  const personalVerified = profile?.kycContactVerified === true;

  // Step 2: identity — verified if kycVerifiedName is present
  const identityVerified = !!profile?.kycVerifiedName;

  // Step 3: residential — verified if utilityBillStatus === 'VERIFIED'
  const residentialVerified = utilityBillVerified(profile?.utilityBillStatus);

  return (
    <div className="w-full animate-fade-in pb-16">
      <header className="mb-8 md:mb-12 border-b border-outline-variant/10 pb-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">
            Account Management
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            Profile Details
          </h1>
        </div>
      </header>

      <div className="space-y-12">
        {/* Verification Steps */}
        <div className="pt-2">
          <h2 className="text-xl font-bold text-on-surface mb-4">
            Verification steps
          </h2>

          <div className="bg-white border border-outline-variant/15 rounded-xl shadow-sm text-[13px] divide-y divide-outline-variant/10">
            {/* Step 1 — Personal details */}
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm mb-0.5">
                    Personal details
                  </h3>
                  <p className="text-secondary text-xs">
                    {profile?.kycContactEmail ?? "Not submitted"}
                    {profile?.kycContactPhone ? `, ${profile.kycContactPhone}` : ""}
                  </p>
                </div>
              </div>
              <VerificationBadge verified={personalVerified} />
            </div>

            {/* Step 2 — Identity verification */}
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm mb-0.5">
                    Identity verification
                  </h3>
                  <p className="text-secondary text-xs">
                    {profile?.kycVerifiedName ?? "Not submitted"}
                  </p>
                </div>
              </div>
              <VerificationBadge verified={identityVerified} />
            </div>

            {/* Step 3 — Residential address */}
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm mb-0.5">
                    Residential address verification
                  </h3>
                  <p className="text-secondary text-xs">
                    {profile?.address ?? "Not submitted"}
                  </p>
                </div>
              </div>
              <VerificationBadge verified={residentialVerified} />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-8 border-t border-outline-variant/10">
          <div className="md:col-span-4 lg:col-span-4">
            <h2 className="text-base font-bold text-on-surface mb-2">
              Personal Information
            </h2>
            <p className="text-xs text-secondary leading-relaxed">
              Update your photo and personal details here. This information is
              visible to your dedicated account manager.
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-8 bg-white rounded-xl border border-outline-variant/10 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-5 pb-8 mb-8 border-b border-outline-variant/10">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xl shrink-0 border border-outline-variant/5">
                {initials}
              </div>
              <p className="text-xl font-bold text-on-surface">
                {profile?.firstName ?? ""} {profile?.lastName ?? ""}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile?.firstName ?? ""}
                  readOnly
                  className="w-full bg-surface-container border border-outline-variant/10 rounded-lg text-sm font-medium py-2.5 px-4 outline-none text-secondary cursor-default"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue={profile?.lastName ?? ""}
                  readOnly
                  className="w-full bg-surface-container border border-outline-variant/10 rounded-lg text-sm font-medium py-2.5 px-4 outline-none text-secondary cursor-default"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    defaultValue={profile?.email ?? ""}
                    disabled
                    className="w-full bg-surface-container border border-outline-variant/10 rounded-lg text-sm font-medium py-2.5 px-4 text-secondary outline-none opacity-80 cursor-not-allowed pl-10"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-[18px]">
                    lock
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={profile?.phoneNumber ?? ""}
                  disabled
                  className="w-full bg-surface-container border border-outline-variant/10 rounded-lg text-sm font-medium py-2.5 px-4 text-secondary outline-none opacity-80 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
