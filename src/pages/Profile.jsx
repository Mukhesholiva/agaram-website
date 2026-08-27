import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, clearToken, getToken } from '../lib/api.js';

const LOGOUT_BTN_CLASS =
  'z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 text-small gap-2 rounded-small [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-primary text-primary data-[hover=true]:opacity-hover hover:opacity-hover font-medium';

const STATUS_CHIP_CLASSES = {
  paid: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  created: 'bg-gray-100 text-gray-700',
};

function StatusChip({ status }) {
  const color = STATUS_CHIP_CLASSES[status] || STATUS_CHIP_CLASSES.created;
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${color}`}>
      {status === 'created' ? 'pending' : status}
    </span>
  );
}

function formatDate(value) {
  if (!value) return '';
  // SQLite current_timestamp -> "YYYY-MM-DD HH:MM:SS" (UTC)
  const d = new Date(String(value).includes('T') ? value : `${String(value).replace(' ', 'T')}Z`);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatAmount(amount) {
  const n = Number(amount);
  return Number.isNaN(n) ? String(amount) : n.toLocaleString('en-IN');
}

// Loading skeleton (the page's previous static state, kept as-is).
function ProfileSkeleton() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 animate-pulse">
      <div className="w-full max-w-[420px] space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
        <div className="h-12 w-full bg-gray-200 rounded"></div>
        <div className="h-12 w-full bg-gray-200 rounded"></div>
        <div className="h-12 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    document.title = 'Profile | Agaram Foundation';
  }, []);

  useEffect(() => {
    if (!getToken()) {
      navigate('/login', { replace: true });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [me, mine] = await Promise.all([
          api('/api/auth/me', { auth: true }),
          api('/api/donations/mine', { auth: true }),
        ]);
        if (cancelled) return;
        setUser(me.user);
        setDonations(mine.donations || []);
      } catch (err) {
        if (cancelled) return;
        if (err.status === 401) {
          clearToken();
          navigate('/login', { replace: true });
          return;
        }
        setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="flex min-h-screen w-full bg-white">
        <div className="hidden lg:flex lg:w-1/2 bg-primary"></div>
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-xl space-y-6 py-10">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center">My Profile</h1>
              {error ? <p className="text-danger text-sm text-center">{error}</p> : null}
              {user ? (
                <div
                  className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large motion-reduce:transition-none shadow-lg"
                  tabIndex={-1}
                >
                  <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                      {user.phone ? <p className="text-gray-600 text-sm">{user.phone}</p> : null}
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large motion-reduce:transition-none shadow-lg"
                tabIndex={-1}
              >
                <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">My Donations</h3>
                  {donations.length === 0 ? (
                    <p className="text-gray-500 text-sm">You haven't made any donations yet.</p>
                  ) : (
                    <div className="w-full">
                      {donations.map((d) => (
                        <div
                          key={d.id}
                          className="flex items-center justify-between gap-4 py-3 border-b border-gray-100"
                        >
                          <div>
                            <p className="text-gray-800 text-sm font-semibold">₹{formatAmount(d.amount)}</p>
                            <p className="text-gray-600 text-sm">
                              {d.plan ? `${d.plan} · ` : ''}
                              <span className="capitalize">{d.frequency === 'monthly' ? 'Monthly' : 'One Time'}</span>
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <StatusChip status={d.status} />
                            <span className="text-xs text-gray-500">{formatDate(d.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button type="button" className={LOGOUT_BTN_CLASS} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
