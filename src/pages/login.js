import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

export default function Login() {
  const history = useHistory(); // rect hook: to navigate the user to a different page after login
  const { firebase } = useContext(FirebaseContext);

  // to use the user input for the login form (email & pssword) we will need to store this in State
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  // we also need to set State to provide error messages if user enter wrong info and to set validations
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  // handle what happens after Login

  // set up useEffects to give user feedback on specific actions taken in the tab title
  useEffect(() => {
    document.title = 'Login - Insta-clone';
  }, []);

  return <p>I am the login page!</p>;
}
