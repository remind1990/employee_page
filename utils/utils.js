export function changeDatabaseInConnectionString(
  connectionString,
  newDatabaseName
) {
  return connectionString.replace(/myProject/g, newDatabaseName);
}
