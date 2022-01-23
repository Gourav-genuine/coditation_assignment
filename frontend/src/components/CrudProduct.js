import React, {useState, } from "react";
import { Button, Input } from "antd";
import axios from "axios";

const CrudProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const baseUrl = "http://localhost:8082/api/";

  const addProduct = async () => {
    const response = await axios.post(baseUrl + "products", {
      name: productName,
      cost: productPrice,
      description: productDescription,
      category: productCategory,
    });
    props.update(response);
    // setProducts(response.data);
    console.log(response.data);
  };

  
  

  return (
    <div>
    <Input placeholder="Product Name" onChange={(e)=> setProductName(e.target.value)} />
      <Input placeholder="Product Price" onChange={(e)=> setProductPrice(e.target.value)}/>
      <Input placeholder="Product Description" onChange={(e)=> setProductDescription(e.target.value)}/>
      <Input placeholder="Product Category" onChange={(e)=> setProductCategory(e.target.value)}/>
      <Button type="primary" onClick={()=>addProduct()}>Add Product</Button>
    </div>
  );
};

export default CrudProduct;
