import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { db } from "../../data/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ItemDetailContainer() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);


    const productoRef = doc(db, "products", itemId);

    getDoc(productoRef).then((documento) => {
      if (documento.exists()) {
        setItem({ id: documento.id, ...documento.data() })

        setLoading(false);

      } else {
        setItem(fakeProduct);
        setLoading(false);
      }
    }).catch((error) => {
      console.error("Error obteniendo el producto:", error);


    });


  }, [itemId]);




  const greeting = item ? item.nombre : "Compunentes";
  const message = item
    ? "Detalles del producto:"
    : "Este producto ya no está disponible";

  return (
    <main>

      {loading ? (
        <>
          <loading />
        </>
      ) : (
        item && <ItemDetail producto={item} greeting={greeting} message={message} />
      )}


    </main>
  );

}