
import { useState, useEffect } from 'react';

import { ILunchMenu } from '../../Models/ILunchMenu';

export const useFetch = (fetchLunchMenuFn: any, context: any, initialValue: []): { fetchData: ILunchMenu[] } => {
  
    const [fetchData, setfetchData] = useState<ILunchMenu[]>(initialValue);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                
                const menu = await fetchLunchMenuFn({ context });
                setfetchData(menu);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData().catch((err) => {
            console.error(err);
        });
    }, [fetchLunchMenuFn]);

    return {
        fetchData
    };
};


