import './App.css'
import MainPage from './components/mainPage'
import { ClockProvider } from './context/ClockContext';

function App() {

  return (
    <ClockProvider>
      <MainPage />
    </ClockProvider>
  )
}

export default App
