import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const CONFIG = {
  url: process.env.URL,
  port: process.env.PORT,
  dbUri: process.env.DB_CONNECTION,
};

export default CONFIG;
