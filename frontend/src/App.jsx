import { useState } from 'react'
import './App.css'
import { appRouter } from './App.routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/Auth.context.jsx'

function App() {

  return (
    <>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
    </>
  )
}

export default App
