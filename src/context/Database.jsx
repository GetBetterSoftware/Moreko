
import React, { createContext, useContext} from 'react';

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

const DatabaseProvider = ({children }) => {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/get-articles');
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    },[])

    const value = {
        posts,
        
    };

    return (
            <DatabaseContext.Provider value={value}>
                {children}
            </DatabaseContext.Provider>
    );
}

export default DatabaseProvider;
