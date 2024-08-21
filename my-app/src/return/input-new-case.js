import React, { useEffect, useRef } from "react";

export const InputNewCase = ({
  newCase,
  setNewCase,
  handleSubmit,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (newCase.name) {
      inputRef.current.focus();
    }
  }, [newCase]);


  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Новая задача..."
        value={newCase.name}
        onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
      />
      <button type="submit">{newCase.id ? "Изменить" : "Добавить"}</button>
    </form>
  );
};
