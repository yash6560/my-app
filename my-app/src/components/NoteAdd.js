import React, { useEffect, useState } from "react";

const NoteAdd = ({ setIsOpen,addNote, editnotedata,editNote }) => {
 
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const id = editnotedata._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editnotedata){
      editNote(editnotedata._id,title,desc)
    }
    else{
    addNote(title,desc);
  }};

  useEffect(() => {
    if (editnotedata) {
      setTitle(editnotedata.title);
      setDesc(editnotedata.desc);
    }
  }, [editnotedata]);

  return (
    <div className="h-screen w-full p-4 justify-center items-center flex">
      <div className="bg-white rounded-2xl p-5 sm:w-[400px] w-full">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold md:text-3xl text-xl">
            {editnotedata ? "Edit Note" : "Add Note"}
          </h1>
          <div className="pt-5">
            <h5 className="text-l md:text-xl">Title</h5>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className=" outline-none border-[1.5px] rounded w-full px-4 py-2"
            />
          </div>
          <div className="pt-5">
            <h5 className="text-l md:text-xl">Desc</h5>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              className=" outline-none border-[1.5px] rounded w-full px-4 py-2"
            />
          </div>
          <div className="pt-5">
            <button
              type="submit"
              placeholder="Description"
              className="bg-green-500 rounded w-full px-4 py-2 text-white font-semibold hover:bg-green-700"
            >
              Add Note
            </button>
          </div>
        </form>
        <div className="pt-5 pb-2">
          <button
            onClick={() => setIsOpen(false)}
            placeholder="Description"
            className="bg-red-500 rounded w-full px-4 py-2 text-white font-semibold hover:bg-red-700"
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteAdd;
