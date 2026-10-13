import { useContext} from 'react';
import './App.css';
import Navbar from "./components/Navbar.jsx"
import Card from './components/UserCard.jsx';
import Formm from './components/Form.jsx';
import  { AcX } from './context/AppContext.jsx';



function App() {
  console.log(AcX.Consumer._context._currentvalue);
  const {create,userData} = useContext(AcX);
  // let userData1 = userData ?? localStorage.ge("user-data")
  // console.log(userData1)
  return (
      <main className="font-display text-foreground bg-background box-border flex min-h-screen w-full flex-col items-center justify-start gap-12 p-6 transition-colors duration-200 md:p-10">
        <Navbar />
    
        {create && (
          <Formm
          />
        )}

        {!create && (
          <div className="flex w-full flex-wrap gap-3">
            {userData &&
              userData.map((val) => (
                <Card
                  key={val.id}
                  id={val.id}
                  user={val}
                />
              ))}
          </div>
        )}
      </main>
  );
}

export default App;
