import { Link } from "react-router";

function Card({ user }) {
  return (
    <article
      className="bg-card border-border flex min-w-0 flex-col overflow-hidden rounded-2xl border shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <img
        className="bg-muted aspect-[4/3] w-full object-cover"
        src={user.url}
        alt={user.name}
      />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="min-w-0">
          <Link to={`/users/${user.id}`} className="truncate text-xl font-semibold hover:underline">{user.name}</Link>
          <p className="text-muted-foreground mt-1 line-clamp-3 text-sm leading-6">{user.about}</p>
        </div>
        <div className="mt-auto border-t border-border pt-4">
          <Link to={`/users/${user.id}`} className="bg-primary text-primary-foreground block rounded-lg px-4 py-2 text-center text-sm font-medium transition hover:opacity-80">
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Card;
