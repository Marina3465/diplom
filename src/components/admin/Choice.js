import './Choice.css';
import React from 'react'


function Choice() {
  return (
    <div className='cont-carts'>
        <div className='views-info'>
          <img className='choice-img' src={require('../../img/file.png')}/>
          <div className='choice-text'>
            <p>Просмотр и редактирование информации</p>
          </div>
          <img className='choice-arrow' src={require('../../img/arrow.png')}/>
        </div>
        <div className='createQR'><img className='choice-img' src={require('../../img/qr.png')}/>
          <div className='choice-text'>
            <p>Создать QR-код</p>
          </div>
          <img className='choice-arrow' src={require('../../img/arrow.png')}/>
        </div>
    </div>
  )
}

export default Choice