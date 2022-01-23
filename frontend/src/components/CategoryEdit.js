import React, {useState} from "react";
import axios from "axios";
import { Menu, Dropdown, Button, Space, Card, Input } from "antd";
import { DownOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
const CategoryEdit = (props) => {
  const { category } = props;
  const [showCatEdit, setShowCatEdit] = useState(false);
    const [catName, setCatName] = useState(category.name);
    const [catDescription, setCatDescription] = useState(category.description); 
    const baseUrl = "http://localhost:8082/api/";



  const editCategory = async (id) => {
    const response = await axios.put(baseUrl + "categories", {
      id: id,
      name: catName,
      description: catDescription,
    });
    props.getCategories();
}
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <DeleteOutlined onClick={() => props.deleteCategory(category._id)} />
        <EditOutlined onClick={() => setShowCatEdit(true)} />
      </div>
      {showCatEdit && (
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
      )}
    </>
  );
};

export default CategoryEdit;
