import { Request, Response, Router, NextFunction } from "express";
const redis = require('redis');
const fetch = require('node-fetch');




const REDIS_PORT = 6379;

// Cache middleware
export default  async (req: Request, res: Response, next: NextFunction) => {


    try {
      const { username } = req.body;
      ///let hashKey = new Buffer.from(`${username}`).toString("base64");
      console.log("cache")
      const client = redis.createClient();
      client.on('ready', (success) => console.log('Connected', success));
      // client.on('error', (err) => console.log('Redis Client Error', err));
  
      await client.connect();
  
  
      console.log("after connecting ");
      // console.log(typeof username);
      console.log(username)
  
  
      await client.HGETALL( function (err, username) {
  
        if (err) throw err;
        console.log("before condition");
        console.log(username)
        if (username !== null) {
          console.log("is not equal null, heeeeeeeey");
          return res.status(200).json(username);
        } else {
          next();
        }
      });
  
      console.log("after HGET ")
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  };


