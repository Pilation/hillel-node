export const prepareMigrationData = ({ fileName, count, timestamp }) => {
  return {
    fileName,
    importedCount: count,
    importedAt: timestamp,
  };
};
