import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { User, Mail, Github, Linkedin, Twitter, Folder, Monitor } from 'lucide-react'
import DesktopIcon from './components/DesktopIcon'
import Window from './components/Window'
import './App.css'

function App() {
  const [openWindows, setOpenWindows] = useState({
    about: false,
    projects: false,
    contact: false
  })

  const [windowPositions, setWindowPositions] = useState({
    about: { x: 100, y: 100 },
    projects: { x: 150, y: 150 },
    contact: { x: 200, y: 200 }
  })

  const openWindow = (windowName) => {
    setOpenWindows(prev => ({ ...prev, [windowName]: true }))
  }

  const closeWindow = (windowName) => {
    setOpenWindows(prev => ({ ...prev, [windowName]: false }))
  }

  const updateWindowPosition = (windowName, position) => {
    setWindowPositions(prev => ({ ...prev, [windowName]: position }))
  }

  return (
    <div className="win95-desktop">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col">
        <DesktopIcon 
          icon={User} 
          label="About Me" 
          onClick={() => openWindow('about')} 
        />
        <DesktopIcon 
          icon={Folder} 
          label="Projects" 
          onClick={() => openWindow('projects')} 
        />
        <DesktopIcon 
          icon={Mail} 
          label="Contact" 
          onClick={() => openWindow('contact')} 
        />
      </div>

      {/* About Window */}
      <Window
        title="About Me - Personal Information"
        isOpen={openWindows.about}
        onClose={() => closeWindow('about')}
        position={windowPositions.about}
        onPositionChange={(pos) => updateWindowPosition('about', pos)}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-24 h-24 bg-gray-300 border-2 border-gray-600 flex items-center justify-center">
              <User size={48} />
            </div>
            <div>
              <h2 className="text-lg font-bold">John Doe</h2>
              <p className="text-sm">Creative Developer</p>
              <p className="text-sm">Windows 95 Enthusiast</p>
            </div>
          </div>
          
          <div className="win95-content bg-white border-2 border-gray-600 p-4">
            <h3 className="font-bold mb-2">Bio:</h3>
            <p className="text-sm leading-relaxed">
              Welcome to my retro portfolio! I'm a passionate developer who loves creating 
              modern applications with a nostalgic twist. I specialize in web development, 
              UI/UX design, and bringing creative ideas to life through code.
            </p>
            
            <h3 className="font-bold mt-4 mb-2">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'React', 'CSS', 'HTML', 'Node.js', 'Python'].map(skill => (
                <span key={skill} className="win95-button text-xs px-2 py-1">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Window>

      {/* Projects Window */}
      <Window
        title="My Projects - Portfolio Showcase"
        isOpen={openWindows.projects}
        onClose={() => closeWindow('projects')}
        position={windowPositions.projects}
        onPositionChange={(pos) => updateWindowPosition('projects', pos)}
      >
        <div className="space-y-4">
          <h2 className="font-bold text-lg mb-4">Featured Projects</h2>
          
          {[
            {
              name: "Retro Calculator",
              description: "A Windows 95 styled calculator app",
              tech: "JavaScript, CSS"
            },
            {
              name: "Pixel Art Gallery",
              description: "Interactive pixel art showcase",
              tech: "React, Canvas API"
            },
            {
              name: "Nostalgic Music Player",
              description: "Winamp-inspired music player",
              tech: "React, Web Audio API"
            }
          ].map((project, index) => (
            <div key={index} className="win95-content bg-white border-2 border-gray-600 p-3">
              <h3 className="font-bold text-sm">{project.name}</h3>
              <p className="text-xs mt-1">{project.description}</p>
              <p className="text-xs text-gray-600 mt-2">Tech: {project.tech}</p>
              <button className="win95-button mt-2 text-xs">View Project</button>
            </div>
          ))}
        </div>
      </Window>

      {/* Contact Window */}
      <Window
        title="Contact Information - Get In Touch"
        isOpen={openWindows.contact}
        onClose={() => closeWindow('contact')}
        position={windowPositions.contact}
        onPositionChange={(pos) => updateWindowPosition('contact', pos)}
      >
        <div className="space-y-4">
          <h2 className="font-bold text-lg mb-4">Let's Connect!</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-gray-600">
              <Mail size={16} />
              <span className="text-sm">john.doe@email.com</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-gray-600">
              <Github size={16} />
              <span className="text-sm">github.com/johndoe</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-gray-600">
              <Linkedin size={16} />
              <span className="text-sm">linkedin.com/in/johndoe</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-gray-600">
              <Twitter size={16} />
              <span className="text-sm">@johndoe95</span>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="win95-button mr-2">Send Email</button>
            <button className="win95-button">Download CV</button>
          </div>
        </div>
      </Window>

      {/* Taskbar */}
      <div className="win95-taskbar">
        <button className="win95-start-button">
          <Monitor size={16} />
          Start
        </button>
        
        <div className="flex-1 mx-2">
          {Object.entries(openWindows).map(([windowName, isOpen]) => 
            isOpen && (
              <button 
                key={windowName}
                className="win95-button mx-1 text-xs"
                onClick={() => closeWindow(windowName)}
              >
                {windowName.charAt(0).toUpperCase() + windowName.slice(1)}
              </button>
            )
          )}
        </div>
        
        <div className="text-xs px-2">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default App

