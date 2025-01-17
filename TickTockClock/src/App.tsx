import './App.css'
import MainPage from './components/mainPage'
import { ClockProvider } from './context/ClockContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <ClockProvider>
        <MainPage />
      </ClockProvider>
    </ThemeProvider>
  )
}

export default App
