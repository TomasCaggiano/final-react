import { Button } from "react-bootstrap";
import "./CantProduct.css"

const CantProduct = ({ count, Resta, Suma}) => {


    return (


        <div className="m-2 flex justify-center itemCantidad" st
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
        >
            <Button variant="outline-warning"  className=" btnCantidad" onClick={Resta}>
                -
            </Button>
            <p className="text-center px-4 txtCantidad">{count}</p>

            <Button variant="outline-warning"  className=" btnCantidad" onClick={Suma}>
                +
            </Button>
        </div>


    );
};

export default CantProduct;