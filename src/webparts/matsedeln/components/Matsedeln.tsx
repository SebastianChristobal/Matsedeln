import * as React from 'react';
import styles from './Matsedeln.module.scss';
import type { IMatsedelnProps } from './IMatsedelnProps';
import { useFetch } from './hooks/useFetch';
import { fetchLunchMenu } from './http';

const Matsedeln: React.FC<IMatsedelnProps> = (props) =>{
  const {isDarkTheme, context} = props;
  const { fetchData: fetchMenu } = useFetch(fetchLunchMenu, context, [])
  const dateNow: Date = new Date();
  const week = Math.ceil(((dateNow.getTime() - new Date(dateNow.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7);
  

  return( <section className={`${styles.matsedeln}`} >
  <div className={styles.welcome} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Matsedeln</h2>
    <img alt="" src={isDarkTheme ? require('../assets/matsedeln.png') : require('../assets/matsedeln.png')} className={styles.welcomeImage} />
    {fetchMenu.length > 0 && <span>Vecka {week}</span>}
      <ul>
        {fetchMenu.map(menu => <li key={menu.Id}>
          <p>
            <h4>{menu.Veckodag}</h4>
            <span>{menu.Matratt}</span>
          </p>
        </li>)}
      </ul>
  </div>
  
</section>);
}

export default Matsedeln;

