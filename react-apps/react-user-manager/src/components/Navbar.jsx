import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const { logOut } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    const toggle = () => setTheme((current) => current === "dark" ? "light" : "dark");
    if (document.startViewTransition) document.startViewTransition(toggle);
    else toggle();
  }

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`;

  return (
    <nav className="bg-card border-border z-10 flex w-full shrink-0 flex-col gap-5 border-b px-4 py-4 shadow-sm md:sticky md:top-0 md:h-screen md:w-60 md:justify-between md:border-r md:border-b-0 md:px-5 md:py-6">
      <div className="flex items-center justify-between gap-4 md:block">
        <Link to="/" className="block">
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.18em]">People</p>
          <span className="text-foreground text-xl font-bold tracking-tight">User Manager</span>
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="border-border text-foreground rounded-lg border px-3 py-2 text-sm font-semibold transition hover:bg-secondary md:hidden"
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 md:flex-col">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/products" className={linkClass}>Products</NavLink>
        <NavLink to="/users" className={linkClass}>Users</NavLink>
      </div>

      <div className="flex flex-wrap gap-2 md:flex-col">
        <Link to="/users/new" className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition hover:opacity-90">
          Add person
        </Link>
        <button type="button" onClick={toggleTheme} className="border-border text-foreground hidden rounded-lg border px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary md:block">
          {theme === "dark" ? "Light theme" : "Dark theme"}
        </button>
        <button type="button" onClick={logOut} className="border-border text-foreground rounded-lg border px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary">
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
