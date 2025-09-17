
import React, { createContext, useContext} from 'react';

const DatabaseContext = createContext({});

export const useDatabase = () => useContext(DatabaseContext);

const DatabaseProvider = ({children } : any ) => {


    const value = {};

    return (
            <DatabaseContext.Provider value={value}>
                {children}
            </DatabaseContext.Provider>
    );
}

export default DatabaseProvider;
