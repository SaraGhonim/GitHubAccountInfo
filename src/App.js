import React, {useEffect, useState, useRef} from 'react';
import { useForm } from "react-hook-form";
import './App.css';
const axios = require('axios');

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user,setUser]=useState("")
  const [error,setError]=useState(null)

  const onSubmit = (data) => {
    console.log(data);
    setError(false)
    axios.get(`https://api.github.com/users/${data.exampleRequired}`)
    .then(function (response) {  
      setUser(response.data)
    })
    .catch(function (error) {
      console.log(error,"error");
      setError(true)
    })

    
  }

  return (
    <div className="App">
    {error&&<p className="Error">Enter a valid user name</p>}
    <div className="form">
     <form onSubmit={handleSubmit(onSubmit)}>
     <label htmlFor="username">User Name</label>
   
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span className="Error">This field is required</span>} 
      <input type="submit" />
    </form>  
    </div>

<div className="container">

<div className="leftSide"> 

  <div className="profilePic">
    <img src= {user.avatar_url} className="user-avatar" alt="avatar" /> 
  </div>

  <div className="name"> {user.login} </div>

  <div className="options">

  <div> Mute notification </div>
  <div> Add to contacts </div>

  </div>

</div> 

  
<div className="rightSide">
  <div>
    <p className="name"> {user.login}'s Info : </p>

    <p className="basic"> id : {user.id}  </p>

    <p className="basic" > name : {user.name} </p>

    <p className="basic"> company : {user.company} </p>

    <p className="basic"> location : {user.location} </p>

    <p className="basic"> email : {user.email} </p>

    <p className="name"> Number of Repos {user.public_repos}  </p>
    
    <p className="name"> Number of Followers {user.followers} </p> 

    <p className="name"> List of Forked Repos </p> 

 
    </div>
  </div>
</div>


</div>
  );
}

export default App;
