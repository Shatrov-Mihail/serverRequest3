import styles from "./list-case-button.module.css";

export const ListCaseButton = ({sortedCase, deleteCase, updateCase, setNewCase}) => {
	const handleUpdateClick = (caseData) => {
		setNewCase(caseData);
	  };

	  return (
		<ul className={styles.list}>
		  {sortedCase.map(({ id, name }) => (
			<li key={id} className={styles.listItem}>
			  {name}
			  <div className={styles.buttonList}>
				<button onClick={() => deleteCase(id)}>🗑</button>
				<button onClick={() => handleUpdateClick({ id, name })}>✐</button>
			  </div>
			</li>
		  ))}
		</ul>
	  );
	};
