import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import ItemCurrency from "./ItemCurrency";
import ArrowDownIcon from "../../assets/ArrowDown.svg";
import CloseIcon from "../../assets/Close.svg";

function InputExchange({
  list,
  setCurrentItem,
  currentItem,
  setCurrencyAmount,
  currencyAmount,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const openSelect = () => {
    setIsOpen(true);
  };
  const closeSelect = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setFilteredList(list);
  }, [list]);
  const filterFunction = (value) => {
    setInputSearch(value);
    const filtered = list.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  };

  return (
    <>
      {!isOpen ? (
        <>
          <input
            type="text"
            value={currencyAmount}
            className="block w-2/3 border px-3 outline-none border-gray-300 border-1 border-r-0  rounded-l h-10  bg-neutral-100 py-1.5 text-gray-900  placeholder:text-gray-400"
            onChange={(e) => setCurrencyAmount(e.target.value)}
          />
          <div className="w-[1px] h-5 bg-gray-300"></div>
          <div
            onClick={openSelect}
            className="flex w-1/3 cursor-pointer justify-between rounded-r border-gray-300  bg-neutral-100 border-1 border border-l-0 py-1.5 px-2 text-gray-900 h-10"
          >
            <button className="flex w-full gap-3 uppercase items-center justify-center bg-neutral-100 ">
              {!!currentItem?.image && (
                <img src={`${currentItem.image}`} alt={`${currentItem.name}`} />
              )}
              {currentItem?.ticker}
            </button>
            <img className="w-6" src={ArrowDownIcon} alt="arrow down icon" />
          </div>
        </>
      ) : (
        <div className="flex w-full justify-between ">
          <input
            type="text"
            className="block w-11/12 outline-none bg-neutral-100 h-10 py-1.5 pl-3 border border-r-0 border-b-0 border-slate-300 rounded-tl text-gray-900  placeholder:text-gray-400 "
            placeholder="Search.."
            onChange={(e) => filterFunction(e.target.value)}
          />
          <div className="w-1/12 flex justify-center items-center border border-l-0 border-b-0 border-slate-300 rounded-tr">
            <button className="w-6 ml-3" onClick={closeSelect}>
              <img src={CloseIcon} alt="arrow down icon" />
            </button>
          </div>

          <div className="absolute top-[37px] left-0 z-30 bg-white w-full h-32 overflow-y-scroll rounded-b border border-slate-300">
            {filteredList.length > 0 ? (
              <>
                {filteredList.map((item, index) => (
                  <ItemCurrency
                    key={index}
                    item={item}
                    selectItem={setCurrentItem}
                    setIsOpen={setIsOpen}
                  />
                ))}
              </>
            ) : (
              <EmptyState setIsOpen={setIsOpen} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default InputExchange;
