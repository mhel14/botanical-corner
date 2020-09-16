import React, { useEffect, useState } from 'react';
import { getVegetable } from '../api/requests';
import { loggedIn } from '../auth';

const Vegetable = (props) => {
  const [ vegetable, setVegetable ] = useState<null | {name: string}>(null);
  const [ isLoggedIn ] = useState(loggedIn());

  useEffect(() => {
    if(isLoggedIn) {
      const { vegetableId } = props.match.params;
      const fetchVegetable = async () => {
        const vegetableData = await getVegetable(vegetableId);
        setVegetable(vegetableData)
      }
      fetchVegetable();
    } else {
      props.history.push('/');
    }
  }, [isLoggedIn])

  return (
    <div>
      <h1 className="title">{vegetable && vegetable.name}</h1>
      <div className="box">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,</div>
    </div>
  );
}
 
export default Vegetable;