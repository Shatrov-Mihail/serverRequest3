import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import styles from "./app.module.css";
import { InputNewCase, InputSearch, ListCaseButton } from "./return";
import {
  useAddNewCase,
  useDeleteCase,
  useObjCaseToArray,
  useUpdateCase,
} from "./components";

export const App = () => {
  const [objCase, setObjCase] = useState({});
  const [isSorted, setIsSorted] = useState(false);
  const [searchCase, setSearchCase] = useState("");
  const [error, setError] = useState(null)

  useEffect(() => {
    const caseDbRef = ref(db, "case");
    const unsubscribe = onValue(caseDbRef, (snapshot) => {
		const loadedCase = snapshot.val() || {};
		setObjCase(loadedCase);
	  }, (error) => {
		console.error("Error:", error);
		setError("Не удалось загрузить данные. Попробуйте еще раз.");
	  });

	  return () => unsubscribe();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newCase.id) {
		  updateCase(newCase.id);
		} else {
		  addNewCase();
		}
	  };

  const { addNewCase, newCase, setNewCase } = useAddNewCase({
    setObjCase, setError
  });

  const deleteCase = useDeleteCase({setError});

  const updateCase = useUpdateCase({ newCase, setObjCase, setNewCase, setError });

  const objCaseToArray = useObjCaseToArray({ objCase, searchCase });

  const filteredCase = objCaseToArray();

  const sortedCase = isSorted
    ? filteredCase.sort((a, b) => a.name.localeCompare(b.name))
    : filteredCase;

  return (
    <div className={styles.app}>
      <InputSearch
        isSorted={isSorted}
        searchCase={searchCase}
        setIsSorted={setIsSorted}
        setSearchCase={setSearchCase}
      />

      <InputNewCase
        newCase={newCase}
        setNewCase={setNewCase}
		handleSubmit={handleSubmit}
      />

      <h1 className={styles.header}>Список дел</h1>

      <ListCaseButton
        sortedCase={sortedCase}
        deleteCase={(deleteCase)}
        updateCase={updateCase}
		setNewCase={setNewCase}
      />
    </div>
  );
};

export default App;
