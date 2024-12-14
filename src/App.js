import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom"; // No BrowserRouter here

function UserProfile({ userData }) {
  return (
    <div className="row">
      <div className="box">
        <h4>{userData.name}</h4>
        <p>{userData.email}</p>
        <p>{userData.phone}</p>
      </div>
    </div>
  );
}

function UserActivities({ userData }) {
  return (
    <div className="row">
      <div className="box">
        <h4>{userData.title}</h4>
        <p>{userData.body}</p>
      </div>
    </div>
  );
}

function App() {
  const [userprofile, setUserProfile] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [num, setNum] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setUserActivities(data);
      } catch (error) {
        console.error("Error fetching activities data:", error);
      }
    };
    fetchUserActivities();
  }, []);

  // Generate random user number
  const generateNum = () => {
    const num = Math.floor(Math.random() * 10) + 1;
    setNum(num);
  };

  return (
    <div className="container">
      <div className="sidenav">
        <h2>Logo</h2>
        <ul>
          <li>
            <Link to={`/user/${num}`} onClick={generateNum}>
              Get User
            </Link>
          </li>
        </ul>
      </div>

      <div className="content">
        <Routes>
          <Route
            path="/user/:id"
            element={
              <>
                {userprofile
                  .filter((item) => item.id === num)
                  .map((user) => (
                    <UserProfile key={user.id} userData={user} />
                  ))}
                {userActivities
                  .filter((item) => item.id === num)
                  .map((activity) => (
                    <UserActivities key={activity.id} userData={activity} />
                  ))}
              </>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <h3>Welcome! Click on "Get User" to view a random user.</h3>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
