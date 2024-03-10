import { Row } from "react-bootstrap";
import Item from "../Item/Item";

export default function ItemList({ productos }) {
    return (
        <div>
            <section className="item-list-container container ">
                <Row xs={1} md={2} lg={3} xl={4} className="g-2">
                    {productos.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </Row>
            </section>
        </div>
    )
}