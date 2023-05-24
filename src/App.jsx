import React from 'react'
import Home from './pages/home/Home'
import { DetailContextProvider } from './context/detailContext'

function App() {

  return (
    <DetailContextProvider>
      <Home/>
    </DetailContextProvider>
  )
}

export default App
