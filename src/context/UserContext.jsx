import React, { createContext, useEffect, useState } from 'react';
import { account, client, ID } from '../appwrite/configAppwrite';
import { useCallback } from 'react';
import { Account } from 'appwrite';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg,setMsg]=useState({})
  const [isCheckingSession, setIsCheckingSession] = useState(true);  // Hozzáadtuk

  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const account = new Account(client);
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.warn("Nincs aktív session.");
        setUser(null);
      } finally {
        setLoading(false); // Állapotfrissítés, hogy a betöltés véget ért
      }
    };
  
    checkUser();
    
  }, []);
  
  useEffect(()=> {
    if (!user) return
    account.listIdentities(
      [] // queries (optional)
    ).then(console.log)
  }, [account, user])

 const  login=async (email, password)=> {
  try {
    await account.createEmailPasswordSession(email, password);
    const loggedInUser = await account.get(); // Frissítsd a user állapotot
    setUser(loggedInUser);
  } catch (error) {
      console.error(error);
  }
    
  }

  const register=async (email,password,name)=>{
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      await account.createVerification("http://localhost:5173/verify");
      setMsg({ type: "success", text: "Ellenőrző email elküldve!" });

    } catch (error) {
      console.error(error);
    }
   
  }

  const logout=async ()=>{
    if(!user) return
    console.log('kijelentkezés');
    
     await account.deleteSession('current');
      setUser(null);
  }

  const verifyEmail =useCallback( async (userId, secret) => {
    try {
      await account.updateVerification(userId, secret);
      setMsg({ type: "success", text: "Sikeres email megerősítés! Most már bejelentkezhetsz." });
    } catch (error) {
      console.error(error);
      setMsg({ type: "error", text: "Hiba történt a megerősítés során." });
    }
  },[]);
  
  const sendVerificationEmail = async () => {

    try {
        await account.createVerification("http://localhost:5173/verify");
        setMsg({ type: "success", text: "Ellenőrző e-mail újraküldve!" });
        logout()
    } catch (error) {
      console.error("Email küldés hiba:", error?.response?.data?.message);
      setMsg({ type: "error", text: "Hiba történt az e-mail újraküldésekor." });
    }
 
  };

  // Jelszó frissítés
  const updatePassword = useCallback(async (newPassword, oldPassword = '') => {
    try {
      const result = await account.updatePassword(newPassword, oldPassword);
      console.log("Password updated successfully:", result);
      setMsg({ type: 'success', text: 'A jelszó sikeresen frissítve!' });
    } catch (error) {
      console.error("Hiba történt a jelszó frissítésekor:", error);
      setMsg({ type: 'error', text: 'Hiba történt a jelszó frissítésekor.' });
    }
  }, [user]);

    return (
    <UserContext.Provider value={{user,login,register,logout,verifyEmail,msg,sendVerificationEmail,updatePassword}}>                                   
      {children}
    </UserContext.Provider>
  );
};
