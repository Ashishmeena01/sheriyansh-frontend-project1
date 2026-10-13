import { useContext } from "react";
import { AcX } from "../context/AppContext";

function Card({ id, user }) {
    const {deleteUser,updateUser} = useContext(AcX)
  return (
    <div
      key={id}
      className="bg-card border-foreground/20 relative box-border flex h-96 min-w-80 flex-col items-start gap-2 overflow-hidden rounded border shadow shadow-black/20"
    >
      <img
        className="box-border w-80 h-full overflow-hidden bg-cover bg-center"
        src={user.url}
        alt="Kohli here"
      />
      <div className="flex flex-col items-start justify-around h-36 gap-2  px-6 pb-4">
        <div>
          <div className="text-3xl">{user.name}</div>
          <p className="text-secondary-foreground/60">{user.about}</p>
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

export default Card;