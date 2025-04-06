import React,{useContext,useState,useEffect} from 'react';
import { createContext } from 'react';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut } from 'firebase/auth'; 
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDocs,getDoc,doc, query, where} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { getStorage,ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "bookify1app.firebaseapp.com",
  projectId: "bookify1app",
  storageBucket: "bookify1app.appspot.com",
  messagingSenderId: "238316960077",
  appId: "1:238316960077:web:66b2b0f21960100dba9f04"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const googleProvider=new GoogleAuthProvider();
const firestore=getFirestore(app);
const storage=getStorage(app);
const firebaseContext=createContext(null);
export const usefirebase=()=>useContext(firebaseContext);


//function
export const FirebaseProvider=(props)=> {
  const[user,SetUser]=useState(null);
  const [order,setOrder]=useState(null);
  const navigate=useNavigate();
  useEffect(()=>{onAuthStateChanged(auth,(user)=>{if(user)SetUser(user); else SetUser(null)})},[])
const placeOrder=async(qty,bookId)=>{const collectionRef=collection(firestore,"Books",bookId,"orders");
  const result= await addDoc(collectionRef,{
    userID:user.uid,
    userEmail:user.email,
    userName:user.displayName,
    userPhoto:user.photoURL,
    qty:Number(qty),
  });
  return result;
}
// const fetchMyOrders=async()=>{
//   if (!user) return null;
//   const collectionRef=collection(firestore,"Books");
//   const q=query(collectionRef,where("userID","==",user.uid));
//   const result=await getDocs(q);
//   console.log(result);
//   return result;
// }
const SignUpUserWithEmailPass=(email,password)=>
  createUserWithEmailAndPassword(auth,email,password).then(()=>alert('signUp successfull')).catch((error)=>{alert(error.message)});
const SignInUser=(email,password)=>signInWithEmailAndPassword(auth,email,password).then(()=>{alert('Logged In');navigate("/")}).catch((error)=>{alert(error.message)});
const SignOutUser=()=>signOut(auth).then(()=>alert('Successfully Logged Out')).catch((error)=>{alert(error.message)});
const SignInWithGoogle=()=>signInWithPopup(auth,googleProvider).then(()=>{alert('Logged In');navigate("/")}).catch((error)=>{alert(error.message)});
const isLoggedIn= user?true:false;
const listAllBooks=()=>{return getDocs(collection(firestore,"Books"))}
const getImageUrl=(path)=>{return getDownloadURL(ref(storage,path))}
const getBookById=async(id)=>{const docRef=doc(firestore,"Books",id);const bookDetail=await getDoc(docRef);return bookDetail;}
const handleCreateNewListing=async(name,isbn,price,coverPic)=>{
  const imageRef=ref(storage,`uploads/images${Date.now()}-${coverPic.name}`);
  const uploadResult= await uploadBytes(imageRef,coverPic);
 return await addDoc(collection(firestore,"Books"),{
    name,
    isbn,
    price,
    imageURL:uploadResult.ref.fullPath,
    userID:user.uid,
    userEmail:user.email,
    userName:user.displayName,
    userPhoto:user.photoURL,

  }).then(()=>alert("succesfully created"));

  

};



  return (
    <firebaseContext.Provider value={{SignInWithGoogle,SignUpUserWithEmailPass,SignInUser,SignOutUser,isLoggedIn,handleCreateNewListing,listAllBooks,getImageUrl,getBookById,placeOrder,setOrder,order}}>
        {props.children}
    </firebaseContext.Provider>
      

  )
}


