import React from 'react'
import Form from './Form'

export default function TransactionModal({onHide}) {
  return (
    <div className="modal">
      <div className="modal_content">
        <div onClick={onHide} className="close_modal">
          &times;
        </div>
        <div className="">
          <Form />
        </div>
      </div>
    </div>
  )
}
