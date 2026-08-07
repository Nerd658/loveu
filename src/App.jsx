import { Routes, Route } from 'react-router-dom'
import Ask from './pages/Ask'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Ask />} />
    </Routes>
  )
}

export default App
