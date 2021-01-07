import Search from './components/Search';
import Navbar from './components/Navbar';
import './index.css';
import Keyboard from './components/Keyboard';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import Modal from './components/Modal';
import CallScreen from './components/CallScreen';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Search />
        <ContactList />
        <Keyboard />
        <Navbar />
        <AddContact />
        <Modal />
        <CallScreen />
      </div>
    </div>
  );
}

export default App;
