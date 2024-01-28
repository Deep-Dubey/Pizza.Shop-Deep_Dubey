import { useRef } from "react";
import { FcNext } from "react-icons/fc";
import { HiEmojiSad } from "react-icons/hi";

function Cards(data) {
  const moveToNext = (id) => {
    const states = ["placed", "baked", "ready", "picked"];
    let pizzaData = data.pizzaData;
    let results = [];
    pizzaData.forEach((localData) => {
      if (localData.orderId == id) {
        const current_state = localData.state_id;
        const current_state_index = states.indexOf(current_state);
        if (current_state_index < 3) {
          const next_state = states[current_state_index + 1];
          localData.state_id = next_state;
          if (localData.state_id == "baked")
            localData.state =
              "Order is being " +
              next_state.charAt(0).toUpperCase() +
              next_state.slice(1);
          else if (localData.state_id == "ready");
          localData.state =
            "Order is " +
            next_state.charAt(0).toUpperCase() +
            next_state.slice(1);
        } else {
          localData.state_id = "picked";
          localData.state = "Order is Picked.";
        }
      }
      results.push(localData);
    });
    data.pizzaHandler(results);
  };

  const cancelOrders = (id) => {
    console.log("Order ID: " + id.toString());
    let pizzaData = data.pizzaData;
    pizzaData = pizzaData.filter((localData) => localData.orderId != id);
    console.log(pizzaData);
    data.pizzaHandler(pizzaData);
  };

  let results = [];
  data.pizzaData.map((localdata, index) => {
    if (data.order_type == localdata.state_id) {
      results.push(
        <div class="h-56 p-6 w-full bg-gray-100 border border-gray-200 rounded-lg shadow overflow-hidden">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              ORDER ID: {localdata.orderId}
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 text-xl">
            {localdata.startTime + localdata.timeToPrepare + 1 - Date.now() < 0
              ? "Order is being delayed by " +
                (Math.round(
                  (Date.now() -
                    (localdata.startTime + localdata.timeToPrepare + 1)) /
                    60000
                ).toString() +
                  " Minutes")
              : Math.round(
                  ((Date.now() -
                    (localdata.startTime +
                      (localdata.timeToPrepare + 1) * 60000)) *
                    -1) /
                    60000
                ).toString() + " Minutes Left to prepare the Pizza"}
          </p>
          {localdata.state_id == "picked" ? (
            <h3 className="text-xl font-bold mb-2 whitespace-nowrap">
              Order is completed successfully
            </h3>
          ) : (
            <br />
          )}
          <div className="flex justify-between items-center">
            <a
              href="#"
              onClick={() => {
                cancelOrders(localdata.orderId);
              }}
              class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-400 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              {localdata.state_id == "picked" ? "Remove Order" : "Cancel Order"}
            </a>
            {localdata.state_id == "picked" ? null : (
              <a
                href="#"
                onClick={() => {
                  moveToNext(localdata.orderId);
                }}
                class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Move to Next
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
            )}
          </div>
        </div>
      );
    }
  });
  if (results.length > 0) {
    return results;
  } else {
    return <h4>No Orders are in this state.</h4>;
  }
}

export default function Orders(props) {
  console.log("Mounted!!!");
  if (props.pizzaData.length < 1) {
    return (
      <div className="h-screen flex justify-start items-center flex-col pt-96">
        <p className="text-7xl font-bold text-gray-800 flex">
          NO ORDERS AAILABLE.
          <span>
            <HiEmojiSad />
          </span>
        </p>
        <p className="text-3xl text-center text-gray-500">
          There are no orders in the Bucket.
          <br /> Please place a order.
        </p>
      </div>
    );
  }
  return (
    <div className=" h-auto w-screen px-40 space-y-12">
      <p className="text-gray-700 text-2xl">Here are your all the Orders...</p>
      <div className="w-full h-auto flex space-x-6 relative">
        <div className="w-1/4 border relative">
          <h3 className="text-xl font-bold border-b p-4 ">Order Placed</h3>
          <div className="w-full p-4 space-y-4">
            <Cards
              pizzaData={props.pizzaData}
              pizzaHandler={props.pizzaDataHandler}
              order_type="placed"
            />
          </div>
        </div>
        <div className="w-1/4 border">
          <h3 className="text-xl font-bold border-b p-4 ">Being Baked</h3>
          <div className="w-full p-4 space-y-4">
            <Cards
              pizzaData={props.pizzaData}
              pizzaHandler={props.pizzaDataHandler}
              order_type="baked"
            />
          </div>
        </div>
        <div className="w-1/4 border">
          <h3 className="text-xl font-bold border-b p-4 ">Order Ready</h3>
          <div className="w-full p-4 space-y-4">
            <Cards
              pizzaData={props.pizzaData}
              pizzaHandler={props.pizzaDataHandler}
              order_type="ready"
            />
          </div>
        </div>
        <div className="w-1/4 border">
          <h3 className="text-xl font-bold border-b p-4 ">Order Picked</h3>
          <div className="w-full p-4 space-y-4">
            <Cards
              pizzaData={props.pizzaData}
              pizzaHandler={props.pizzaDataHandler}
              order_type="picked"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
