import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Product from "./Product";
import CategoryEdit from "./CategoryEdit";
import CrudProduct from "./CrudProduct";
import CrudCategory from "./CrudCategory";
import axios from "axios";
import { Menu, Dropdown, Button, Space, Card, Input } from "antd";

import { DownOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./Home.css";
const { SubMenu } = Menu;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [child_category, setChildCategory] = useState([]);
  const [selected, setSelected] = useState("All");
  const [response, setResponse] = useState({});
  
  const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
  

  const [showCatEdit, setShowCatEdit] = useState(false);

  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");

  const baseUrl = "http://localhost:8082/api/";

  const getProducts = async () => {
    const response = await axios.get(baseUrl + "products");
    setProducts(response.data);
  };

  const getProductsByCategory = () => {
    axios.get(baseUrl + "products?category=" + selected).then((response) => {
      setProducts(response.data);
    });
  };

  const getCategories = () => {
    axios
      .get(baseUrl + "categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getChildCategories = async (child_category) => {
    const response = await axios.get(baseUrl + "categories/child", {
      params: {
        name: child_category,
      },
    });

    setChildCategory(response.data.map((e) => e.name));

    console.log(response.data);

    getProductsByCategory();
  };

  const deleteCategory = async (id) => {
    const response = await axios.delete(baseUrl + "categories?id=" + id);
    getCategories();
    console.log(response);
  };

  const editCategory = async (id) => {
    const response = await axios.put(baseUrl + "categories", {
      id: id,
      name: catName,
      description: catDescription,
    });
    getCategories();
    console.log(response);
  };

  useEffect(() => {
    getChildCategories(selected);
  }, [selected]);

  useEffect(() => {
    getProductsByCategory();
  }, [selected]);

  useEffect(() => {
    getCategories();
  }, [response]);

  useEffect(() => {
    getCategories();
    getProducts();
  }, [response]);

  return (
    <div>
      
      <Header />
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          margin: "2vw",
          padding: "10px",
          backgroundColor: "lightgray",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <CrudCategory update={setResponse} />

          <CrudProduct update={setResponse} />
        </div>
      </div>
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          margin: "2vw",
        }}
      >
        <h2>Categories</h2>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <div>
            <Card
              title="All"
              style={{
                height: "5vh",
                padding: "10px",
                borderRadius: "10px",
                margin: "10px",
                backgroundColor:
                  selected === "All"
                    ? "lightgreen"
                    : child_category.includes("All")
                    ? "yellow"
                    : "lightpink",
                // color: (selected === category.name ? "lightgreen" : "lightpink"),
              }}
              onClick={() => {
                setSelected("All");
                getProducts();
              }}
            ></Card>
          </div>
          {categories.map((category) => {
            return (
              <div>
                <Card
                  title={category.name}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "10px",
                    backgroundColor:
                      selected === category.name
                        ? "lightgreen"
                        : child_category.includes(category.name)
                        ? "yellow"
                        : "lightpink",
                    // color: (selected === category.name ? "lightgreen" : "lightpink"),
                  }}
                  onClick={() => {
                    setSelected(category.name);
                    getChildCategories(category.name);
                  }}
                >
                  <CategoryEdit
                    category={category}
                    getCategories={getCategories}
                    deleteCategory={deleteCategory}
                  />
                  {/* <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <DeleteOutlined
                      onClick={() => deleteCategory(category._id)}
                    />
                    <EditOutlined onClick={()=>setShowCatEdit(true)} />
                  </div> */}
                  {/* {showCatEdit && (
                    <div>
                      <Input
                        placeholder="Category Name"
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                      />
                      <Input
                        placeholder="Category Description"
                        value={catDescription}
                        onChange={(e) => setCatDescription(e.target.value)}
                      />

                      <Button
                        type="primary"
                        onClick={() => {
                          editCategory(category._id);
                          setShowCatEdit(false);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  )} */}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          margin: "2vw",
        }}
      >
        <h2>Products</h2>
        <div className="productsHolder">
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                setProducts={setProducts}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
