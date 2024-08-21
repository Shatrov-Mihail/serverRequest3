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

  useEffect(() => {
    const caseDbRef = ref(db, "case");

    return onValue(caseDbRef, (snapshot) => {
      const loadedCase = snapshot.val() || {};

      setObjCase(loadedCase);
    });
  }, []);

  const { addNewCase, newCase, setNewCase } = useAddNewCase({
    setObjCase,
  });

  const deleteCase = useDeleteCase();

  const updateCase = useUpdateCase({ newCase, setObjCase, setNewCase });

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
        addNewCase={addNewCase}
      />

      <h1 className={styles.header}>Список дел</h1>

      <ListCaseButton
        sortedCase={sortedCase}
        deleteCase={deleteCase}
        updateCase={updateCase}
      />
    </div>
  );
};

export default App;
