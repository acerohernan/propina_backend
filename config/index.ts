import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const CONFIG = {
  port: process.env.PORT,
  dbUri: process.env.DB_CONNECTION,
};

export default CONFIG;
