import * as dotenv from "dotenv";
dotenv.config({path: `.env.${process.env.NODE_ENV}`});

const CONFIG = {
    port: process.env.PORT
}

export default CONFIG;