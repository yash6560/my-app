import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const NoteCard = ({note, onEdit, deleteNote}) => {
  
  return (
    <div className='bg-white rounded-xl p-4 overflow-x-hidden'>
      <div>
        <h2 className='text-2xl font-bold'>Title</h2>
        <p>
          {note.title}
        </p>
        <h2 className='text-2xl font-bold'> description</h2>
        <p>{note.desc}</p>
        <div className='flex items-center justify-end gap-4'>
          <button onClick={() => onEdit(note)} className='text-green-800'><FaRegEdit size={20}/></button>
          <button onClick={() => deleteNote(note._id)} className='text-red-800'><MdOutlineDelete size={20} /></button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard