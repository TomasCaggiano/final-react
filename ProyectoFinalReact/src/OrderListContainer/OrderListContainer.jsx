import "./OrderListContainer.css"
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { db } from "../../data/firebaseConfig";
import OrderList from "../OrderList/OrderList";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrderListContainer() {
    const [orderId, setOrderId] = useState("");
    const [codigoBuscar, setcodigoBuscar] = useState("")
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [busquedaVacia, setBusquedaVacia] = useState(false)
    const { setCart } = useContext(CartContext)

    useEffect(() => {
        if (orderId) {
            setLoading(true);
            const orderRef = doc(db, "orders", orderId);
            getDoc(orderRef).then((documento) => {
                if (documento.exists()) {
                    setOrder({ id: documento.id, ...documento.data() });
                    setBusquedaVacia(false)
                } else {
                    setOrder(null);
                    setBusquedaVacia(true);
                }
            }).catch((error) => {
                console.error("Error obteniendo el producto:", error);
                setOrder(null);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [orderId]);



    const InputChange = (event) => {
        setcodigoBuscar(event.target.value);
    };

    const RepetirCompra = (productos) => {
        setCart(productos)
    }


    const SearchButtonClick = async () => {

        if (!codigoBuscar) {
            console.log("Ingresa un ID de pedido válido");
            return;
        }

        try {
            console.log("Buscando pedido con ID:", codigoBuscar);
            setOrderId(codigoBuscar);

        } catch (error) {
            console.error("Error al buscar pedido:", error);
            setOrder(null);
        }
    };

    return (
        <div>
            <div className="container ordersHeaders">
                <h2 style={{ marginTop: "12rem" }}>Mis órdenes</h2>
                <p>Ingresa el código de tu pedido para ver los detalles</p>
                <p style={{ color: "slategray " }}>Ejemplo: 8ELz7zULvWuhjiYY15ON</p>
                <div className="container flex" style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                    <input id="orderIdInput" type="text" onChange={InputChange} />
                    <button className="btn btn-warning" onClick={SearchButtonClick}>Buscar</button>
                </div>
            </div>

            {(loading) && <div style={{ height: "10rem" }}> <img src="/leon.gif" alt="Buscando" /></div>}
            {order && (
                    <div className="orderDetailsContainer container">
                        <div className="orderDetailsHeader container">
                            <p>Detalles del Pedido:</p>
                            <h3> {order.id}</h3>
                        </div>
                        <div className="fechaHora container">
                            <p><strong>Fecha:</strong>  {order.fecha}</p>
                            <p> <strong>Hora:</strong>  {order.hora}</p>
                        </div>
                        <div className="listHeaders container">
                            <span>Img</span>
                            <span>Cant</span>
                            <span>Nombre</span>
                            <span>P.Unitario</span>
                            <span>P.Total</span>
                        </div>

                        {order.productos.map((prod) => (
                            <div key={prod.id}>
                                <OrderList orderedProduct={prod} />
                            </div>
                        ))}
                    <div className="orderDatailsFooter container">
                        <Link to="/shoppingCart">
                            <Button variant="outline-warning" onClick={() => RepetirCompra(order.productos)}>Repetir la compra</Button>
                        </Link>
                        <p>Total:</p>
                        <h3>{order.total}</h3>
                    </div>
                    </div>
               
            )}
            {(busquedaVacia) && <p>No se encontró ningún pedido con el ID ingresado</p>}

        </div>

    );
}