import React from 'react'
import './Modal.css'

function Modal({ active, setActive, children }) {
    return (
        <div className={`modal ${active ? "active" : ""}`}>
            <div className='modal-content'>
                {children}
                <button>Сохранить</button>
                <button onClick={() => setActive(false)}>Отмена</button>
            </div>
        </div>
    )
}

export default Modal