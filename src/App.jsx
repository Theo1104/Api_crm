import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout"
import Beginning from "./paginas/Beginning"
import NewClient from './paginas/NewClient';
import EditClient from './paginas/EditClient';
import ViewClient from './paginas/ViewClient';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/clients" element={<Layout/>}>
          <Route index element={<Beginning/>}/>
          <Route path="new" element={<NewClient/>}/>
          <Route path="edit/:id" element={<EditClient/>}/>
          <Route path=":id" element={<ViewClient/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
