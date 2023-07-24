import React from "react";

function EmptyState(setIsOpen) {
  return (
    <div
      onClick={() => setIsOpen(false)}
      className=" h-10 flex items-center gap-5 bg-neutral-100 hover:bg-slate-100 px-5 "
    >
      <p className="text-slate-400 grow">
        This currency was not found, please try another
      </p>
    </div>
  );
}

export default EmptyState;
