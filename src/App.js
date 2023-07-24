import { useEffect, useState } from "react";
import { GetCurrencies } from "./Api/common/ListOfAvailable";
import { GetEstimatedExchangeAmount } from "./Api/floating-rate/EstimatedExchange";
import { GetMinimalExChangeAmount } from "./Api/floating-rate/MinimalExchange";
import Button from "./components/common/Button";
import Input from "./components/common/Input";
import InputExchange from "./components/InputExchange";
import SwapIcon from "./assets/Swap.svg";

function App() {
  const DASH = " - ";
  const [list, setList] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState(undefined);
  const [minAmount, setMinAmount] = useState(undefined);
  const [currencyTo, setCurrencyTo] = useState(undefined);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (+amountFrom > 0 && amountTo !== DASH) {
      setIsDisable(false);
    }
  }, [amountFrom, amountTo]);

  useEffect(() => {
    GetCurrencies()
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setCurrencyFrom(data[0]);
        setCurrencyTo(data[1]);
      });
  }, []);

  useEffect(() => {
    if (currencyFrom?.ticker && currencyTo?.ticker) {
      GetMinimalExChangeAmount(currencyFrom.ticker, currencyTo.ticker)
        .then((res) => res.json())
        .then((data) => {
          setAmountFrom(data.minAmount);
          setMinAmount(data.minAmount);
        });
    }
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    if (currencyFrom?.ticker && currencyTo?.ticker && amountFrom !== "") {
      if (+amountFrom >= minAmount) {
        GetEstimatedExchangeAmount(
          currencyFrom.ticker,
          currencyTo.ticker,
          amountFrom
        )
          .then((res) => res.json())
          .then((data) => {
            setAmountTo(data.estimatedAmount);
          });
      } else {
        setAmountTo(DASH);
        setIsDisable(true);
      }
    }
  }, [amountFrom]);

  useEffect(() => {
    if (+amountFrom < minAmount) {
      setAmountTo(DASH);
      setIsDisable(true);
    }
  }, [amountFrom]);

  const reverseItems = () => {
    if (currencyFrom && currencyTo) {
      const tempFrom = currencyFrom;
      const tempTo = currencyTo;

      setCurrencyFrom(tempTo);
      setCurrencyTo(tempFrom);
    }
  };

  return (
    <>
      <div className="bg-white w-full h-screen">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          <section aria-labelledby="details-heading">
            <div className="flex flex-col justify-start items-start gap-5 font-light">
              <div className="text-5xl leading-10 font-extralight">
                Crypto Exchange
              </div>
              <div className="text-xl leading-5">Exchange fast and easy</div>
            </div>

            <div className="mt-16 w-full flex gap-y-16 lg:flex-row flex-col lg:justify-between ">
              <div className="flex w-full lg:w-1/2 h-10 justify-center text-base items-center relative rounded bg-gray-100 border-gray-300">
                <InputExchange
                  list={list}
                  currentItem={currencyFrom}
                  setCurrentItem={setCurrencyFrom}
                  currencyAmount={amountFrom}
                  setCurrencyAmount={setAmountFrom}
                />
              </div>
              <button
                className="flex px-5 justify-end lg:justify-center items-end lg:items-center cursor-pointer "
                onClick={reverseItems}
              >
                <div className="rotate-90 lg:rotate-0">
                  <img src={SwapIcon} alt="swap icon" />
                </div>
              </button>

              <div className="flex w-full lg:w-1/2 h-10 justify-center text-base items-center relative rounded bg-gray-100 border-gray-300">
                <InputExchange
                  setCurrentItem={setCurrencyTo}
                  list={list}
                  currentItem={currencyTo}
                  currencyAmount={amountTo}
                  setCurrencyAmount={setAmountTo}
                />
              </div>
            </div>
            <div className="w-full mt-10 text-base">
              <div>
                <label className="block  leading-6 text-gray-900  font-light text-base">
                  Your Ethereum address
                </label>
                <div className="mt-5 flex flex-col lg:flex-row gap-5 items-center">
                  <Input type="text" />
                  <Button text="exchange" isDisable={isDisable} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
