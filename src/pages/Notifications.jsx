const NOTIFICATIONS = [
  {
    id: 1,
    title: "Withdrawal Processed",
    message: "Your bank wire for $12,500 has settled.",
    time: "2h ago",
    type: "success",
    icon: "check_circle",
    read: false,
  },
  {
    id: 2,
    title: "Margin Alert",
    message: "XT Pro account margin level is at 145%.",
    time: "5h ago",
    type: "warning",
    icon: "warning",
    read: false,
  },
  {
    id: 3,
    title: "New IB Client",
    message: "A new client registered under your referral link.",
    time: "1d ago",
    type: "info",
    icon: "person_add",
    read: false,
  },
  {
    id: 4,
    title: "Deposit Confirmed",
    message: "Your deposit of $5,000 has been credited to your account.",
    time: "2d ago",
    type: "success",
    icon: "payments",
    read: true,
  },
  {
    id: 5,
    title: "Account Verified",
    message: "Your identity verification has been approved.",
    time: "3d ago",
    type: "success",
    icon: "verified_user",
    read: true,
  },
  {
    id: 6,
    title: "Leverage Updated",
    message: "Your account leverage has been changed to 1:500.",
    time: "4d ago",
    type: "info",
    icon: "tune",
    read: true,
  },
];

function iconColors(type) {
  if (type === "success") return "bg-emerald-50 text-emerald-600";
  if (type === "warning") return "bg-amber-50 text-amber-600";
  return "bg-primary/10 text-primary";
}

export default function Notifications() {
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            Notifications
          </h1>
          <p className="text-secondary mt-1 text-sm">
            Stay updated on your account activity.
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
            {unreadCount} New
          </span>
        )}
      </header>

      {/* Unread */}
      {NOTIFICATIONS.filter((n) => !n.read).length > 0 && (
        <section>
          <p className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 mb-3">
            New
          </p>
          <div className="bg-white rounded-2xl border border-outline-variant/15 shadow-sm overflow-hidden">
            {NOTIFICATIONS.filter((n) => !n.read).map((notif, i, arr) => (
              <div
                key={notif.id}
                className={`flex gap-4 items-start p-5 hover:bg-surface-container/40 transition-colors cursor-pointer ${
                  i !== arr.length - 1
                    ? "border-b border-outline-variant/8"
                    : ""
                }`}
              >
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconColors(notif.type)}`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {notif.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-on-surface">
                      {notif.title}
                    </p>
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  </div>
                  <p className="text-sm text-secondary mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-[11px] text-secondary/60 mt-1.5">
                    {notif.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Read */}
      {NOTIFICATIONS.filter((n) => n.read).length > 0 && (
        <section>
          <p className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 mb-3">
            Earlier
          </p>
          <div className="bg-white rounded-2xl border border-outline-variant/15 shadow-sm overflow-hidden">
            {NOTIFICATIONS.filter((n) => n.read).map((notif, i, arr) => (
              <div
                key={notif.id}
                className={`flex gap-4 items-start p-5 hover:bg-surface-container/40 transition-colors cursor-pointer opacity-70 ${
                  i !== arr.length - 1
                    ? "border-b border-outline-variant/8"
                    : ""
                }`}
              >
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconColors(notif.type)}`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {notif.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-on-surface">
                    {notif.title}
                  </p>
                  <p className="text-sm text-secondary mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-[11px] text-secondary/60 mt-1.5">
                    {notif.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
