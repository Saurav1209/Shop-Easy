import UserHome from "./screens/Home";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import DataState from "./context/DataState";
import Entry from "./screens/Entry";
import Protected from "./components/Protected";


function App() {

  const [progress, setProgress] = useState(0)

  return (
    <div className="App">
      <DataState>
        <Router>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path='/home' element={
              <Protected>
                <UserHome  setProgress={setProgress} />
              </Protected>}
            ></Route>
            <Route exact path='/' element={<Entry />}></Route>
          </Routes>
        </Router>
      </DataState>
    </div>
  );
}

export default App;
