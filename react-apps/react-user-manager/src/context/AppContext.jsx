import { createContext, useState } from "react";



const AcX = createContext();

const starterUsers = [
    {
        id: 'starter-1',
        name: 'Aarav Mehta',
        about: 'Product designer who enjoys turning complex ideas into simple, thoughtful experiences.',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    },
    {
        id: 'starter-2',
        name: 'Maya Kapoor',
        about: 'Frontend developer, coffee enthusiast, and weekend photographer.',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    },
    {
        id: 'starter-3',
        name: 'Rohan Shah',
        about: 'Building useful things with code. Usually found exploring a new playlist.',
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85',
    },
    {
        id: 'starter-4',
        name: 'Isha Nair',
        about: 'Illustrator and visual storyteller inspired by nature, cities, and everyday life.',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85',
    },
    {
        id: 'starter-5',
        name: 'Kabir Joshi',
        about: 'Community builder who believes the best work happens when people share ideas.',
        url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=800&q=85',
    },
    {
        id: 'starter-6',
        name: 'Anaya Rao',
        about: 'Curious about technology, good food, and finding new places to explore.',
        url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=85',
    },
];

function AppContext({children}) {



    const [userData, setUserData] = useState(starterUsers);

    function deleteUser(id) {
        setUserData((prev) => prev.filter((user) => user.id !== id));
    }

  return (
    <AcX.Provider value={{ deleteUser, setUserData, userData }}>
        {children}
    </AcX.Provider>
  )
}

export default AppContext
export {AcX}
