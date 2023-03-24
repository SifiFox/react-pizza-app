import React from "react";

import qs from "qs";

import { Link, useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sortTypes } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useSelector, useDispatch } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

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
      isSearch.current = true;
    }
  }, []);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzaItems = items.map((pizza) => (
    <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
      <PizzaBlock {...pizza} />
    </Link>
  ));

  const skeletonItems = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const getPizzas = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue.length > 0 ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));

    isSearch.current = true;
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Список пустой</h2>
            <p>Вероятно не удалось загрузить список пицц, попробуйте позже</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletonItems : pizzaItems}
          </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
