import {Button, Input} from 'antd'
import { useState } from 'react';

const { TextArea } = Input;

export default function CreateNoteForm({onCreate}) {
    const [note, setNote] = useState(null)

    const onSubmit = (e) => {
      e.preventDefault();
      setNote(null);
      onCreate(note);
    };

    return (
        <form className="w-full flex flex-col gap-3" onSubmit={onSubmit}>
          <h3 className='font-bold text-xl'>Create note</h3>
          <Input 
            placeholder="Title" 
            size="large" 
            value={note?.title ?? ""}
            onChange={(e) => setNote({...note, title: e.target.value})}
          />
          <TextArea 
            rows={3} 
            placeholder="Description" 
            value={note?.description ?? ""}
            onChange={(e) => setNote({...note, description: e.target.value})}
          />
          <Button 
            color="cyan" 
            variant="solid"
            htmlType="submit"
          >
            Create
          </Button>
        </form>
    )
  }