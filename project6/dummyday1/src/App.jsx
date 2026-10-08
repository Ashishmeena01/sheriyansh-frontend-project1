import { useEffect, useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';

function Formm({
  userData,
  setUserData,
  setCreate,
  formData,
  setFormData,
  save,
}) {
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUserData((prev) => [...prev, { ...formData, id: nanoid() }]);    
    setFormData({
      name: '',
      about: '',
      url: '',
    });
    setCreate(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border-border shadow-foreground/5 box-border flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-xl border p-10 text-center shadow-lg"
    >
      {/* Heading */}
      <div className="text-foreground text-4xl font-bold tracking-tight">
        Add Your Card
      </div>

      {/* Name */}
      <input
        required
        onChange={handleChange}
        value={formData.name}
        name="name"
        className="border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/10 box-border h-10 w-full rounded-md border p-2 outline-none"
        placeholder="Enter your name"
        type="text"
      />

      {/* About */}
      <input
        required
        onChange={handleChange}
        value={formData.about}
        name="about"
        className="border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/10 box-border h-10 w-full rounded-md border p-2 outline-none"
        placeholder="Enter your email"
        type="text"
      />

      {/* url */}
      <input
        required
        onChange={handleChange}
        value={formData.url}
        name="url"
        className="border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/10 box-border h-10 w-full rounded-md border p-2 outline-none"
        placeholder="Enter your password"
        type="url"
      />

      {/* Submit */}
      <button
        type="submit"
        className="from-foreground/80 via-foreground to-foreground/70 text-primary-foreground border-border shadow-foreground/10 h-10 w-full cursor-pointer rounded-md border bg-linear-to-r text-lg capitalize shadow-md transition-all hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
}

function Navbar({ create, setCreate }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {}, []);

  function changeTheme() {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      return nextTheme;
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

function Card({ key, user, deleteUser, updateUser }) {
  return (
    <div
      key={key}
      className="bg-background border-foreground/20 relative box-border flex h-96 min-w-80 flex-col items-start gap-2 overflow-hidden rounded border shadow shadow-black/20"
    >
      <img
        className="box-border w-80 h-full overflow-hidden bg-cover bg-center"
        src={user.url}
        alt="Kohli here"
      />
      <div className="flex flex-col items-start justify-around h-36 gap-2  px-6 pb-4">
        <div>
          <div className="text-3xl">{user.name}</div>
          <p className="text-gray-500">{user.about}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => updateUser(user.id)}
            className="cursor-pointer rounded-md bg-amber-950 p-2 px-6 text-white"
          >
            Update
          </button>
          <button
            onClick={() => deleteUser(user.id)}
            className="cursor-pointer rounded-md bg-blue-950 p-2 px-8 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [userData, setUserData] = useState(() => {
    let data = localStorage.getItem('user-data');
    data = JSON.parse(data);
    return data?data:[];
  });
  const [create, setCreate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    url: '',
  });

  function save() {
    localStorage.setItem('user-data', JSON.stringify(userData));
  }



  function deleteUser(id) {
    setUserData((prev) => prev.filter((val) => val.id != id));
  }

  function updateUser(id) {
    const user = userData.filter((val) => val.id == id);
    deleteUser(id);
    setFormData({ ...user[0] });
    setCreate(true);
  }

  save();

  return (
    <main className="font-display text-foreground bg-background box-border flex min-h-screen w-full flex-col items-center justify-start gap-12 p-6 transition-colors duration-200 md:p-10">
      <Navbar create={create} setCreate={setCreate} />

      {create && (
        <Formm
          userData={userData}
          save={save}
          setCreate={setCreate}
          formData={formData}
          setFormData={setFormData}
          setUserData={setUserData}
        />
      )}

      {!create && (
        <div className="flex w-full flex-wrap gap-3">
          {userData &&
            userData.map((val) => (
              <Card
                key={val.id}
                deleteUser={deleteUser}
                updateUser={updateUser}
                user={val}
              />
            ))}
        </div>
      )}
    </main>
  );
}

export default App;
