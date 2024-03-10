const ItemCantidad = ({ count, Resta, Suma, accionBoton , textoBoton}) => {


    return (
  
  
        <div className="m-2 flex justify-center itemCantidad"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <button className="btn btn-warning btnCantidad" onClick={Resta}>
            -
          </button>
          <p className="text-center px-3 txtCantidad">{count}</p>
          <button className="btn btn-warning btnCantidad" onClick={Suma}>
            +
          </button>
        <div>
          <button className="btn btn-warning px-3 btnAccion"
            style={{ fontSize: '1rem', height:"2rem", padding:"0"}}
            onClick={accionBoton}
          >{textoBoton}</button>
        </div>
        </div>
  
  
    );
  };
  
  export default ItemCantidad;