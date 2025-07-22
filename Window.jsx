import { useState, useRef } from 'react'

const Window = ({ title, isOpen, onClose, children, position, onPositionChange }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)

  if (!isOpen) return null

  const handleMouseDown = (e) => {
    if (e.target.closest('.win95-titlebar') && !e.target.closest('button')) {
      setIsDragging(true)
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && onPositionChange) {
      onPositionChange({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <>
      {isDragging && (
        <div
          className="fixed inset-0 z-50"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      )}
      <div 
        ref={windowRef}
        className="win95-window fixed z-10 select-none"
        style={{ 
          left: position.x, 
          top: position.y,
          width: '400px',
          minHeight: '300px',
          cursor: isDragging ? 'grabbing' : 'default'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="win95-titlebar cursor-grab">
          <span>{title}</span>
          <button 
            className="win95-button text-xs px-2 py-0 cursor-pointer"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="win95-content">
          {children}
        </div>
      </div>
    </>
  )
}

export default Window

