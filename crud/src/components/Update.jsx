import axios from 'axios';
import React, { useState,useEffect } from 'react'
import {  useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [formData,setFormdata] = useState({
    fname: "",
    lname: "",
    mnumber: "",
    email: "",
    project: "",
  })

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/singleNote/${id}`)
      .then((res) => {
        setFormdata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const navigate = useNavigate()

  const updatNotes = (e) => {
    e.preventDefault();

    if (!formData.fname || !formData.lname || !formData.email || !formData.mnumber || !formData.project) {
      alert("Please kindly fill all fields")
 } else {
      axios
        .put(`http://127.0.0.1:5000/api/update/${id}`, formData)
        .then((res) => {
          // getUserproperty()
          alert("Note UpDate Successfully");
          setFormdata({});
          navigate("/")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inputHandle=(e)=>{
    const name = e.target.name
    const value = e.target.value
    setFormdata((pre)=>{
      return {...pre , [name]: value}
    })
 }

  return (
    <div>
       
       <form  onSubmit={updatNotes}>
            <p className="label">Name</p>
            <input onChange={inputHandle} value={formData.fname} name="fname" type="text" />
            <p className="label">LastName</p>
            <input onChange={inputHandle} value={formData.lname} name="lname" type="text" />
            <p className="label">Email</p>
            <input onChange={inputHandle} value={formData.email} name="email" type="email" />
            <p className="label">Mobile No.</p>
            <input onChange={inputHandle} value={formData.mnumber} name="mnumber" type="number" />
            <p className="label">Project</p>
            <input onChange={inputHandle} value={formData.project} name="project" type="text" />
            <button className="btn" type="submit" >Update Client</button>
          </form>
    
    </div>
  )
}

export default Update