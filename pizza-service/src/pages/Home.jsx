import React from "react";

import axios from "axios";
import qs from "qs";

import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sortTypes } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../scss/components/Pagination";

import { SearchContext } from "../App";

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = React.useContext(SearchContext);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(1);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzaItems = pizzas.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletonItems = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortTypes.find(
        (obj) => obj.sortProperty === params.sortType
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, []);

  const fetchPizzas = () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue.length > 0 ? `&search=${searchValue}` : "";
    setIsLoading(true);

    axios
      .get(
        `https://63bd18d2d66006238899fbe8.mockapi.io/items?page=${currentPage}&limit=4&${`${category}`}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    isSearch.current = true;
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (isSearch) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading ? skeletonItems : pizzaItems}
        </div>

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
