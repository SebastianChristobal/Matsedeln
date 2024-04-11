import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './Matsedeln.module.scss';
import type { IMatsedelnProps } from './IMatsedelnProps';

import { spfi, SPFx  } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { ILunchMenu } from '../Models/ILunchMenu';



const Matsedeln: React.FC<IMatsedelnProps> = (props) =>{
  const sp = spfi().using(SPFx(props.context));
  const {isDarkTheme} = props;

  const [lunchMenu, setLunchMenu] = useState<ILunchMenu[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const lunchItems: ILunchMenu[] = await sp.web.lists.getByTitle('Matsedeln').items.select(
          'Id',
          'Title',
          'Veckodag',
          'Matratt',
          'Vecka'
        ).getAll();

        setLunchMenu(lunchItems);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData().catch((err) => {
      console.error(err);
    });
  }, []);



  return( <section className={`${styles.matsedeln}`} >
  <div className={styles.welcome} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Matsedeln</h2>
    <img alt="" src={isDarkTheme ? require('../assets/matsedeln.png') : require('../assets/matsedeln.png')} className={styles.welcomeImage} />
    {lunchMenu.length > 0 && <span>Vecka {lunchMenu[0].Vecka}</span>}
      <ul>
        {lunchMenu.map(menu => <li key={menu.Id}>
          <p>
            <h4>{menu.Veckodag}</h4>
            <span>{menu.Matratt}</span>
          </p>
        </li>)}
      </ul>
  </div>
  {/* <div>
    <h3>Welcome to SharePoint Framework!</h3>
    <p>
      The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
    </p>
    <h4>Learn more about SPFx development:</h4>
    <ul className={styles.links}>
      <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
      <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
      <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
      <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
      <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
      <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
      <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
    </ul>
  </div> */}
</section>);
}

export default Matsedeln;

// export default class Matsedeln extends React.Component<IMatsedelnProps, {}> {

//   const sp = spfi().using(SPFx(this.props.context));

//   public render(): React.ReactElement<IMatsedelnProps> {
  

//     const {
//       description,
//       isDarkTheme,
//       environmentMessage,
//     } = this.props;



    
//     return (
  
//     );
//   }
// }
