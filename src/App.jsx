"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { NotificationProvider } from "/src/context/NotificationContext"
import { TaskProvider } from "./context/TaskContext"
import { AuthProvider, useAuth } from "./context/authContext"
import { ThemeProvider } from "./context/ThemeContext"
import { LanguageProvider } from "./context/LanguageContext"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"
import NotificationToast from "./components/notification-toast"
import ThemeToggle from "./components/ThemeToggle"
import LanguageSelector from "./components/LanguageSelector"
import "./App.css" // Ensure your global styles are here

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <TaskProvider>
          <ThemeProvider>
            <LanguageProvider>
              <Router>
                <div className="app-layout">
                  <header className="app-header">
                    <h1>WhaTODO?</h1>
                    <div className="header-controls">
                      <LanguageSelector />
                      <ThemeToggle />
                    </div>
                  </header>
                  <main className="app-main">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                  <NotificationToast />
                  <footer className="app-footer">
                    <p>&copy; {new Date().getFullYear()} My To Do List</p>
                  </footer>
                </div>
              </Router>
            </LanguageProvider>
          </ThemeProvider>
        </TaskProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
