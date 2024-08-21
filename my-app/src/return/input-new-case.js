export const InputNewCase = ({ newCase, setNewCase, addNewCase }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Новая задача..."
        value={newCase.name}
        onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
      />
      <button onClick={addNewCase}>Добавить</button>
    </div>
  );
};
