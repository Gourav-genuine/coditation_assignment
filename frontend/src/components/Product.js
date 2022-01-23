import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import axios from "axios";
import { DownOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
const Product = (props) => {
  const { product } = props;

  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.cost);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [productCategory, setProductCategory] = useState(product.category);

  const [showEdit, setShowEdit] = useState(false);

  const baseUrl = "http://localhost:8082/api/";

  const deleteProduct = async (id) => {
    const response = await axios.delete(baseUrl + "products?id=" + id);
    const products = await axios.get(baseUrl + "products");
    props.setProducts(products.data);
    console.log(response);
  };

  const editProduct = async (id) => {
    const response = await axios.put(baseUrl + "products", {
      id: id,
      name: productName,
      cost: productPrice,
      description: productDescription,
      category: productCategory,
    });
    const products = await axios.get(baseUrl + "products");
    props.setProducts(products.data);
    console.log(response);
  };

  return (
    <Card
      title={product.name}
      id="productCard"
      bordered={false}
      style={{ width: 200 }}
    >
      <p>Cost : ${product.cost}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <DeleteOutlined onClick={() => deleteProduct(product._id)} />
        <EditOutlined onClick={()=>setShowEdit(true)} />
      </div>

      {showEdit && (
        <div>
          <Input
            placeholder="Product Name"
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            placeholder="Product Price"
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <Input
            placeholder="Product Description"
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <Input
            placeholder="Product Category"
            onChange={(e) => setProductCategory(e.target.value)}
          />
          <Button type="primary" onClick={() => {
            editProduct(product._id);
            setShowEdit(false);
          }}>
            Save
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Product;
