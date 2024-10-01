import React,{useState, useEffect} from 'react';
import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBWBmku48IuWwd-F7fEcatSb5RW3bpHsNg",
  authDomain: "shopping-list-c2de4.firebaseapp.com",
  databaseURL: "https://shopping-list-c2de4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shopping-list-c2de4",
  storageBucket: "shopping-list-c2de4.appspot.com",
  messagingSenderId: "788651445963",
  appId: "1:788651445963:web:ed8a67cb0b2b4d0d0d554e",
  measurementId: "G-EWTEHXQ236"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {

  const [loading, setLoading] = useState()
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
    const dataCollection = collection(db, 'Items');
    const dataSnapshot = await getDocs(dataCollection, 'Items');
    const items = dataSnapshot.docs.map(doc => {
      return {
        name: doc.data().name,
        count: doc.data().count,
        id: doc.id
      };
    });
    setItem(items);
    setLoading(false);
  }
  fetchData();
  },[]);

  console.log(item);
  


  const addItem = async () => {

    let newItem = { name: item, count: count, id: ''};

    let doc = await addDoc(collection(db, 'items'), newItem);

    newItem.id = doc.id;

    setItem([...item, newItem]);
    setText("");
    setCount(1);
  }

  const removeItem = async (itemId) => {
    deleteDoc(doc(db, "items", item.id));

    let filteredArray = item.filter(collectionItem => collectionItem.id !==item.id);
    setItem(filteredArray);
  }

  if (loading) return (<p>Loading....</p>)

  const list = item.map((item, index) => {
    return(<p key={index}>{item.name} {item.count}</p>)
  })
  return (
  <div className="App bg-teal-900 min-h-screen p-6">
      {list}
      <div className="mt-6">
        {/* Search Input and Count Input */}
        <div className="flex items-center space-x-2">
          <label className="relative block flex-grow">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input 
              className="placeholder:italic placeholder:text-teal-100 block bg-teal-600 w-full border border-teal-200 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
              placeholder="Enter Items......" 
              type="text" 
              name="search"
              value={item}
            />
          </label>

          {/* Small Count Input */}
          <label className="relative block">
            <span className="sr-only">Enter Count</span>
            <input 
              className="block bg-teal-600 text-white w-16 border border-teal-200 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
              placeholder="1" 
              type="number" 
              name="count" 
              min="1" 
            />
          </label>
        </div>
        {/* Button */}
        <button onClick={addItem} className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400">
          Add
        </button>

      </div>
      <div className="App bg-teal-900 min-h-screen p-4 flex items-center justify-center">
      {/* Text Box */}
      <div className="bg-teal-400 border border-teal-200 rounded-lg p-2 shadow-md max-w-sm">
        <div className='flex items-center'>
          <p className="text-gray-700 font-normal">454</p>
          <button onClick={removeItem} className='ml-5 mr-1 text-red-600 font-medium'>X</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
