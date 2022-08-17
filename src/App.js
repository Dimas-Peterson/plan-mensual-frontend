import React from "react";
import Navbar from "./component/Navbar";
import Form from "./component/Form";
function App() {
  const onSubmitForm = (checkData, rangeInput, formDataCustomer) => {
    console.log("Datos checkData: " + checkData);
    console.log("Datos rangeInput: " + rangeInput);
    console.log("Datos formDataCustomer: " + formDataCustomer);
  };
  

  return (
    <div>
      <Navbar />
      <Form onSubmit={onSubmitForm} />
    </div>
  );
}

export default App;
