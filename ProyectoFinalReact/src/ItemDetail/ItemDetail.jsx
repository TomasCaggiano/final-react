import "./ItemDetail.css"
import { toCapital,} from "../../helpers/utils";
import { Row, Col } from "react-bootstrap";
import ItemCantidad from "../ItemCantidad/ItemCantidad";
import { CartContext } from '../../Context/CartContext';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

export default function ItemDetail({ product, greeting, message }) {

  const { addToCart } = useContext(CartContext);

  const [cantidad, setCantidad] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const Restar = () => {
    cantidad > 1 && setCantidad(cantidad - 1)
  }

  const Sumar = () => {
    cantidad < product.stock && setCantidad(cantidad + 1)
  }

  return (
    <div>
      <header>
        <h2 className="titulo">{title}</h2>
      </header>

      <section className="ItemDetailContainer container text-center">
        <Row xs={1} md={1} lg={2} className="g-2 justify-content-center">

          <Col className="align-items-center  details-left">
            <div className="itemDetailImg" >
              <img src={product.img} alt={product.nombre} title={product.nombre} style={{ borderRadius: '1rem', width: '280px' }} />
            </div>
            <div>
            {isAdded ? (
            <div className="block">
              <div className="mx-2 mt-2" >
                <Link to="/shoppingcart" className="btn btn-secondary btnDetailToCart" style={{fontSize:"1rem", color:"black"}}>
                  Ir al Carrito
                </Link>
              </div>
            </div>
          ) : ( product.stock > 0 && (
            <ItemCantidad
                count={cantidad}
                handlerSuma={Sumar}
                handlerResta={Restar}
                accionBoton={() => { addToCart( cantidad, product, setIsAdded) }}
                textoBoton="Agregar al Carro"
                isAdded={isAdded}
              />
          ))}
            </div>
          </Col>
          <Col>
            <div className="descripcionDetail" id="descripcionDetail"
              style={{}}>
              <div className="itemDetailBase" style={{ textAlign: 'left' }}>

                <p><strong style={{color:"blue"}}>Precio:</strong>  {product.price}</p>
                <p><strong style={{color:"blue"}}>Stock:</strong>  {product.stock}</p>
              </div>
              <div style={{  textAlign: 'left' }}>

                {product.descripcion && <p><strong style={{color:"blue"}}>Descripción:</strong>  {product.descripcion}</p>}
              </div>
            </div>
            {product.description && (
              <div className="descriptionDetail" id="descriptionDetail"
                style={{
                  color: "white", textAlign: 'left'
                }
                }
              >
                <h3 style={{ textDecoration: 'underline', margin:"2rem 0"}}>Características:</h3>
                <ul style={{ textAlign: 'left' , paddingLeft:"0", listStyleType:"none" }}>
                  {Object.entries(product.description).map(([key, value]) => (
                    <li key={key} className="descriptionDetails" style={{ textAlign: 'left'}}>
                      <strong style={{color:"blue"}}>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </section>
    </div>
  );
}