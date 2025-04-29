import React,{useContext,useState,useEffect} from 'react';
import { createContext } from 'react';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut, updateProfile } from 'firebase/auth'; 
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDocs,getDoc,doc, query, where, updateDoc, deleteDoc} from 'firebase/firestore';
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
  const[user,setUser]=useState(null);
  const [order,setOrder]=useState(null);
  const navigate=useNavigate();

  useEffect(()=>{onAuthStateChanged(auth,(user)=>{if(user)setUser(user); else setUser(null)})},[])

    const cancelOrder = async (orderId) => {
      try {
        const orderRef = doc(firestore, "Users", user.uid, "Orders", orderId);
        await updateDoc(orderRef, {
          status: "cancelled"
        });
        alert("Order cancelled successfully");
      } catch (error) {
        console.error("Error cancelling order:", error);
        alert("Failed to cancel order");
      }
    };

    

const placeOrder=async(qty,bookId)=>{const collectionRef=collection(firestore, "Users", user.uid, "Orders");;
  const result= await addDoc(collectionRef,{
    orderDate: Date.now(), 
    bookId:bookId,
    qty:Number(qty)
  });
  return result;
}
const handleCart=async(bookId)=>{const collectionRef=collection(firestore, "Users", user.uid, "Cart");
  const result= await addDoc(collectionRef,{
    bookId:bookId,
  });
  return result;
}

const removeCartItem = async (cartItemId) => {
  const itemRef = doc(firestore, "Users", user.uid, "Cart", cartItemId);
  await deleteDoc(itemRef);
};
// const fetchMyOrders=async()=>{
//   if (!user) return null;
//   const collectionRef=collection(firestore,"Books");
//   const q=query(collectionRef,where("userID","==",user.uid));
//   const result=await getDocs(q);
//   console.log(result);
//   return result;
// }
const SignUpUserWithEmailPass=async(email,password,name)=>{
try{
   const userCredential= await createUserWithEmailAndPassword(auth,email,password);
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: name
  });
  alert('Signed Up');
  navigate("/")
}
  catch(error){
    console.log(error)
  }
  
}
const SignInUser=(email,password)=>signInWithEmailAndPassword(auth,email,password).then(()=>{alert('Logged In');navigate("/")}).catch((error)=>{alert(error.message)});
const SignOutUser=()=>signOut(auth).then(()=>alert('Successfully Logged Out')).catch((error)=>{alert(error.message)});
const SignInWithGoogle=()=>signInWithPopup(auth,googleProvider).then(()=>{alert('Logged In');navigate("/")}).catch((error)=>{alert(error.message)});
const isLoggedIn= user?true:false;
const listAllBooks=()=>{return getDocs(collection(firestore,"Books"))}
const listAllOrders=()=>{return getDocs(collection(firestore, "Users", user.uid, "Orders"))}
const listAllCartItems=()=>{return getDocs(collection(firestore, "Users",user.uid, "Cart"))}
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

  }).then(()=>{alert("succesfully created");navigate('/')});

  

};



  return (
    <firebaseContext.Provider value={{SignInWithGoogle,SignUpUserWithEmailPass,SignInUser,SignOutUser,isLoggedIn,handleCreateNewListing,listAllBooks,listAllOrders,getImageUrl,getBookById,placeOrder,setOrder,order,setUser,user,cancelOrder,handleCart,listAllCartItems,removeCartItem}}>
        {props.children}
    </firebaseContext.Provider>
      

  )
}


