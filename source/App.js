import React from 'react';
import LandingPage from './pages/LandingPage';
import ExploreThreads from './pages/ExploreThreads';
import ThreadDetails from './pages/ThreadDetails';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from './redux-store';
import { useEffect } from 'react';


const App = () => {
  const address = useSelector(state => state.address);
  const activeTopic = useSelector(state => state.activeTopic);
  const dispatch = useDispatch();
  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts && accounts[0]) {
      dispatch({ type: Actions.WALLET_CONNECTED, payload: accounts[0] });
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

 

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (accounts && accounts[0]) {
        dispatch({ type: Actions.WALLET_CONNECTED, payload: accounts[0] });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!address) {
    return <LandingPage onConnectRequest={connectWallet} />
  } else if (activeTopic < 0) {
    return <ExploreThreads />
  } else {
    return <ThreadDetails />
  }
}

export default App;
