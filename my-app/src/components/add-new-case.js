import { ref, push } from "firebase/database";
import { db } from "../firebase";
import { useState } from "react";

export const useAddNewCase = ({setObjCase, setError}) => {
	const [newCase, setNewCase] = useState({ name: ""});

 const addNewCase = () => {
    const caseDbRef = ref(db, "case");

    push(caseDbRef, newCase)
	.then((response) => {
      const addedCase = { id: response.key, ...newCase };
      setObjCase((prevCase) => ({ ...prevCase, [addedCase.id]: addedCase }));
      setNewCase({ name: "" });
	  setError(null)
    })
	.catch((err) => {
		console.error('Error:', err)
		setError('Не удолось добавить новую задачу. Попробуйте ещё раз.')
	})
  };
  return {
	addNewCase,
	newCase,
	setNewCase,
  }
};
