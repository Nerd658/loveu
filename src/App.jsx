import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Coach from './pages/Coach'
import Planning from './pages/Planning'
import Settings from './pages/Settings'
import Ask from './pages/Ask'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Ask />} />
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="coach" element={<Coach />} />
        <Route path="planning" element={<Planning />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
