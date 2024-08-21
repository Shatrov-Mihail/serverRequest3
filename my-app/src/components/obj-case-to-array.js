export const useObjCaseToArray = ({ objCase, searchCase }) => {
  const objCaseToArray = () => {
    return Object.entries(objCase)
      .map(([key, { name }]) => ({
        id: key,
        name,
      }))
      .filter((caseItem) =>
        caseItem.name.toLowerCase().includes(searchCase.toLowerCase())
      );
  };
  return objCaseToArray;
};
