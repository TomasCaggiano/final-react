import { BsCart } from "react-icons/bs";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
const CartWidget = () => {
    const { quantityInCart, totalPrice } = useContext(CartContext);
  return (
    <div className="container iconoCarro ">
        <BsCart />
      <h2 className="numerito">{quantityInCart()}</h2>
      <h2 className="monto">{totalPrice()}</h2>
    </div>
  );
};

export default CartWidget;