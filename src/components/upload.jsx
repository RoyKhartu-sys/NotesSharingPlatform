import { useState } from "react";
function Upload() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  async function uploadNote(e) {
    e.preventDefault();
    const response = await fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        subject,
        content
      })
    });
    if (response.ok) {
      alert("Note uploaded!");
      setTitle("");
      setSubject("");
      setContent("");
    } else {
      alert("Upload failed");
    }
  }
  return (
    <section id="upload">
      <h2>Upload Notes</h2>
      <form onSubmit={uploadNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <br /><br />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
        />
        <br /><br />
        <textarea rows="10" cols="50"placeholder="Write"value={content} onChange={(e)=>setContent(e.target.value)}/>
        <br /><br />
        <button type="submit">
          Upload
        </button>
      </form>
    </section>
  );
}
export default Upload;