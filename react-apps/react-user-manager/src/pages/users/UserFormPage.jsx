import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { nanoid } from "nanoid";
import { AcX } from "../../context/AppContext";

const emptyForm = { name: "", about: "", url: "" };

function UserFormPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(AcX);
  const existingUser = userData.find((user) => user.id === userId);
  const [formData, setFormData] = useState(existingUser ?? emptyForm);
  const editing = Boolean(userId);

  useEffect(() => {
    setFormData(existingUser ?? emptyForm);
  }, [userId, existingUser]);

  function handleChange(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (editing && existingUser) {
      setUserData((current) => current.map((user) => user.id === userId ? { ...formData, id: userId } : user));
    } else {
      setUserData((current) => [...current, { ...formData, id: nanoid() }]);
    }
    navigate("/users");
  }

  if (editing && !existingUser) {
    return (
      <section className="bg-card border-border flex flex-col items-center gap-4 rounded-2xl border p-10 text-center">
        <h1 className="text-2xl font-bold">Profile not found</h1>
        <Link className="bg-primary text-primary-foreground rounded-lg px-5 py-2 font-medium" to="/users">Back to directory</Link>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border-border shadow-foreground/5 mx-auto box-border flex w-full max-w-xl flex-col gap-5 rounded-2xl border p-6 shadow-lg sm:p-10">
      <div>
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.18em]">Directory</p>
        <h1 className="text-3xl font-bold tracking-tight">{editing ? "Edit profile" : "Add a person"}</h1>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium">Name
        <input required onChange={handleChange} value={formData.name} name="name" className="border-border text-foreground placeholder:text-muted-foreground h-11 w-full rounded-lg border bg-transparent p-3 outline-none focus:ring-2 focus:ring-foreground/20" placeholder="Enter their name" type="text" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">About
        <textarea required onChange={handleChange} value={formData.about} name="about" className="border-border text-foreground placeholder:text-muted-foreground min-h-28 w-full resize-y rounded-lg border bg-transparent p-3 outline-none focus:ring-2 focus:ring-foreground/20" placeholder="A short introduction" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">Photo URL
        <input required onChange={handleChange} value={formData.url} name="url" className="border-border text-foreground placeholder:text-muted-foreground h-11 w-full rounded-lg border bg-transparent p-3 outline-none focus:ring-2 focus:ring-foreground/20" placeholder="https://example.com/photo.jpg" type="url" />
      </label>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-primary text-primary-foreground cursor-pointer rounded-lg px-5 py-2.5 font-semibold">{editing ? "Save changes" : "Add profile"}</button>
        <Link to="/users" className="border-border rounded-lg border px-5 py-2.5 font-semibold">Cancel</Link>
      </div>
    </form>
  );
}

export default UserFormPage;
