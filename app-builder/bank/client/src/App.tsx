import React, { useState, createContext } from 'react'
import {Div} from './Components/Assembler'
import Login from './pages/Login'
import './App.css'
import Dashboard from './pages/Dashboard';

export interface AuthContextType{
  setLogin : React.Dispatch<React.SetStateAction<boolean>>,
  setAccount : React.Dispatch<React.SetStateAction<string | null>>
}
export const AuthContext = createContext<AuthContextType | null>(null);
export const AccountContext = createContext<string | null>(null);
function App() {
  const [login, setLogin] = useState<boolean>(true);
  const [account, setAccount] = useState<string | null>(null);
  return (
    <>
      <Div cn="h-screen box-border bg-gray-700 md:w-full flex justify-center items-center">
        { login ? 
        // <Div>
        <AuthContext.Provider value={{setLogin, setAccount}}>
            <Login></Login>
        </AuthContext.Provider>
        // {/* </Div> */}
        :
        <AccountContext.Provider value={account}>
                  <Dashboard />
        </AccountContext.Provider>
        }
      </Div>
    </>
  )
}

export default App
