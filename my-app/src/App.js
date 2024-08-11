import { useState, useEffect } from "react";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "./firebase";
import styles from "./app.module.css";

export const App = () => {
  const [objCase, setObjCase] = useState({});
  const [newCase, setNewCase] = useState({ name: "", title: "" });
  const [isSorted, setIsSorted] = useState(false);
  const [searchCase, setSearchCase] = useState("");

  useEffect(() => {
    const caseDbRef = ref(db, "case");

    return onValue(caseDbRef, (snapshot) => {
      const loadedCase = snapshot.val() || {};

      setObjCase(loadedCase);
    });
  }, []);

  const addNewCase = () => {
    const caseDbRef = ref(db, "case");

    push(caseDbRef, newCase).then((response) => {
      const addedCase = { id: response.key, ...newCase };
      setObjCase((prevCase) => ({ ...prevCase, [addedCase.id]: addedCase }));
      setNewCase({ name: "", title: "" });
    });
  };

  const deleteCase = (id) => {
    console.log(id);

    const deleteCaseDbRef = ref(db, `case/${id}`);
    remove(deleteCaseDbRef);
  };

  const updateCase = (id) => {
    const updateCaseDbRef = ref(db, `case/${id}`);
    set(updateCaseDbRef, newCase).then(() => {
      setObjCase((prevCases) => ({
        ...prevCases,
        [id]: { ...prevCases[id], ...newCase },
      }));
      setNewCase({ name: "", title: "" });
    });
  };

  const objCaseToArray = () => {
    return Object.entries(objCase)
      .map(([key, { name, title }]) => ({
        id: key,
        name,
        title,
      }))
      .filter(
        (caseItem) =>
          caseItem.name.toLowerCase().includes(searchCase.toLowerCase()) ||
          caseItem.title.toLowerCase().includes(searchCase.toLowerCase())
      );
  };

  const filteredCase = objCaseToArray();

  const sortedCase = isSorted
    ? filteredCase.sort((a, b) => a.name.localeCompare(b.name))
    : filteredCase;

  return (
    <div className={styles.app}>
      <div className={styles.headerSearch}>
        <button onClick={() => setIsSorted(!isSorted)}>
          {isSorted ? "Сбросить сортировку" : "Сортировать по алфавиту"}
        </button>

        <input
          type="text"
          placeholder="Поиск..."
          value={searchCase}
          onChange={(e) => setSearchCase(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Название нового дела"
          value={newCase.name}
          onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Описание нового дела"
          value={newCase.title}
          onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
        />
        <button onClick={addNewCase}>Добавить</button>
      </div>

      <h1 className={styles.header}>Список дел</h1>

      <ul className={styles.list}>
        {sortedCase.map(({ id, name, title }) => (
          <li key={id} className={styles.listItem}>
            {name}. {title}
            <div className={styles.buttonList}>
              <button onClick={() => deleteCase(id)}>Удалить</button>
              <button onClick={() => updateCase(id)}>Изменить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
