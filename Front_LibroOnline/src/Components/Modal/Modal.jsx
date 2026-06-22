import { useEffect } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import PropTypes from 'prop-types'
import './Modal.scss'

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      // Bloquea el scroll del fondo mientras el modal está abierto
      document.body.style.overflow = 'hidden'
    }
    // Cleanup: se ejecuta cuando isOpen cambia a false o el componente se desmonta
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    // Clic en el overlay (fondo oscuro) → cierra el modal
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation evita que el clic dentro del modal cierre el overlay */}
      <div className={`modal modal--${size}`} onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3>{title}</h3>
          <button onClick={onClose}><RiCloseLine /></button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
}