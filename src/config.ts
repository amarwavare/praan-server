import ALL_ENTITIES from "./db";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
const config:PostgresConnectionOptions = {
    type: 'postgres',
    port: 5432,
    username: "praan",
    password: "praan",
    database: "praandb",
    entities: ALL_ENTITIES,
    // host:'jdbc:postgresql://localhost:5432/postgres',
    synchronize: true,
};
export default config;