import { useState } from 'react'

const DesktopIcon = ({ icon: Icon, label, onClick }) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleDoubleClick = () => {
    onClick()
  }

  const handleClick = () => {
    setIsSelected(true)
    setTimeout(() => setIsSelected(false), 200)
  }

  return (
    <div 
      className={`win95-icon ${isSelected ? 'bg-blue-600 bg-opacity-50' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <Icon size={32} color="white" />
      <div className="win95-icon-label">{label}</div>
    </div>
  )
}

export default DesktopIcon

