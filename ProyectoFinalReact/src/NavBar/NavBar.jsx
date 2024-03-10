
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import Logo from "../Logo/Logo";
import Loading from "../Loading/Loading";
import CartWidget from "../CartWidget/CartWidget";
import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";



export default function NavBar() {

  const db = getFirestore();
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)

    const categoriesRef = collection(db, "categorias");
    const orderedCategoriesRef = query(categoriesRef, orderBy("priority"));


    getDocs(orderedCategoriesRef).then((snapshot) => {
      const categoriesMap = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setCategories(categoriesMap);
      setLoading(false);
    }).catch((error) => {
      console.error("Error obteniendo la categoría:", error);
      setLoading(true);
    });

  }, [db]);

  const [expanded, setExpanded] = useState(false);

  return (
    <>

      {loading ? (
        <>
          <Loading />
        </>
      ) : (

        <div className="navBarWrap container">

          <Navbar


            id="navbar"

            bg="dark"
            data-bs-theme="dark"
            fixed="top"
            expand="lg"
            className="bg-body-primary"
            variant="dark"
            collapseOnSelect
            expanded={expanded}
          >

            <Container className="navBarCont">
              <Navbar.Brand
                id="logo"
              >
                <Link to="/" onClick={() => setExpanded(false)} >
                  <Logo width={70} height={70} />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar" />

              <Navbar.Collapse id="basic-navbar" >
                <Nav
                  id="navbar-right"
                  className="me-auto">
                  {categories.map(categoria => (
                    <NavLink
                      key={categoria.id}
                      to={`/categoria/${categoria.key}`}
                      onClick={() => setExpanded(false)}
                    >
                      {categoria.descripcion}
                    </NavLink>

                  ))}

                </Nav>
                <div>

                  <NavLink
                    id="navbar-right-2"
                    to="/orders" onClick={() => setExpanded(false)} >Mis órdenes</NavLink>
                </div>
              </Navbar.Collapse>
              <NavLink
                id="navbar-right-3"
                to="/shoppingcart" onClick={() => setExpanded(false)} >
                <CartWidget />
              </NavLink>
            </Container>
          </Navbar>
        </div>

      )}

    </>
  );
}