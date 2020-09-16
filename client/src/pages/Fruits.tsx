import React, { useEffect, useState } from 'react';
import ListData from '../components/ListData';
import { getFruits, addFruit, updateFruit, deleteFruit } from '../api/requests';
import PopUp from '../components/PopUp';
import { loggedIn, isAdmin } from '../auth';

const Fruits = (props: { history: string[]; }) => {
  const [ isLoggedIn ] = useState(loggedIn());
  const [ fruits, setFruits ] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [modalHeading,setModalHeading] = useState('');
  const [ activeModal, setActiveModal ] = useState('add');
  const [ activeData, setActiveData ] = useState({id: '', name: ''});

  const openModal = (heading: string) => {
    setIsOpen(true);
    setModalHeading(heading)
  }

  const closeModal = () => {
    setIsOpen(false);
    setActiveData({id: '', name: ''});
  }

  const handleNewFruitSubmit = async (val: string) => {
    await addFruit(val);
    loadFruits();
    // setFruits(...fruits, newFruit);
  }

  const handleUpdate = async (name: string) => {
    openModal('Update Fruit');
    await updateFruit(activeData.id, name);
    loadFruits();
  }

  const handleDelete = async (id: string, name: string) => {
    const proceed = window.confirm(`Delete ${name}?`);
    if(proceed) {
      await deleteFruit(id);
      loadFruits();
    }
  }

  const getActiveData = (id: string, name: string) => {
    openModal('Update Fruit')
    setActiveData({ id, name })
  }

  const loadFruits = () => {
    const fetchFruits = async () => {
      const fruitsData = await getFruits();
      setFruits(fruitsData)
    }
    fetchFruits();
  }

  const handleSubmit = () => {
    if(activeModal === 'add') {
      return handleNewFruitSubmit
    } else if(activeModal === 'update') {
      return handleUpdate
    }
  }

  useEffect(() => {
    if(isLoggedIn) {
      loadFruits()
    } else {
      props.history.push('/');
    }
  }, [isLoggedIn]);
  return (
    <div className="fruits-wrapper">
      <h1 className="title">Fruits</h1>
      <ListData data={fruits} path="fruit" isAdmin={isAdmin()} getActiveData={getActiveData} setActiveModal={setActiveModal} handleDelete={handleDelete} />
      <div className="field">
        <div className="control">
          <button className="button is-link" onClick={() => {
            openModal('Add New Fruit');
            setActiveModal('add');
          }}>Add Fruit</button>
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
 
export default Fruits;