//connect to db and start server
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestauranstDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

//connect to db
MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  {
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
  }
)
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})
.then(async (client,conn) =>{
  await RestauranstDAO.injectDB(client)
  await ReviewsDAO.injectDB(client)
  app.listen(port, () => {
  console.log(`listening on port ${port}`)
  })
})

