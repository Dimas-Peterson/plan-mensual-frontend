import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import "../css/main.css";

let valueRange = 100;
let formCustomer = [];

const Form = () => {
  //Formulario Precio
  let precioFinal = 0;
  let precioAgregadoRange = 0;
  let precioAgregadoCheck = 0;
  let precioInicial = 2700;

  //Register lo mandamos como referencia, mediante el cual validamos y el onSubmit recibe la data
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formDataCustomer, setFormDataCustomer] = useState({
    name: "",
    lastname: "",
    gymname: "",
    email: "",
    phone: "",
  });

  const valueToState = ({ name, value }) => {
    setFormDataCustomer({ ...formDataCustomer, [name]: value });
    formCustomer = formDataCustomer;
  };

  //---------------INPUT RANGE--------------------//
  const [rangeInput, setRangeInput] = useState({
    rango: 0,
  });

  const manejarRango = ({ name, value }) => {
    setRangeInput({ ...rangeInput, [name]: value });
    valueRange = value;
  };

  //Precios Input Range
  switch (parseInt(valueRange)) {
    case 100:
      precioAgregadoRange = 0;
      break;
    case 200:
      precioAgregadoRange = 400;
      break;
    case 300:
      precioAgregadoRange = 800;
      break;
    case 400:
      precioAgregadoRange = 1200;
      break;
    case 500:
      precioAgregadoRange = 1600;
      break;
    case 600:
      precioAgregadoRange = 2000;
      break;
    case 700:
      precioAgregadoRange = 2400;
      break;
    case 800:
      precioAgregadoRange = 2800;
      break;
    case 900:
      precioAgregadoRange = 3200;
      break;
    case 1000:
      precioAgregadoRange = 3600;
      break;
  }

  //---------------INPUT CHECKBOX--------------------//
  const [checkData, setCheckData] = useState({
    cWhatsapp: false,
    cSocios: false,
    cDuenios: false,
    cCompuExtra: false,
  });

  const valueToStateCheck = ({ name, value, checked, type }) => {
    setCheckData({
      ...checkData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //Precios Check
  if (checkData.cWhatsapp === true) {
    precioAgregadoCheck += 1500;
  }
  if (checkData.cSocios === true) {
    precioAgregadoCheck += 1900;
  }
  if (checkData.cDuenios === true) {
    precioAgregadoCheck += 1200;
  }
  if (checkData.cCompuExtra === true) {
    precioAgregadoCheck += 1700;
  }

  precioFinal = precioInicial + precioAgregadoCheck + precioAgregadoRange;

  const [successfulSend, setSuccessfulSend] = useState({
    delivery: false,
  });
  
  //Envio de informacion a la APIREST
  const onSubmit = (event) => {
    const dataForm = {
      name: formDataCustomer.name,
      lastname: formDataCustomer.lastname,
      gymname: formDataCustomer.gymname,
      email: formDataCustomer.email,
      phone: formDataCustomer.phone,
      range: rangeInput.rango,
      notiWhatsapp: checkData.cWhatsapp,
      appMember: checkData.cSocios,
      appOwner: checkData.cDuenios,
      extraComputer: checkData.cCompuExtra,
    };
    try {
      fetch("http://localhost:8080/api/datosFormulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      })
      .then(() => {
        valueRange = 100;
        precioFinal = 0;
        precioInicial = 2700;})
      .then(() => {
        setSuccessfulSend({ delivery: true });
        setRangeInput({rango: 0})
        reset();
      });
    } catch (e) {
      console.log("El formulario no se pudo enviar");
    }
  };

  return (
    <>
      {/* ===== Main Content Start ===== */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container pt-2 mt-5 min-vh-100">
          {/* ===== Contact Info Start ===== */}
          <div className="row justify-content-center g-0">
            <div className="card col-11 mt-3 mb-3 shadow">
              <div className="card-header text-center text-light bg-dark-main d-flex flex-column justify-content-center">
                Datos de contacto
              </div>
              <div className="card-body bg-light">
                {/* ===== Name ===== */}
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="nombre"
                  className="form-control mb-3"
                  placeholder="Nombre del solicitante"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "El campo 'Nombre' es requerido",
                    },
                  })}
                  onChange={(event) => valueToState(event.target)}
                />
                {errors.name && (
                  <p className="alert alert-danger col-5 p-2 text-center">
                    {errors.name.message}
                  </p>
                )}

                {/* ===== LastName ===== */}
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="apellido"
                  className="form-control mb-3"
                  placeholder="Apellido del solicitante"
                  onBlur={register}
                  {...register("lastname", { required: true })}
                  onChange={(event) => valueToState(event.target)}
                />
                {errors.lastname && (
                  <p className="alert alert-danger col-5 p-2 text-center">
                    Campo "Apellido" requerido
                  </p>
                )}

                {/* ===== Gym Name ===== */}
                <label htmlFor="nombreGimnasio" className="form-label">
                  Nombre del gimnasio
                </label>
                <input
                  type="text"
                  name="gymname"
                  id="nombreGimnasio"
                  className="form-control mb-3"
                  placeholder="Nombre del gimnasio"
                  {...register("gymname", { required: true })}
                  onChange={(event) => valueToState(event.target)}
                />
                {errors.gymname && (
                  <p className="alert alert-danger col-5 p-2 text-center">
                    Campo "Nombre del gimnasio" requerido
                  </p>
                )}

                {/* ===== Email ===== */}
                <label htmlFor="email" className="form-label">
                  Email de contacto
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="email"
                  id="email"
                  placeholder="Email del solicitante"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    pattern: {
                      value: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
                      message: "El formato no es correcto",
                    },
                  })}
                  onChange={(event) => valueToState(event.target)}
                />
                {errors.email && (
                  <p className="alert alert-danger col-5 p-2 text-center">
                    {errors.email.message}
                  </p>
                )}

                {/* ===== Phone ===== */}
                <label htmlFor="telefono" className="form-label">
                  Teléfono de contacto
                </label>
                <input
                  type="tel"
                  className="form-control mb-3"
                  name="phone"
                  id="telefono"
                  placeholder="Teléfono del solicitante"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Es necesario un teléfono de contacto",
                    },
                    minLength: {
                      value: 7,
                      message: "El número es demasiado corto",
                    },
                    maxLength: {
                      value: 16,
                      message: "El número no puede tener mas de 16 dígitos",
                    },
                    pattern: {
                      value: /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/,
                      message: "El formato no es válido",
                    },
                  })}
                  onChange={(event) => valueToState(event.target)}
                />
                {errors.phone && (
                  <p className="alert alert-danger col-5 p-2 text-center">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* ===== Form End ===== */}
        </div>
        <div className="row justify-content-center g-0">
          <div className="card col-11 justify-content-center p-0 shadow">
            <div className="card-header text-center text-light bg-dark-main">
              Cupo de Socios activos
            </div>
            <div className="card-body bg-light">
              <div className="form-group col-9 mx-auto pb-3">
                <label htmlFor="range" className="form-label" id="rangeLabel">
                  { valueRange }
                </label>
                <input
                  name="rango"
                  type="range"
                  className="form-range"
                  id="range"
                  min="100"
                  max="1000"
                  step="100"
                  onChange={(event) => manejarRango(event.target)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* =========================== CHECKBOX DATA ========================== */}
        <div>
          {/* ===== Cards #2 - #5 ===== */}
          <div className="row justify-content-around g-0 ">
            {/* ===== Card #2 ===== */}
            <div className="card col-11 col-sm-5 col-lg-2 mt-3 shadow">
              <div className="card-header text-center text-light bg-dark-main height-headerCard d-flex flex-column justify-content-center h-40">
                Notificaciones por WhatsApp
              </div>
              <div className="card-body pt-4 bg-light h-60">
                <div className="d-flex justify-content-center mx-auto form-check">
                  <input
                    name="cWhatsapp"
                    type="checkbox"
                    className="form-check-input me-1"
                    id="cWhatsapp"
                    onChange={(event) => valueToStateCheck(event.target)}
                  />
                  <label htmlFor="cWhatsapp" className="form-check-label">
                    Si
                  </label>
                </div>
              </div>
            </div>
            {/* ===== Card #3 ===== */}
            <div className="card col-11 col-sm-5 col-lg-2 mt-3 shadow">
              <div className="card-header text-center text-light bg-dark-main height-headerCard d-flex flex-column justify-content-center h-40">
                App Móvil para socios
              </div>
              <div className="card-body pt-4 bg-light h-60">
                <div className="d-flex justify-content-center mx-auto form-check">
                  <input
                    name="cSocios"
                    type="checkbox"
                    className="form-check-input me-1"
                    id="cSocios"
                    value={checkData}
                    onChange={(event) => valueToStateCheck(event.target)}
                  />
                  <label htmlFor="cSocios" className="form-check-label">
                    Si
                  </label>
                </div>
              </div>
            </div>
            {/* ===== Card #4 ===== */}
            <div className="card col-11 col-sm-5 col-lg-2 mt-3 shadow">
              <div className="card-header text-center text-light bg-dark-main height-headerCard d-flex flex-column justify-content-center h-40">
                App Móvil para dueños
              </div>
              <div className="card-body pt-4 bg-light h-60">
                <div className="d-flex justify-content-center mx-auto form-check">
                  <input
                    name="cDuenios"
                    type="checkbox"
                    className="form-check-input me-1"
                    id="cDuenios"
                    value={checkData}
                    onChange={(event) => valueToStateCheck(event.target)}
                  />
                  <label htmlFor="cDuenios" className="form-check-label">
                    Si
                  </label>
                </div>
              </div>
            </div>
            {/* ===== Card #5 ===== */}
            <div className="card col-11 col-sm-5 col-lg-2 mt-3 shadow">
              <div className="card-header text-center text-light bg-dark-main height-headerCard d-flex flex-column justify-content-center h-40">
                Computadora extra
              </div>
              <div className="card-body pt-4 bg-light h-60">
                <div className="d-flex justify-content-center mx-auto form-check align-content-center">
                  <input
                    name="cCompuExtra"
                    type="checkbox"
                    className="form-check-input me-1"
                    id="cCompuExtra"
                    value={checkData}
                    onChange={(event) => valueToStateCheck(event.target)}
                  />
                  <label htmlFor="cCompuExtra" className="form-check-label">
                    Si
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* ===== Cards End ===== */}
          {/* ===== Building Plan End ===== */}
          {/* ===== Final Price Start ===== */}
          <div className="row pt-3 justify-content-center">
            <h2 className="col-11 fw-normal h2 text-center pt-3">
              Precio Final
            </h2>
            <div
              name="div"
              id="finalPrice"
              className="col-11 text-center m-3 p-3 h2 border border-2 border-danger rounded-pill"
            >
              { precioFinal }
            </div>
            {successfulSend.delivery && (
            <p className="alert alert-success col-5 p-2 text-center">
              El plan seleccionado se envio exitosamente.
            </p>
          )}
          </div>
          {/* ===== Final Price End ===== */}
        </div>
        <div className="row col-6 mx-auto">
          <button type="submit" className="btn btn-danger rounded-pill mb-3">
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;