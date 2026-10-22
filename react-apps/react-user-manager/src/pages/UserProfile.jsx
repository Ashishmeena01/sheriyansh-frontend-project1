import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AcX } from "../context/AppContext";

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userData, deleteUser } = useContext(AcX);
  const user = userData.find((entry) => entry.id === userId);

  if (!user) {
    return (
      <section className="bg-card border-border flex flex-col items-center gap-4 rounded-2xl border p-10 text-center">
        <h1 className="text-2xl font-bold">Profile not found</h1>
        <p className="text-muted-foreground">This profile may have been removed.</p>
        <Link className="bg-primary text-primary-foreground rounded-lg px-5 py-2 font-medium" to="/users">Back to directory</Link>
      </section>
    );
  }

  function handleDelete() {
    deleteUser(user.id);
    navigate("/users");
  }

  return (
    <section className="bg-card border-border mx-auto grid w-full max-w-4xl overflow-hidden rounded-2xl border shadow-sm md:grid-cols-2">
      <img className="bg-muted aspect-[4/3] h-full w-full object-cover md:aspect-auto" src={user.url} alt={user.name} />
      <div className="flex flex-col items-start gap-5 p-6 sm:p-9">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.18em]">User profile</p>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-muted-foreground mt-3 leading-7">{user.about}</p>
        </div>
        <div className="mt-auto flex w-full flex-wrap gap-3 border-t border-border pt-5">
          <Link className="bg-primary text-primary-foreground rounded-lg px-5 py-2 font-medium" to={`/users/${user.id}/edit`}>Edit profile</Link>
          <button onClick={handleDelete} className="bg-secondary text-secondary-foreground cursor-pointer rounded-lg px-5 py-2 font-medium">Delete</button>
          <Link className="text-muted-foreground px-2 py-2 text-sm font-medium" to="/users">Back to directory</Link>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
