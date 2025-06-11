import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCryUFFtgflezks3kqpHHSbP6SilZCfQZ0",
    authDomain: "netflix-clone-58577.firebaseapp.com",
    projectId: "netflix-clone-58577",
    storageBucket: "netflix-clone-58577.firebasestorage.app",
    messagingSenderId: "657349889422",
    appId: "1:657349889422:web:b680f79dd977c1c12428df",
    measurementId: "G-HLPZXE6FP7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {

    try {

        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user

        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })

    } catch (error) {

        console.log(error);
        toast.error(error)
        }
    }

const login = async (email, password) => {
    try {

       await signInWithEmailAndPassword(auth, email, password)


    } catch (error) {
        console.log(error);
        toast.error(error.code)
    }

}

const logout = () => {


    signOut(auth)


}

export { auth, db, login, signup, logout }
// const analytics = getAnalytics(app);