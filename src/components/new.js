import { useRef } from "react";
import { HiEmojiSad } from "react-icons/hi";

export default function CreateOrder(props) {
  const pizzaType = useRef();
  const pizzaBase = useRef();
  const pizzaSize = useRef();
  const clickHandler = (event) => {
    let data = props.pizzaData;
    if (data.length < 10) {
      const dataToUpdate = {
        orderId: data.length < 1 ? 101 : data[data.length - 1].orderId + 1,
        type: pizzaType.current.value,
        size: pizzaSize.current.value,
        base: pizzaSize.current.value,
        startTime: Date.now(),
        timeToPrepare: pizzaSize.current.value == "small" ? 3 : "large" ? 5 : 4,
        state: "Order Placed",
        state_id: "placed",
      };
      data.push(dataToUpdate);
      console.log(data);
      props.pizzaDataHandler(data);
      alert("Order is placed Successfully!!!");
    } else {
      alert("No Available slots for new Pizzas, Please wait for sometime.");
    }
    props.pizzaHandler(false);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-screen h-screen bg-white flex">
      <div className="flex flex-col justify-start items-start w-1/2 py-72 px-32">
        <p className="text-7xl font-bold text-gray-800 w-full text-left">
          PIZAA PIZAA PIZZA....
        </p>
        <p className="text-2xl text-gray-500 w-3/4 text-left mt-5">
          Get your fully customized pizzas right here. Please do check the
          customization options in here.
        </p>
      </div>
      <div className="w-1/2 flex justify-center align-center flex-col">
        <h3 className="text-3xl">Customize your Pizaa...</h3>
        <form className="mt-6 w-3/4 space-y-6">
          <select
            defaultValue={"veg"}
            id="type"
            ref={pizzaType}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option selected>Choose Pizza Type</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non Veg</option>
          </select>
          <div className="flex space-x-6">
            <select
              ref={pizzaSize}
              defaultValue={"large"}
              id="size"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Choose Pizza Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            <select
              id="base"
              defaultValue={"thick"}
              ref={pizzaBase}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Choose Pizza Base</option>
              <option value="thin">Thin</option>
              <option value="thick">Thick</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-gray-300 hover:bg-green-300 hover:text-green-900 px-4 py-2 text-xl rounded-md shadow-md"
              onClick={clickHandler}
            >
              Place order
            </button>
            <button
              className="bg-gray-300 hover:bg-red-300 hover:text-red-900 px-4 py-2 text-xl rounded-md shadow-md"
              onClick={() => {
                console.log(props);
                props.pizzaHandler(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
