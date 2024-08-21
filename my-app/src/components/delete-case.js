import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useDeleteCase = () => {
	const deleteCase = (id) => {
		const deleteCaseDbRef = ref(db, `case/${id}`);
		remove(deleteCaseDbRef);
	  };
	  return deleteCase
}