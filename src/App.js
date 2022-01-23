import React, {useEffect, useState, useRef} from 'react';
import { useForm } from "react-hook-form";
import './App.css';
const axios = require('axios');

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user,setUser]=useState("")
  const [repos,setRepos]=useState([])
  const [forked,setForked]=useState([])
  const [error,setError]=useState(null)
  const countForks=function(reposatories){
  
    let forked=[]
    reposatories.forEach(repo=>{
    if(repo.fork==true) forked.push(repo.name) })

   return forked   
  }
  const onSubmit = (data) => {

    const reposAPI=`https://api.github.com/users/${data.userName}/repos`
    const userAPI=`https://api.github.com/users/${data.userName}`
  
    const getRepos=axios.get(reposAPI)
    const getUser=axios.get(userAPI)
    console.log(data);
    setError(false)

    axios.all([getUser,getRepos])
    .then(axios.spread ((...allData )=> {  
      setUser(allData[0].data)
      setRepos(allData[1].data)
      let x=countForks(allData[1].data)
      setForked(x)
      console.log(x)
    })
  )   .catch(function (error) {
       console.log(error,"error");
       setError(true)
     })}
  

  return (
    <div className="App">
    {error&&<p className="Error">Enter a valid user name</p>}
    <div className="form">
     <form onSubmit={handleSubmit(onSubmit)}>
     <label htmlFor="username">User Name</label>
   
      <input {...register("userName", { required: true })} />
      {errors.userName && <span className="Error">This field is required</span>} 
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

    <p className="basic"> - id : {user.id}  </p>

    <p className="basic" >- name : {user.name} </p>

    <p className="basic"> - company : {user.company} </p>

    <p className="basic"> - location : {user.location} </p>

    <p className="basic"> - email : {user.email} </p>

    <p className="name"> Number of Repos {user.public_repos}  </p>
    
    <p className="name"> Number of Followers {user.followers} </p> 


    <p className="name"> List of Forked Repos : </p> 
     {
      forked.map(repo =>(
      
       <p className="basic" > * {repo} </p>

      ))
     
     }
 
    </div>
  </div>
</div>


</div>
  );
}

export default App;
