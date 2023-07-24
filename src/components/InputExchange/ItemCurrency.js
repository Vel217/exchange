function ItemCurrency({ item, selectItem, setIsOpen }) {
  const click = () => {
    setIsOpen(false);
    selectItem(item);
  };
  return (
    <div
      onClick={click}
      className="cursor-pointer h-10 flex items-center gap-5 bg-neutral-100 hover:bg-slate-100 px-5 "
    >
      <img className="w-5" src={`${item.image}`} alt={`${item.name}`} />
      <p className="w-32">{item.ticker.toUpperCase()}</p>
      <p className="text-slate-400 grow"> {item.name}</p>
    </div>
  );
}

export default ItemCurrency;
