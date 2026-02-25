import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList";
import SendMail from "./components/SendMail/SendMail";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveCategory, selectSendMessageIsOpen, setActiveCategory } from "./features/mailSlice";
import { selectUser, login } from "./features/userSlice";
import { selectSidebarVisible } from "./features/sidebarSlice";
import Login from "./components/Login/Login";
import { db, auth } from "./firebase";
import { demoEmails } from "./demoData";
import CircularProgress from '@material-ui/core/CircularProgress';

// Main app component
function App() {
  console.log("App component rendering");
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const activeCategory = useSelector(selectActiveCategory);
  const sidebarVisible = useSelector(selectSidebarVisible);
  const dispatch = useDispatch();
  const [emails, setEmails] = useState([]);
  const [allEmails, setAllEmails] = useState(demoEmails);
  const [loading, setLoading] = useState(true);

  // Check for existing user session
  useEffect(() => {
    console.log("Checking user auth state");
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // User is signed in
        console.log("User is signed in:", userAuth.email);
        dispatch(login({
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoUrl: userAuth.photoURL,
        }));
      } else {
        console.log("No user is signed in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Effect for fetching real emails from Firebase
  useEffect(() => {
    console.log("Fetching emails from Firebase");
    const fetchEmails = () => {
      db.collection("emails")
        .orderBy("timestamp", "desc")
        .onSnapshot(
          (snapshot) => {
            const firebaseEmails = snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));

            // Merge firebase emails with demo emails for inbox
            const updatedEmails = { ...allEmails };
            updatedEmails.inbox = [...updatedEmails.inbox, ...firebaseEmails];
            setAllEmails(updatedEmails);
          },
          (error) => {
            console.error("Firestore error:", error);
            alert(
              `Failed to fetch emails: ${error.message}\n\nThis is likely due to a Firestore security rule issue. Please ensure your rules allow reads from the 'emails' collection for authenticated users.`
            );
          }
        );
    };
    
    fetchEmails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to update emails when active category changes
  useEffect(() => {
    if (allEmails[activeCategory]) {
      setEmails(allEmails[activeCategory]);
    } else {
      setEmails([]);
    }
  }, [activeCategory, allEmails]);

  if (loading) {
    console.log("App is in loading state");
    return (
      <div className="app-loading">
        <CircularProgress />
      </div>
    );
  }

  console.log("User state:", user ? "Logged in" : "Not logged in");
  
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className={`app-body ${!sidebarVisible ? 'sidebar-hidden' : ''}`}>
            {sidebarVisible && <Sidebar allEmails={allEmails} />}
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/category/:category">
                {({ match }) => {
                  const category = match.params.category;
                  if (category !== activeCategory) {
                    dispatch(setActiveCategory(category));
                  }
                  return <EmailList emails={emails} />;
                }}
              </Route>
              <Route path="/" exact>
                {() => {
                  // Set active category to inbox when viewing root path
                  if (activeCategory !== "inbox") {
                    dispatch(setActiveCategory("inbox"));
                  }
                  return <EmailList emails={allEmails.inbox} />;
                }}
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
