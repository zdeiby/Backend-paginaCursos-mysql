const routerUsers= require('./router.users');
const routerArticles= require('./router.articles');
const routerCourses=require('./router.courses')

function routerApi(app){
    app.use('/users', routerUsers)
    app.use('/articles', routerArticles)
    app.use('/cursos', routerCourses)
}
module.exports = routerApi;