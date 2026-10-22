import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [theme, setTheme] = useState('light');
  const { logOut } = useAuth();

  function h() {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      return nextTheme;
    });
  }

  function changeTheme() {
    if (!document.startViewTransition) {
      h();
      return;
    }

   

    const t = document.startViewTransition(h);

    t.ready.then(() => {
      // Animate clip-path from 0px to cover screen
      document.documentElement.animate(
        {
          clipPath: [
            `inset(0px 0px 100% 0)`,
            `inset(0px 0px 0px 0px round 0px)`
          ]
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  }

  return (
    <nav className="bg-card sticky top-0 left-0 border-border text-foreground flex w-40 flex-col h-screen items-center justify-between rounded-2xl border px-5 py-4 shadow-sm sm:px-6 ">
      <div>
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">People</p>
        <div className="text-xl font-bold tracking-tight sm:text-2xl">User Manager</div>
      </div>

      <div className="flex flex-col gap-2">
        <Link className={(val)=>{
          console.log(val )
          return "text-gray-200"
        }}  to="/">Home</Link>
        <Link to={"products"}>Products</Link>
        <Link to="users">User</Link>
      </div>

      <div className="flex gap-2 flex-col">
        <Link to="/users/new" className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold capitalize transition hover:opacity-80 sm:px-5">
          Add person
        </Link>

        {/* Theme Button */}
        <button
          onClick={changeTheme}
          className="border-border text-foreground cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold capitalize transition hover:bg-secondary sm:px-5"
        >
          {theme}
        </button>

        <button
          onClick={logOut}
          className="border-border text-foreground cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold capitalize transition hover:bg-secondary sm:px-5"
        >
          LogOut
        </button>
      </div>
    </nav>
  );
}


export default Navbar;
