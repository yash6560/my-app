import React, { useEffect, useState } from "react";
import NoteAdd from "../components/NoteAdd";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { token } = useAuth();
    const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editnotedata, setEditnotedata] = useState(null);

  const handleNotes = () => {
    // setEditnotedata(null)
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const GetData = async (e) => {
      try {
        const {data} = await axios.get("http://localhost:8080/api/notes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        return setNotes(data.getdata);
      } catch (error) {
        console.log(error.message);
      }
    };
    GetData();
  }, []);


  const addNote = async (title, desc) => {
     if (title === "" || desc === "") {
          console.log("Please add all field");
        }
    
        try {
          const sendData = await axios.post(
            "http://localhost:8080/api/notes",
            { title, desc },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsOpen(false);
          navigate("/");
          window.location.reload();
        } catch (error) {
          console.log(error.message);
        }
  }

  const editNote = async (id, title, desc) => {
    console.log(id);
    console.log(title)
    console.log(desc)
    if (title === "" || desc === "") {
         console.log("Please add all field");
       }
       try {
        const { data } = await axios.put(
             `http://localhost:8080/api/notes/${id}`,
             { id, title, desc },
             {
               headers: { Authorization: `Bearer ${token}` },
             }
           );
           setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note._id === id ? { ...note, title, desc } : note
            )
          );
         setIsOpen(false);
        //  navigate("/");
         window.location.reload();
       } catch (error) {
         console.log(error.message);
       }
 }

 const deleteNote = async (id) => {
  
     try {
      const { data } = await axios.delete(
           `http://localhost:8080/api/notes/${id}`,
           { id },
           {
             headers: { Authorization: `Bearer ${token}` },
           }
         );
         
      //  setIsOpen(false);
      //  navigate("/");
       window.location.reload();
     } catch (error) {
       console.log(error.message);
     }
}

  const onEdit = (note) => {
    setEditnotedata(note);
    setIsOpen(true);
  };

  return (
    <>
      <div>
        {!isOpen && (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              {notes.map((elem, index) => {
                return <NoteCard key={index} note={elem} onEdit={onEdit} deleteNote={deleteNote}/>;
              })}
            </div>
          </>
        )}
        {isOpen && (
          <NoteAdd setIsOpen={setIsOpen} editnotedata={editnotedata} addNote={addNote} editNote={editNote}  />
        )}

        <button
          onClick={handleNotes}
          className="bg-blue-400 fixed bottom-4 right-4 text-2xl font-bold text-white px-6 py-3 rounded-full"
        >
          +
        </button>
      </div>
    </>
  );
};

export default Home;
