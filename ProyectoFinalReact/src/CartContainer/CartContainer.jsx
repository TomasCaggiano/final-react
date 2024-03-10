import { useContext } from 'react'
import { CartContext } from "../../Context/CartContext";
import "./CartContainer.css"
import CartListHeader from '../CartListHeader/CartListHeader.jsx';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CartList from '../CartList/CartList';

const CartContainer = () => {


    const { cart, totalPrice, clearCart } = useContext(CartContext);


    const Clear = () => {
        clearCart();
    }
    return (
        <div className="container cart-container">
            <div className='cart-header' >
                <div >
                    <h2>Cart</h2>
                    <p>tus productos</p>
                </div>
            </div>
            <CartListHeader/>
            {
                cart.map((prod) => (
                    <div key={prod.id}>
                        <CartList prod={prod} />
                    </div>
                ))

            }

            {
                cart.length > 0 ?
                    <>
                            <h2>Precio total: {totalPrice()}</h2>
                        <div className="cart-footer">
                        <Link to="/">
                                <Button variant="outline-warning" className='botonsCarro'>Volver al menu</Button>
                            </Link>
                            <Link to="/shoppingcart">
                                <Button onClick={Clear}  variant="outline-danger" className='botonsCarro' >Vaciar <Carrito></Carrito></Button>

                            </Link>
                            <Link to="/checkout">
                                <Button variant="outline-warning" className='botonsCarro'>Finalizar compra</Button>
                            </Link>
                        </div>
                    </> :
                    <div>

                    <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Finfotic.co%2Fwp-content%2Fuploads%2F2022%2F10%2F1-1.jpeg&tbnid=sKHZ_KPDOBnzhM&vet=12ahUKEwim8capvuiEAxX3kZUCHW43CPUQMygAegQIARBf..i&imgrefurl=https%3A%2F%2Finfotic.co%2Fdescubren-error-de-windows-10-podria-bloquear-por-completo-la-computadora%2F&docid=bzWOycvjQ4domM&w=840&h=471&q=computadora%20con%20error&client=opera-gx&ved=2ahUKEwim8capvuiEAxX3kZUCHW43CPUQMygAegQIARBf" alt="error" />
                    <h2>El carrito está vacío <BsEmojiFrown /></h2>
                    <Link to="/">
                                <button className='btn btn-warning'>Volver al menu</button>
                            </Link>
                    </div>
            }

        </div>

    )
}





export default CartContainer