export const createAllStyleChildCallbacks = (effects, parentCallback) => {
  const totalCount = effects.length;
  let completedCount = 0;
  const results = [];
  const checkEnd = () => {
    if (totalCount === completedCount) {
      parentCallback(results);
    }
  };

  return effects.map((effect) => {
    return (res) => {
      completedCount++;
      results.push(res);
      checkEnd();
    };
  });
};
