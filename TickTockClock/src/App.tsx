import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/mainPage'
import SettingsPage from './components/Settings/SettingsPage';
import GeneralSection from './components/Settings/GeneralSection';
import AudioSection from './components/Settings/AudioSection';
import AdvancedSection from './components/Settings/AdvancedSection';
import { ClockProvider } from './context/ClockContext';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <SettingsProvider>
          <ClockProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/settings" element={<SettingsPage />}>
                <Route index element={<Navigate to="general" replace />} />
                <Route path="general" element={<GeneralSection />} />
                <Route path="audio" element={<AudioSection />} />
                <Route path="advanced" element={<AdvancedSection />} />
              </Route>
            </Routes>
          </ClockProvider>
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
