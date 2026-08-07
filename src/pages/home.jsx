import { useState } from "react";
function Home() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState("");
    function searchNotes() {
        const found = subjects.find(
            subject => subject.toLowerCase() === search.toLowerCase()
        );
        if(found){
            setResult(found +"found");
        }
        else{
            setResult("not found");
        }
    }
    const subjects = [
        "HTML",
        "CSS",
        "JavaScript"
    ];
  return (

    <>
      <section className="hero">
        <h1>NotesSharing</h1>

        <div className="para">
          Share and access notes easily.
          <br />
          <br />
          <br />
          <p>You may search using the subject name.</p>
        </div>

        <div className="inp">
          <input
          type="text"
          placeholder="Search subject"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
         />
          <button onClick={searchNotes}>Search</button>

          <p>{result}</p>
        </div>
      </section>

      <section>
        <h2>Available Subjects:</h2>

        <div className="notesgrid">
          {subjects.map((subject)=>(<div className="notecard" key={subject}>
            <h3>{subject}</h3>
            </div>
          ))}
          </div>
      </section>
    </>
  );
}

export default Home;