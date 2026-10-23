import Card from "../../components/UserCard";
import useUsersData from "../../hooks/useUsersData";
import { Link } from "react-router";

function UserDirectorySidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-border pb-4 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-52 lg:border-r lg:border-b-0 lg:pb-0 lg:pr-5">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">User management</p>
      <nav aria-label="User management" className="flex flex-wrap gap-2 lg:flex-col">
        <Link to="/users/new" className="rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
          Create user
        </Link>
        <div className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground">Delete</div>
        <div className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground">Update</div>
      </nav>
    </aside>
  );
}


function UserDirectory() {
  const { isLoading, data, error } = useUsersData();
  
  if (isLoading) {
    return <main className="px-4 py-8 sm:px-6 lg:px-8" aria-live="polite"><p className="text-muted-foreground">Loading users…</p></main>
  }
  
  if (error) {
    return <main className="px-4 py-8 sm:px-6 lg:px-8"><p className="text-muted-foreground" role="alert">Could not load users: {error.message}</p></main>
  }
  const { users } = data;


  return (
    <main className="w-full min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8" aria-labelledby="directory-heading">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 lg:flex-row lg:items-stretch">
        <UserDirectorySidebar />
        <div className="min-w-0 flex-1">
          <header className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.18em]">Directory</p>
              <h1 id="directory-heading" className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Your people</h1>
            </div>
            <p className="text-muted-foreground text-sm">Showing {users.length} people</p>
          </header>

          {users.length ? (
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {users.map((user) => <Card key={user.id} user={user} />)}
            </div>
          ) : (
            <div className="border-border bg-card flex min-h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-8 text-center">
              <h2 className="text-xl font-semibold">Your directory is empty</h2>
              <p className="text-muted-foreground max-w-sm">Add someone to get started. Their profile cards will be collected here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default UserDirectory;
