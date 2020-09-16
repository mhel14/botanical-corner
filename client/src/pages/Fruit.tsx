import React, { useEffect, useState } from 'react';
import { getFruit } from '../api/requests';
import { loggedIn } from '../auth';

const Fruit = (props: { match: { params: { fruitId: string; }; }; history: string[]; }) => {
  const [ fruit, setFruit ] = useState<null | {name: string}>(null);
  const [ isLoggedIn ] = useState(loggedIn());

  useEffect(() => {
    if(isLoggedIn) {
      const { fruitId } = props.match.params;
      const fetchFruit = async () => {
        const fruitData = await getFruit(fruitId);
        setFruit(fruitData)
      }
      fetchFruit();
    } else {
      props.history.push('/');
    }
  }, [])

  return (
    <div>
      <h1 className="title">{fruit && fruit.name}</h1>
      <div className="box">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,</div>
    </div>
  );
}
 
export default Fruit;