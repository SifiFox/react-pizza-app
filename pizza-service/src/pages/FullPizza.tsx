import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63bd18d2d66006238899fbe8.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <React.Fragment>загрузка</React.Fragment>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.name}</h2>
      <p>ASDadm asd kasd asdkam sdlka lsdasd kadmaksdm las dkad askdm akdsm </p>
      <h4>250 p.</h4>
    </div>
  );
};

export default FullPizza;
