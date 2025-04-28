import { useEffect, useState } from 'react';
import './App.css'
import CreateNoteForm from './components/CreateNoteForm';
import Filters from './components/Filters';
import Note from './components/Note';
import { createNote, fetchNotes } from './services/note';


function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    const fetchData = async () => {
      let notes = await fetchNotes(filter);
      setNotes(notes)
    }

    fetchData()
  }, [filter])

  const onCreate = async (note) => {
      await createNote(note)
      let notes = await fetchNotes(filter);
      setNotes(notes)
  }

  const removeNote = async (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      <section className='p-8 flex flex-row justify-start items-start gap-12'>
        <div className="flex flex-col w-1/3 gap-10">
          <CreateNoteForm onCreate={onCreate}/>
          <Filters filter={filter} setFilter={setFilter}/>
        </div>

          <ul className="flex flex-col gap-5 w-1/2">
            {notes.map((n) => (
              <li key={n.id}>
                <Note 
                  id={n.id}
                  title={n.title} 
                  description={n.description} 
                  createdAt={n.createdAt} 
                  onDelete={removeNote}
                />
              </li>
            ))}
          </ul>
      </section>
    </>
  )
}



export default App
