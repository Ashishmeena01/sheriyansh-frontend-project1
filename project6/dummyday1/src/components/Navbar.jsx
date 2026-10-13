import { useState,useEffect, useContext } from "react";
import { AcX } from "../context/AppContext";

function Navbar() {
  const [theme, setTheme] = useState('light');
    const { create, setCreate } = useContext(AcX);
   
  useEffect(() => { }, []);

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
    <nav className="bg-card border-border text-foreground flex w-full items-center justify-between rounded-md border p-4 shadow-sm">
      {/* Logo */}
      <div className="text-3xl font-bold tracking-tight">CRUD</div>

      <div className="flex gap-2">
        <button
          onClick={() => setCreate((val) => !val)}
          className="bg-primary text-primary-foreground cursor-pointer rounded-md px-6 py-2 capitalize transition hover:opacity-80"
        >
          {!create ? 'create' : 'close'}
        </button>

        {/* Theme Button */}
        <button
          onClick={changeTheme}
          className="bg-primary text-primary-foreground cursor-pointer rounded-md px-6 py-2 capitalize transition hover:opacity-80"
        >
          {theme}
        </button>
      </div>
    </nav>
  );
}


export default Navbar;