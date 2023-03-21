const routerUsers= require('./router.users');
const routerArticles= require('./router.articles');

function routerApi(app){
    app.use('/users', routerUsers)
    app.use('/articles', routerArticles)
}
module.exports = routerApi;