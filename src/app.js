const Koa = require('koa');
require("./utils/Prototype");

const app = new Koa();
const ImageResizeRoute = require('./routes/ImageResizeRoute');


app.use(ImageResizeRoute.routes()).use(ImageResizeRoute.allowedMethods());

app.listen(4000, ()=> {
  console.log("Listening to port 4000...");
});

