import React, { useState, createContext } from 'react'
import {Div} from './Components/Assembler'
import Login from './pages/Login'
import './App.css'
import Dashboard from './pages/Dashboard';

export const AuthContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null);
function App() {
  const [login, setLogin] = useState<boolean>(false)

  return (
    <>
      <Div cn="h-screen box-border bg-gray-700 md:w-full flex justify-center items-center">
        { login ? 
        // <Div>
        <AuthContext.Provider value={setLogin}>
            <Login></Login>
        </AuthContext.Provider>
        // {/* </Div> */}
        :
        <Dashboard />
        }
      </Div>
    </>
  )
}

export default App
