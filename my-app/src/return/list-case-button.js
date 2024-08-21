import styles from "./list-case-button.module.css";

export const ListCaseButton = ({sortedCase, deleteCase, updateCase}) => {
	return(
		<ul className={styles.list}>
	{sortedCase.map(({ id, name }) => (
		<li key={id} className={styles.listItem}>
		{name}
		<div className={styles.buttonList}>
		  <button onClick={() => deleteCase(id)}>🗑</button>
		  <button onClick={() => updateCase(id)}>✐</button>
		</div>
	  </li>
	))}
  </ul>
)
}