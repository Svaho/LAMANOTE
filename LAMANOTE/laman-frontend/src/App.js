import './App.css';
import AddNote from './components/AddNote';
import ViewNotes from './components/ViewNotes';

function App() {
  return (
    <div className='main-container mt-4 px-5'>
      <h3>Note App</h3>
      <div className='row'>
        <AddNote />
      </div>
      <div className='row mt-4'>
        <ViewNotes />
      </div>
    </div>
  );
}

export default App;
