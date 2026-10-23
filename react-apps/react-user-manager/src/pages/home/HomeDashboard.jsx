import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

const shortcuts = [
  {
    to: "/users",
    title: "Browse users",
    description: "View profiles in your directory.",
    label: "Open directory",
  },
  {
    to: "/products",
    title: "Explore products",
    description: "Browse the latest product catalog.",
    label: "View products",
  },
  {
    to: "/users/new",
    title: "Add a person",
    description: "Create a profile in the user workspace.",
    label: "Create profile",
  },
];

export default function HomeDashboard() {
  const { loggedInUser } = useAuth();
  const displayName = loggedInUser?.firstName || loggedInUser?.username || "there";

  return (
    <main className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto w-full max-w-screen-xl">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-neutral-800 to-neutral-600 p-6 text-white shadow-lg sm:p-10">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Your workspace</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {displayName}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Manage your people and explore the product catalog from one place.
            </p>
            <Link to="/users" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200">
              Go to your directory
            </Link>
          </div>
          <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[32px] border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-28 right-28 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        </section>

        <section className="mt-8" aria-labelledby="quick-links-heading">
          <div className="mb-4">
            <h2 id="quick-links-heading" className="text-xl font-bold tracking-tight">Quick links</h2>
            <p className="text-muted-foreground mt-1 text-sm">Pick up where you want to go.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shortcuts.map((shortcut) => (
              <article key={shortcut.to} className="bg-card border-border flex min-h-44 flex-col rounded-2xl border p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{shortcut.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{shortcut.description}</p>
                <Link to={shortcut.to} className="text-primary mt-auto pt-5 text-sm font-semibold hover:underline">
                  {shortcut.label} <span aria-hidden="true">-&gt;</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
