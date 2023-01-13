import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../scss/components/Pagination";

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(1);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const pizzaItems = pizzas
    // .filter((pizza) =>
    //   pizza.name.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const skeletonItems = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  React.useEffect(() => {
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue.length > 0 ? `&search=${searchValue}` : "";
    setIsLoading(true);

    fetch(
      `https://63bd18d2d66006238899fbe8.mockapi.io/items?page=${currentPage}&limit=4&${`${category}`}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(id) => setCategoryId(id)}
          />
          <Sort value={sortType} onClickSort={(item) => setSortType(item)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading ? skeletonItems : pizzaItems}
        </div>

        <Pagination
          onChangePage={(number) => {
            setCurrentPage(number);
          }}
        />
      </div>
    </>
  );
};

export default Home;
