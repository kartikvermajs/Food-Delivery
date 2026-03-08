import { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { Loader2 } from "lucide-react";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 750);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const filteredList = food_list.filter((item) => category === "All" || category === item.category);

  const displayList = isMobile
    ? filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredList;

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const scrollToTop = () => {
    const element = document.getElementById("food-display");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {food_list.length === 0 ? (
          <div className="list-loader-container">
            <Loader2 className="spinning-loader" size={50} color="#E23744" />
          </div>
        ) : (
          displayList.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        )}
      </div>
      {isMobile && totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;