import { Request, Response, Router, NextFunction } from "express";
// import cache from '../middlewears/rediscache'

//import cache from "../middlewears/cache";

const redis = require('redis');
const fetch = require('node-fetch');



const testConnection = async (username, repos) => {
  console.log("inside test func")
  const client = redis.createClient();
  client.on('ready', (success) => console.log('Connected', success));
  // client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  await client.HSET(username, 3600, repos);
  console.log("After set data");
  console.log("after connecting ")

};







const cache = async  (req: Request, res: Response, next: NextFunction) => {


  try {
  const { username } = req.body;
  ///let hashKey = new Buffer.from(`${username}`).toString("base64");
  console.log("cache")
 const client = redis.createClient();
  client.on('ready', (success) => console.log('Connected', success));
  // client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();
 
  
  console.log("after connecting ");
  console.log(typeof username);
  console.log(username)
 
  

   //const res= await client.HGET(username);
  


     const redisData= await client.HGETALL(username,function(err, data) {
     
      if (err) throw err;
    console.log("before condition");
    console.log(data)
      if (data !== null) {
          console.log("is not equal null");
        return res.status(200).json(data);
      } else if(data.username==username){
        return " data is same "

        
      }else{
        next();
      }
    });

    console.log("after HGET ")
  //  await client.HGET(username, (err, data) => {
  //   if (err) throw err;

  //   if (data !== null) {
  //     return res.status(200).json(data);
  //   } else {
  //     next();
  //   }
  // });

next();
} catch (err) {
  console.error(err);
  res.status(500);
}
};



const getUsers = async (req: Request, res: Response) => {

  try {
    console.log('Fetching Data From Users...');

    const { username } = req.body;
    console.log("UserName Is ", username);

    
    const response = await fetch(`http://api.github.com/users/${username}`);
     
    const data = await response.json();
    console.log("inside test func")
    const client = redis.createClient();
     client.on('ready', (success) => console.log('Connected', success));
     // client.on('error', (err) => console.log('Redis Client Error', err));
   
    await client.connect();
     await client.HSET(username, 3600, JSON.stringify(data));
     console.log("After set data");
     console.log("after connecting ")
  
return res.status(200).json(data);

  
    // console.log("fetching Users")
    // console.log(data)
    // console.log("inside test func")
    // const client = redis.createClient();
    // client.on('ready', (success) => console.log('Connected', success));
    // await client.connect();
    // await client.HSET(username, 3600, JSON.stringify(data));
    // console.log("After set data");
    // console.log("after connecting ")

    // return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500);
  }
};


const clearCache = async (_: Request, res: Response) => {

  try {


    const client = redis.createClient();
    client.on('ready', (success) => console.log('Connected', success));
    // client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.FLUSHDB();
    console.log("delete Cached");
    return res.status(200).json();

  } catch (err) {
    console.error(err);
    res.status(500);
  }
};


const router = Router();
// router.get("/repo/:username", cache, getRepos)
router.put("/", cache, getUsers)
router.delete("/", clearCache)




export default router;