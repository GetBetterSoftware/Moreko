import { collection, doc, setDoc, where, query, getDocs, CACHE_SIZE_UNLIMITED, getDoc, updateDoc } from "firebase/firestore"; 
import { app } from "@/lib/firebase";
import { initializeFirestore} from "firebase/firestore";



export const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
});


export const addData = async (collectionName: string, data: any, id: string) => {
    await setDoc(doc(db, collectionName, id), data);
};

export const userExists = async (collectionName: string, userEmail: string) => {
    const q = query(collection(db, collectionName), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

export const getUser = async (collectionName: string, userEmail: string) => {
    const q = query(collection(db, collectionName), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
}