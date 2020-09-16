import React, { useEffect, useState } from 'react';
import ListData from '../components/ListData';
import { getVegetables, addVegetable, updateVegetable, deleteVegetable } from '../api/requests';
import PopUp from '../components/PopUp';
import { loggedIn, isAdmin } from '../auth';

const Vegetables = (props) => {
  const [ isLoggedIn ] = useState(loggedIn());
  const [ vegetables, setVegetables ] = useState([]);
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ modalHeading, setModalHeading ] = useState('');
  const [ activeModal, setActiveModal ] = useState('add');
  const [ activeData, setActiveData ] = useState({id: '', name: ''});

  const openModal = (heading) => {
    setIsOpen(true);
    setModalHeading(heading)
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleNewVegetableSubmit = async (val) => {
    await addVegetable(val);
    loadVegetables();
    // setVegetables(...vegetables, newVegetable);
  }

  const handleUpdate = async (name) => {
    openModal('Update Vegetable');
    await updateVegetable(activeData.id, name);
    loadVegetables();
  }

  const handleDelete = async (id, name) => {
    const proceed = window.confirm(`Delete ${name}?`);
    if(proceed) {
      await deleteVegetable(id);
      loadVegetables();
    }
  }

  const getActiveData = (id: string, name: string) => {
    openModal('Update Vegetable')
    setActiveData({ id, name })
  }

  const loadVegetables = () => {
    const fetchVegetables = async () => {
      const vegetablesData = await getVegetables();
      setVegetables(vegetablesData)
    }
    fetchVegetables();
  }

  const handleSubmit = () => {
    if(activeModal === 'add') {
      return handleNewVegetableSubmit
    } else if(activeModal === 'update') {
      return handleUpdate
    }
  }

  useEffect(() => {
    if(isLoggedIn) {
      loadVegetables()
    } else {
      props.history.push('/');
    }
  }, []);

  return (
    <div className="vegetables-wrapper">
      <h1 className="title">Vegetables</h1>
      <ListData data={vegetables} isAdmin={isAdmin()} path="vegetable" getActiveData={getActiveData} setActiveModal={setActiveModal} handleDelete={handleDelete} />
      <div className="field">
        <div className="control">
          <button className="button is-link" onClick={() => {
            openModal('Add New Vegetable');
            setActiveModal('add');
          }}>Add Vegetable</button>
        </div>
      </div>
      <PopUp
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        heading={modalHeading}
        onSubmit={handleSubmit()}
        valToUpdate={activeData.name}
      />
    </div>
  );
}
 
export default Vegetables;