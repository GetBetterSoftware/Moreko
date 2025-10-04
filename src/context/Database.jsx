
import React, { createContext, useContext} from 'react';

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

const DatabaseProvider = ({children }) => {
    const [posts, setPosts] = React.useState([]);
    const [article, setArticle] = React.useState([]);
    const [galleryItems, setImage] = React.useState([]);

    React.useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/get-articles');
            const data = await response.json();
            setPosts(data);
        }
        async function fetchArticle() {
            const response = await fetch('/api/get-published-articles');
            const data = await response.json();
            setArticle(data);
        }

        async function fetchGallery() {
            const response = await fetch('/api/get-images');
            const data = await response.json();
            setImage(data);
        }
        fetchGallery();
        fetchArticle();
        fetchPosts();
    },[])

    const value = {
        posts,
        article,
        galleryItems
    };

    return (
            <DatabaseContext.Provider value={value}>
                {children}
            </DatabaseContext.Provider>
    );
}

export default DatabaseProvider;
