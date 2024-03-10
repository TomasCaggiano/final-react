import "./Item.css"
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Item({ item }) {
  const { addToCartFast } = useContext(CartContext);

  return (
    <div >
      <Col>
        <Card
          style={{ width: "18rem", borderRadius: "1rem" }}
          bg="dark"
          text="white"
          className="mb-2 itemCards"
          key={item.id}
        >
          <Link className="ver-mas" to={`/producto/${item.id}`}>

            <Card.Img
              variant="top"
              src={item.img}
              style={{
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                maxHeight: "18rem",
                minHeight: "18rem",
                width: "100%",
                objectFit: "fill"
              }}
            />
          </Link>
          <Card.Body>
            <Card.Title style={{ height: "3rem" }}>{item.nombre}</Card.Title>
            <Card.Text>{item.price}</Card.Text>
            <Card.Text
              style={{ fontSize: '.7rem' }}
            >Stock:{item.stock + ' ' + item.unidad}</Card.Text>
            <div className="card-actions justify-end gap-0 mt-2 ">
              <Link to={`/producto/${item.id}`} className="btn btn-warning mx-2">
                Ver Detalles
              </Link>
              <button className="btn btn-warning px-3 btnAddFast mx-2"
                onClick={() => addToCartFast(1, item)}
              > <BsCart /></button>
            </div>


          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}