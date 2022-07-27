import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const CONFIG = {
  url: process.env.URL,
  port: process.env.PORT,
  dbUri: process.env.DB_CONNECTION,
  privateKey: process.env.JWT_PRIVATE_KEY,
  publicKey: process.env.JWT_PUBLIC_KEY,
  bcryptSalt: process.env.SALT,
};

export default CONFIG;
