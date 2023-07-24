function Button({ text, isDisable }) {
  return (
    <>
      <button
        type="button"
        className={`uppercase font-light rounded-md w-full lg:w-1/5 px-3.5 py-2.5 text-sm text-white shadow-sm ${
          isDisable
            ? "bg-[#11B3FE] cursor-not-allowed "
            : "bg-[#0095E0] cursor-pointer  hover:bg-sky-600"
        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500`}
      >
        {text}
      </button>
      {isDisable && (
        <p className="text-red-700 text-xs text-center">
          This pair is disabled now
        </p>
      )}
    </>
  );
}

export default Button;
