import React, { createContext, useContext, useState } from 'react'


const AuthCnx = createContext();


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
    <AuthCnx.Provider value={{LogedInUser,setIsLogedInUser,registeredUser,setRegisteredUser}}>
        {children}
    </AuthCnx.Provider>
  )
}


const useAuth = ()=> useContext(AuthCnx);

export {useAuth};
export default AuthProvider
