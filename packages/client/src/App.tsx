import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage.tsx";
import FormBuilder from "./pages/FormBuilder/FormBuilder.tsx";
import FormFiller from "./pages/FormFiller/FormFiller.tsx";
import FormResponses from "./pages/FormResponses/FormResponses.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/forms/new" element={<FormBuilder/>}></Route>
        <Route path="/forms/:id/fill" element={<FormFiller/>}></Route>
        <Route path="/forms/:id/responses" element={<FormResponses/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
