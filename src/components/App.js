import "./../styles/App.css";
import styled from "styled-components";
import { GiPizzaSlice } from "react-icons/gi";
import { FcDonate } from "react-icons/fc";
import { HiEmojiSad } from "react-icons/hi";
import Neworder from "./new";
import Orders from "./Orders";
import { useState } from "react";

const Background = styled.div`
  background: #fdfdfd;
`;

function PizzaCards(props) {
  let deliveryCount = 0;
  props.pizzaData.map((data) =>
    data.state_id.toUpperCase() == "PICKED"
      ? (deliveryCount += 1)
      : (deliveryCount += 0)
  );
  return (
    <div>
      <p className="text-3xl my-6 mx-24 text-gray-700">
        Total Pizzas delivered: {deliveryCount}
      </p>
      <div className="my-24 mx-auto w-5/6 flex align-center flex-wrap justify-center">
        {props.pizzaData.map((data, index) => {
          console.log(data);
          return (
            <div class="h-48 p-6 w-96 mx-3 my-3 bg-gray-100 border border-gray-200 rounded-lg shadow ">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  ORDER ID: {data.orderId}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 text-xl">
                {data.startTime + data.timeToPrepare + 1 - Date.now() < 0
                  ? "Order is being delayed by " +
                    (Math.round(
                      (Date.now() - (data.startTime + data.timeToPrepare + 1)) /
                        60000
                    ).toString() +
                      " Minutes")
                  : Math.round(
                      ((Date.now() -
                        (data.startTime + (data.timeToPrepare + 1) * 60000)) *
                        -1) /
                        60000
                    ).toString() + " Minutes Left to prepare the Pizza"}
              </p>
              <div className="flex justify-between items-center">
                <p>STATUS: {data.state}</p>
                <a
                  onClick={() => {
                    props.orders(true);
                  }}
                  href="#"
                  class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View More
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [newPizza, updateNewPiza] = useState(false);
  const [pizzaDetails, updatePizzaDetails] = useState([]);
  const [showOrders, updateShowOrders] = useState(false);

  const handler = () => {
    updateNewPiza(true);
  };

  const ordersHandler = () => {
    updateShowOrders(!showOrders);
    updateNewPiza(false);
  };

  return (
    <Background>
      <div className="Main relative block w-full h-full">
        <header className="header w-full px-20 py-12 flex justify-between">
          <div className="text-3xl flex space-x-6">
            <span className="block text-6xl text-amber-700">
              <GiPizzaSlice />
            </span>
            <p className="flex flex-col">
              <span>Pizza.Shop</span>
              <span className="text-lg -pt-2 text-gray-600">
                Get you pizzas right here.
              </span>
            </p>
          </div>
          <div>
            <ul className="text-xl flex space-x-10 items-center">
              <li
                className="text-gray-800 hover:bg-amber-300 hover:shadow-md hover:text-amber-800 hover:font-bold cursor-pointer px-4 py-2 transition-all"
                onClick={() => {
                  updateShowOrders(false);
                }}
              >
                <a href="#">Home</a>
              </li>
              <li
                className="text-gray-800 hover:bg-amber-300 hover:shadow-md hover:text-amber-800 hover:font-bold cursor-pointer px-4 py-2 transition-all"
                onClick={handler}
              >
                <a href="#">Get a Pizza</a>
              </li>
              <li
                className="text-gray-800 hover:bg-amber-300 hover:shadow-md hover:text-amber-800 hover:font-bold cursor-pointer px-4 py-2 transition-all"
                onClick={ordersHandler}
              >
                <a href="#">Orders</a>
              </li>
            </ul>
          </div>
        </header>
        <div className="body">
          {newPizza ? (
            <Neworder
              pizzaHandler={updateNewPiza}
              pizzaDataHandler={updatePizzaDetails}
              pizzaData={pizzaDetails}
            />
          ) : pizzaDetails.length > 0 && !showOrders ? (
            <PizzaCards pizzaData={pizzaDetails} orders={updateShowOrders} />
          ) : showOrders ? (
            <Orders
              pizzaDataHandler={updatePizzaDetails}
              pizzaData={pizzaDetails}
            />
          ) : (
            <div className="h-screen flex justify-start items-center flex-col pt-96">
              <p className="text-7xl font-bold text-gray-800 flex">
                NO ORDERS.
                <span>
                  <HiEmojiSad />
                </span>
              </p>
              <p className="text-3xl text-center text-gray-500">
                There are no orders in the Bucket.
                <br /> Please place a order.
              </p>
            </div>
          )}
        </div>
      </div>
    </Background>
  );
}

export default App;
