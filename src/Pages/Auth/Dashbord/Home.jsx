/* eslint-disable no-unused-vars */
import React from "react";
import userUsers from "../../../Hooks/useUsers";

const Home = () => {

  const{users,isLoading,error}=userUsers()
  if(!isLoading){  console.log("from home page :",users.data?.[0]
    
    ) }

  return <div>{ !isLoading ?(users.data.map((user)=><div key={user.name}> {user.name} </div>)) :(<div></div>)}</div>;
};

export default Home;
