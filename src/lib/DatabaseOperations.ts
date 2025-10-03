import { collection, doc, setDoc, where, query, getDocs, CACHE_SIZE_UNLIMITED, getDoc, updateDoc, DocumentData } from "firebase/firestore"; 
import { app } from "@/lib/firebase";
import { initializeFirestore} from "firebase/firestore";



export const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
});


export const userExists = async (collectionName: string, userPhone: string, userName: string) => {
    const q = query(collection(db, collectionName), where("phone", "==", userPhone), where("name", "==", userName));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

export const getArticle = async (collectionName: string) => {
    const posts: DocumentData[] = [];
    

    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        posts.push(doc.data());
    });

    

    return posts;
}

export const getParent = async (collectionName: string, phone: string, name: string) => {
    const parents: DocumentData[] = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        parents.push(doc.data());
    });

    const parent = parents.find((parent: any) => parent.phone === phone);
    if(parent) {
        return parent?.children.find((child: any) => child.name === name);
    }

    else {
        return null;
    }
}

export const uploadArticle = async (collectionName: string, data: any, id: string) => {
    await setDoc(doc(db, collectionName, id), data);
};
