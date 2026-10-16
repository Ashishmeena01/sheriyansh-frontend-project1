import React, { createContext, useContext, useState } from 'react'


const AuthContext = createContext();


function AuthProvider({children}) {
    const [LogedInUser, setIsLogedInUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem("LogedInUser"));

        if (!user) return null;
        return user;
    });
    const [registeredUser, setRegisteredUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem("registeredUser"));
        if (!user) return [];
        return user;
    })


  return (
    <AuthContext.Provider value={{LogedInUser,setIsLogedInUser,registeredUser,setRegisteredUser}}>
        {children}
    </AuthContext.Provider>
  )
}


const useAuth = ()=> useContext(AuthContext);

export {useAuth};
export default AuthProvider
