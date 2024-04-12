import { spfi, SPFx  } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { ILunchMenu } from '../Models/ILunchMenu';
import { IMatsedelnProps } from "./IMatsedelnProps";

export const fetchLunchMenu = async (props: IMatsedelnProps): Promise<ILunchMenu[]> => {

    if (!props || !props.context) {
        throw new Error("Props or props.context is undefined.");
    }

    const sp = spfi().using(SPFx(props.context));
    
    const lunchItems: ILunchMenu[] = await sp.web.lists.getByTitle('Matsedeln').items.select(
        'Id',
        'Title',
        'Veckodag',
        'Matratt'
    ).getAll();

   return lunchItems; 
  }


