const Router = require('koa-router');
const router = new Router();
const API = require('../utils/API');

const Sharp = require('sharp');


module.exports = router;


router.get('/images/:name', async (ctx, next) => {

    const {request, url} = ctx;
    const {query} = request;
    const {name} = ctx.params;



    const response = await API.async({"Content-Type": "image/jpg"}, `http://localhost:3000${url}`);

    let resizedImageFile = response.data;
    if (query.w && query.h) {
        resizedImageFile = await Sharp(resizedImageFile).resize(query.w.toInt(), query.h.toInt(), {fit: "fill"}).withMetadata().rotate().toFormat("jpg").toBuffer();
    } else if (query.w) {
        resizedImageFile = await Sharp(resizedImageFile).resize({width: query.w.toInt()}).withMetadata().rotate().toFormat("jpg").toBuffer();
    } else if (query.h) {
        resizedImageFile = await Sharp(resizedImageFile).resize({height: query.h.toInt()}).withMetadata().rotate().toFormat("jpg").toBuffer();
    }
    ctx.set("Content-Type", "image/jpg");
    ctx.body = resizedImageFile;

});

module.exports = router;
