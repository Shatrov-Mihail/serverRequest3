import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useDeleteCase = ({setError}) => {
	const deleteCase = (id) => {
		const deleteCaseDbRef = ref(db, `case/${id}`);
		remove(deleteCaseDbRef)
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Не удалось удалить задачу. Попробуйте еще раз.");
      });
  };

  return deleteCase;
};