import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface Props {
  closeModal: Function
  modalIsOpen: boolean
  heading: string
  onSubmit: Function
  valToUpdate: string
}

const PopUp = ({ closeModal, modalIsOpen, heading, onSubmit, valToUpdate }: Props) => {

  const [ name, setName ] = useState('');

  useEffect(() => {
    if(valToUpdate) {
      setName(valToUpdate);
    }
  }, [valToUpdate]);

  useEffect(() => {
    if(heading.includes('Add')) {
      setName('');
    }
  }, [heading, closeModal]);

  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      minWidth: 400
    },
    // overlay: {
    //   backgroundColor: "#000"
    // }
  };

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const {value} = e.target;
    setName(value)
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
    valToUpdate = ''
    closeModal()
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => closeModal()}
        // style={customStyles}
        contentLabel="Modal"
      >
        <p className="modalHeading">{heading}</p>
        <form onSubmit={handleSubmit}>
          <input className="input" type="text" value={name} onChange={handleInputChange} />
          <button className="button is-link" disabled={!name} >Submit</button>
        </form>
      </Modal>
    </div>
  );
}
 
export default PopUp;