import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Crud = () => {
  const [data, setData] = useState([]);
  const [formData, setFormdata] = useState({
    fname: "",
    lname: "",
    mnumber: "",
    email: "",
    project: "",
  });

 const inputHandle=(e)=>{
    const name = e.target.name
    const value = e.target.value
    setFormdata((pre)=>{
      return {...pre , [name]: value}
    })
 }

 const senddata= async(e)=>{
    e.preventDefault(); 
    try {
        if (!formData.fname || !formData.lname || !formData.email || !formData.mnumber || !formData.project) {
             alert("Please kindly fill all fields")
        }

    await axios.post("http://127.0.0.1:5000/api/create",formData)

    alert("Data Submitted")
    setFormdata("")
     getNotes()
        
    } catch (error) {
        console.log(error);
    }

 }

 const delteNotes = async (path) => {
    try {
      const deleteConfirmed = window.confirm(
        "Are you sure you want to Delete note?"
      );
      if (deleteConfirmed) {
        await axios.delete(`http://127.0.0.1:5000/api/note/${path}`);
        getNotes(); // Refresh notes after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };





  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    await axios
      .get("http://127.0.0.1:5000/api/notes")
      .then((res) => {
        //   console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="top_headline">
        <h3>Clients</h3>
        <h3>Create-Client</h3>
      </div>
      <div className="container">
        <div className="table">
          <table>
            <tr style={{ backgroundColor: "rgb(221, 214, 214)" }}>
              <th>Name</th>
              <th>Last-Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Project</th>
            </tr>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.mnumber}</td>
                  <td>{item.project}</td>
                  <td>
                  <Link to={`/update/` + item._id}>
                  <button className=" dbtn" >
                    Edit
                  </button>
                 </Link> | <button className="dbtn" onClick={() => delteNotes(item._id)} >Delete</button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="form">
          <form onSubmit={senddata}>
            <p className="label">Name</p>
            <input onChange={inputHandle} value={formData.fname} placeholder="Enter your First name .." name="fname" type="text" />
            <p className="label">LastName</p>
            <input onChange={inputHandle} value={formData.lname} placeholder="Enter your Last name .." name="lname" type="text" />
            <p className="label">Email</p>
            <input onChange={inputHandle} value={formData.email} placeholder="Enter your Email  .." name="email" type="email" />
            <p className="label">Mobile No.</p>
            <input onChange={inputHandle} value={formData.mnumber} placeholder="Enter your Mobile no .." name="mnumber" type="number" />
            <p className="label">Project</p>
            <input onChange={inputHandle} value={formData.project} placeholder="Enter your Project name .." name="project" type="text" />
            <button className="btn" type="submit" >Create Client</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Crud;
