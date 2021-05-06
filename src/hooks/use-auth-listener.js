import { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // we have in auth user so we can store it in local storage
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // user is not auth so we clear the local storage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener(); // to have a hook stop listening
  }, [firebase]);

  return { user };
}
