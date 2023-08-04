import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState({});
  const [isPresent, setIsPresent] = useState(false);
  const [nodata,setNodata]=useState(false)
  const [error, setError] = useState(false); 
  const [flag, setFlag] = useState(false); 

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setError(false); 
  }

  const handlesearchItem = () => {
    if (search === "") {
      setFlag(true); 
      return;
    }
    fetch(`https://api.github.com/users/${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data",data)
        if(data.message == "Not Found"){
        setError(true);
        setFlag(false);
        }
        else{
        setUserData(data);
        setIsPresent(true);
        setSearch("");
        setNodata(false);
        }
      })
      .catch((err) => 
      console.log("Error", err),
        setUserData({}),
        setIsPresent(false), 
        setNodata(true))
  
  }

  

 
  return (
    <div className="App">
      <input type='text' value={search} onChange={handleSearch} placeholder='Search Github user' style={{ color: "white", height: "20px", marginTop: "40px" }} />   
      <button onClick={handlesearchItem}>search</button>
      
      <br/>
      <br/>
      <br/>

      {flag && <p>Please enter a username</p>} 
      {error && <p>No user Found</p>}

<div className='usersinfo'>
        {isPresent ? ( 
          <div className='card'>
            <div className='avatar'>
              <img src={userData.avatar_url} alt={userData.login} />
            </div>
            <div className='info'>
              <h2>{userData.name}</h2>
             <h3> <p><a href={userData.html_url} target="_blank" style={{color:"blue"}}>{userData.login} </a></p></h3>
              {/* <p className='username'>{userData.login}</p> */}
              <p>{userData.bio}</p>
              <div className='detailsLeft'>
                <p>Location: {userData.location ? userData.location : "No Location"}</p>
                <p>Company: {userData.company ? userData.company : "No Company"}</p>
                <p>Twitter: {userData.twitter_username ? userData.twitter_username : "No Twitter"}</p>
                </div>
                <div className='detailsRight'>
                <p>Repo: {userData.public_repos}</p>
                <p>Followers: {userData.followers}</p>
                <p>Following: {userData.following}</p>
                
              </div>
            </div>
          </div>
        ) :(
         <>
Welcome! Type a GitHub username in the text field and click 'search' to view user details.
          </>
        )
        }
      </div>

    </div>
  );
}

export default App;
