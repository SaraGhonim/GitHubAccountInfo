import React, {useEffect, useState, useRef} from 'react';

import { useForm } from "react-hook-form";
import './App.css';

const axios = require('axios');


function form() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [user,setUser]=useState("")
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  
    axios.get(`https://api.github.com/users/${data.exampleRequired}`)
    .then(function (response) {
      setLoading(false)
      setUser(response.data)
      console.log(response.data,"here");
    })
    .catch(function (error) {
      console.log(error,"sksldk");
    })
    
  
  }
  // console.log(watch("example")); // watch input value by passing the name of it

  return (
  <div>
    <form onSubmit={handleSubmit(onSubmit)}>   
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>} 
      <input type="submit" />
    </form>


   
    </div>
  );
}

export default form;
