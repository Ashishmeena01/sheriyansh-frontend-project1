import { Link } from "react-router";

const UserCard = ({ user }) => {
  if (!user) return null;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const location = [user.address?.city, user.address?.state, user.address?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-24 shrink-0 bg-gradient-to-br from-black via-neutral-800 to-neutral-600 sm:h-28">
        <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-slate-950/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          ID {user.id}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="-mt-10 flex items-end justify-between gap-3">
          <img
            src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`}
            alt={fullName}
            loading="lazy"
            className="h-20 w-20 rounded-2xl border-4 border-card bg-muted object-cover grayscale shadow-md sm:h-22 sm:w-22"
          />
          <span className="mb-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold capitalize text-secondary-foreground">
            {user.role || "user"}
          </span>
        </div>

        <div className="mt-3 min-h-14">
          <h2 className="truncate text-lg font-bold tracking-tight text-foreground" title={fullName}>
            {fullName}
          </h2>
          <p className="truncate text-sm text-muted-foreground">@{user.username}</p>
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x divide-border rounded-xl bg-muted py-3 text-center">
          <div className="px-1">
            <p className="text-sm font-bold capitalize text-foreground">{user.age ?? "—"}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Age</p>
          </div>
          <div className="px-1">
            <p className="truncate px-1 text-sm font-bold capitalize text-foreground">{user.gender || "—"}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Gender</p>
          </div>
          <div className="px-1">
            <p className="text-sm font-bold text-foreground">{user.bloodGroup || "—"}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Blood</p>
          </div>
        </div>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="min-w-0">
            <dt className="text-xs font-medium text-muted-foreground">Email</dt>
            <dd className="truncate font-medium text-foreground" title={user.email}>{user.email || "Not provided"}</dd>
          </div>
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
              <dt className="text-xs font-medium text-muted-foreground">Phone</dt>
              <dd className="truncate font-medium text-foreground">{user.phone || "Not provided"}</dd>
            </div>
            {location && (
              <div className="min-w-0 text-right">
                <dt className="text-xs font-medium text-muted-foreground">Location</dt>
                <dd className="max-w-32 truncate font-medium text-foreground" title={location}>{location}</dd>
              </div>
            )}
          </div>
        </dl>

        {user.company?.name && (
          <div className="mt-4 min-w-0 border-t border-border pt-3">
            <p className="truncate text-sm font-semibold text-foreground">{user.company.name}</p>
            <p className="truncate text-xs text-muted-foreground">{[user.company.title, user.company.department].filter(Boolean).join(" · ")}</p>
          </div>
        )}

        <Link
          to={`/users/${user.id}`}
          className="mt-auto block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
        >
          View profile
        </Link>
      </div>
    </article>
  );
};

export default UserCard;
