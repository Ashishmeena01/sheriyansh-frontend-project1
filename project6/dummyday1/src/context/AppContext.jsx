import { createContext ,useState} from "react";



const AcX = createContext();

function AppContext({children}) {



    const [userData, setUserData] = useState(() => {
        let data = localStorage.getItem('user-data');
        data = JSON.parse(data);
        return data ? data : [];
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

    save();

    function deleteUser(id) {
        setUserData((prev) => prev.filter((val) => val.id != id));
      
    }

    function updateUser(id) {
        const user = userData.filter((val) => val.id == id);
        deleteUser(id);
        setFormData({ ...user[0] });
        setCreate(true);
    }

  return (
    <AcX.Provider value={{updateUser,deleteUser,setCreate,save,formData,setFormData,setUserData,create,userData}}>
        {children}
    </AcX.Provider>
  )
}

export default AppContext
export {AcX}