import { useContext } from "react";
import { AcX } from "../context/AppContext";
import Card from "../components/UserCard";

function UserDirectory() {
  const { userData } = useContext(AcX);

  return (
    <section className="flex flex-col gap-6" aria-labelledby="directory-heading">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.18em]">Directory</p>
          <h1 id="directory-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Your people</h1>
        </div>
        <p className="text-muted-foreground text-sm">{userData.length} {userData.length === 1 ? "person" : "people"}</p>
      </div>
      {userData.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userData.map((user) => <Card key={user.id} user={user} />)}
        </div>
      ) : (
        <div className="border-border bg-card flex min-h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-8 text-center">
          <h2 className="text-xl font-semibold">Your directory is empty</h2>
          <p className="text-muted-foreground max-w-sm">Add someone to get started. Their profile cards will be collected here.</p>
        </div>
      )}
    </section>
  );
}

export default UserDirectory;
