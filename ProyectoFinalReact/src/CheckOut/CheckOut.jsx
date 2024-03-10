import "./Checkout.css"

import { useContext, useState } from 'react'
import { CartContext } from "../../Context/CartContext";

import { useForm } from 'react-hook-form';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../data/firebaseConfig";
import { Link } from "react-router-dom";
import CartList from "../CartList/CartList";
import Button from 'react-bootstrap/Button';
import CartListHeader from "../CartListHeader/CartListHeader";

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { isPossiblePhoneNumber } from 'react-phone-number-input';


const Checkout = () => {

    const [pedidoId, setPedidoId] = useState("");
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const comprar = (data) => {
        const fechaActual = new Date();
        const fechaFormateada = format(fechaActual, 'dd/MM/yyyy', { locale: es });
        const horaFormateada = format(fechaActual, 'HH:mm:ss');

        const pedido = {
            cliente: data,
            productos: cart,
            total: totalPrice(),
            fecha: fechaFormateada,
            hora: horaFormateada
        }

        const pedidosRef = collection(db, "orders");

        addDoc(pedidosRef, pedido)
            .then((doc) => {
                setPedidoId(doc.id);
                clearCart();
            })

    }

    const onSubmit = handleSubmit((data) => {
        const dataValida = {
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono
        }
        cart.length > 0 ?
            comprar(dataValida) : alert("Tu carrito está vacío")
    })


    if (pedidoId) {
        return (
            <div className="container" style={{ marginTop: "20rem" }}>
                <h2 className="main-title">Muchas gracias por tu compra</h2>
                <p>Tu número de pedido es: </p>
                <h2>{pedidoId}</h2>
                <Link to="/">
                    <button className='btn btn-warning'>Volver a la tienda</button>
                </Link>
            </div>
        )
    }


    return (
        <div className="container" style={{ marginTop: "12rem" }}>
            <h2 className="main-title">Finalizar compra</h2>

            <p>Ingresa tus datos para poder generar tu pedido</p>
            <form className="formulario" onSubmit={onSubmit}>

                <div className="formFields nombreInput">
                    <input type="text" placeholder="Nombre"
                        {...register("nombre", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio"
                            },
                            minLength: {
                                value: 2,
                                message: "El largo mínimo son 2 caracteres"
                            },
                            maxLength: {
                                value: 50,
                                message: "El largo máximo son 50 caracteres"
                            },
                        })} />
                    {errors.nombre && <span className="formErrorMsg">{errors.nombre.message}</span>}
                </div>
                <div className="formFields emailInput">
                    <input type="email" placeholder="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Correo no válido",
                            },
                        })} />
                    {errors.email && <span className="formErrorMsg">{errors.email.message}</span>}
                </div>
                <div className="formFields emailInputComp">
                    <input type="email" placeholder="Confirme su Email"
                        {...register("emailConf", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Correo no válido",
                            },
                            validate: (value) =>
                                value === watch('email') || "Los correos no coinciden",
                        })} />
                    {errors.emailConf && <span className="formErrorMsg">{errors.emailConf.message}</span>}
                </div>
                <div className="formFields phoneInput">
                    <input type="tel" placeholder="Teléfono con código de país ej. +569 7777 8888"
                        {...register("telefono", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio"
                            },
                            minLength: {
                                value: 8,
                                message: "El largo mínimo son 8 caracteres"
                            },
                            maxLength: {
                                value: 30,
                                message: "El largo máximo son 30 caracteres"
                            },
                            validate: (value) =>

                                isPossiblePhoneNumber(value) || "Ingresa un número telefónico válido incluyendo código de país",
                        })} />
                    {errors.telefono && <span className="formErrorMsg">{errors.telefono.message}</span>}
                </div>
                <div style={{ margin: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
                    <p>Total a Pagar:</p>
                    <h2>{totalPrice()}</h2>
                </div>
                <div className="formButtons"
                    style={{ margin: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Link to="/">
                        <Button variant="outline-warning">Volver al inicio</Button>
                    </Link>
                    <button className="submit btn btn-warning" type="submit"
                    // disabled={isDisabled}
                    >Generar Pedido</button>
                    <Link to="/shoppingCart">
                        <Button variant="outline-warning">Volver al Carrito</Button>
                    </Link>
                </div>
            </form>
            <div className='cart-header' >
                <div >
                    <p>Estos son los productos que elegiste </p>
                </div>
            </div>
            <CartListHeader />

            {

                cart.map((prod) => (
                    <div key={prod.id}>
                        <CartList prod={prod} />
                    </div>
                ))

            }
        </div>
    )
}

export default Checkout