import { ref, set } from "firebase/database";
import { db } from "../firebase";

export const useUpdateCase = ({newCase, setObjCase, setNewCase, setError}) => {
	const updateCase = (id) => {
		const updateCaseDbRef = ref(db, `case/${id}`);
		set(updateCaseDbRef, newCase)
		.then(() => {
		  setObjCase((prevCases) => ({
			...prevCases,
			[id]: { ...prevCases[id], ...newCase },
		  }));
		  setNewCase({ name: "" });
		  setError(null);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Не удалось обновить задачу. Попробуйте еще раз.");
      });
  };
  

  return updateCase;
};