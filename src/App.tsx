import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { DetailPost } from './pages/DetailPosts'

function App() {

  const [search, setSearth] = useState<string>('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearth(e.target.value)

  return (
    <>
      <Header onHandleChange={handleChange} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home searchParam={search} />} />
          <Route path='/detail/:id' element={<DetailPost searchParam={search} />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
