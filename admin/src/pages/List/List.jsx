import { useEffect, useState } from "react";
import "./List.css";
import axios from 'axios';
import { toast } from "react-toastify";
import api from "../../utils/api";

const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await api.get(`/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      // Handled globally
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await api.post(`/api/food/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      // Handled globally
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
