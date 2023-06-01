export const createDatabaseConnection = ({ host, user, password, database, }) => {
    console.log(host, user, password, database)
    const knexConfig = {
        client: 'mysql2',
        connection: {
            host,
            user,
            password,
            database,
        },
    };
    return knexConfig;
};
