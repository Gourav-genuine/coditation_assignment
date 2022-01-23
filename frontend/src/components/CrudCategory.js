import React, {useState, useEffect} from 'react'
import { Button, Input } from "antd";
import axios from "axios";

const CrudCategory = (props) => {

    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [products, setProducts ] = useState([]);
    const [parent_Category, setParentCategory ] = useState("");
    // const [child_categories, setChildCategories] = useState([]);

    const baseUrl = "http://localhost:8082/api/";

    const addChildCategory = async () => {
        const response = await axios.post(baseUrl + "categories/addChild", {
            name: categoryName,
            description: categoryDescription,
            parent_category: parent_Category,
            // child_categories: child_categories,
            // products: products
        });
        props.update(response);
        setCategoryDescription("");
        setCategoryName("");
        setParentCategory("");
        console.log(response.data);
    };

    const addCategory = async () => {
        const response = await axios.post(baseUrl + "categories", {
            name: categoryName,
            description: categoryDescription,
        });
        props.update(response);
        setCategoryDescription("");
        setCategoryName("");
        console.log(response.data);
    };

    

    return (
        <>
        <div>
            <Input placeholder="Category Name" onChange={(e)=> setCategoryName(e.target.value)} />
            <Input placeholder="Category Description" onChange={(e)=> setCategoryDescription(e.target.value)}/>
            {/* <Input placeholder="Parent Category" onChange={(e)=> setParentCategory(e.target.value)}/> */}

            <Button type="primary" onClick={()=>addCategory()}>Add Category</Button>
        </div>
        <div>
            <Input placeholder="Category Name" onChange={(e)=> setCategoryName(e.target.value)} />
            <Input placeholder="Category Description" onChange={(e)=> setCategoryDescription(e.target.value)}/>
            <Input placeholder="Parent Category" onChange={(e)=> setParentCategory(e.target.value)}/>

            <Button type="primary" onClick={()=>addChildCategory()}>Add Child Category</Button>
        </div>
        </>
    )
}

export default CrudCategory
