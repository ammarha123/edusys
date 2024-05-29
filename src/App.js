import React from "react";
import Login from "./View/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./View/Register";
import ForgotPassword from "./View/ForgotPassword";
import Dashboard from "./View/Dashboard";
import ChatbotFrontEnd from "./View/ChatbotFrontEnd";
import LandingPage from "./View/Landing";
import Home from "./View/Home";
import About from "./View/About";
import Contact from "./View/Contact";
import Chats from "./View/Chats";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import CreateNote from "./View/Notes/CreateNote";
import Notes from "./View/Notes/Notes";
import EditNote from "./View/Notes/EditNote";
import Note from "./View/Notes/Note";
import AllNotes from "./View/Notes/pages/AllNotes/AllNotes";
import ArchiveNotes from "./View/Notes/pages/ArchieveNotes/ArchieveNotes";
import TrashNotes from "./View/Notes/pages/TrashNotes/TrashNotes";
import TagNotes from "./View/Notes/pages/TagNotes/TagNotes";
import ErrorsPage from "./View/Notes/pages/ErrorPage/ErrorPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { CreateNoteModal, TagsModal } from "./View/Notes/components";

function App() {
  const { currentUser } = useContext(AuthContext);
    const { viewEditTagsModal, viewCreateNoteModal } = useSelector(
    (state) => state.modal)

  return (
     <div className="app">
      {/* modals */}
      {viewCreateNoteModal && <CreateNoteModal />}
      {viewEditTagsModal && <TagsModal type="edit" />}

      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/PasswordReset" element={<ForgotPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/Chatbot" element={<ChatbotFrontEnd />}></Route>
        <Route path="/Chats" element={<Chats />}></Route>
        {/* <Route path="/Editor" element={<Notes/>}></Route>
        <Route path="/create-editor" element={<CreateNote />}></Route>
        <Route path="/edit-editor/:id" element={<EditNote />}></Route> */}

        <Route path="/notes" element={<AllNotes />} ></Route>
        <Route path="/archive" element={<ArchiveNotes />}> </Route>
        <Route path="/trash" element={<TrashNotes />}> </Route>
        <Route path="/tag/:name" element={<TagNotes />}> </Route>
        {/* <Route path="/404" element={<ErrorsPage />} /> */}
        {/* <Route path="/*" element={<Navigate to={"/404"} replace />} /> */}

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
