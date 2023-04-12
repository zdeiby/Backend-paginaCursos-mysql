const routerUsers= require('./router.users');
const routerArticles= require('./router.articles');
const routerCourses=require('./router.courses');
const routerCoursesAdvance=require('./router.coursesAdvance')

function routerApi(app){
    app.use('/users', routerUsers)
    app.use('/articles', routerArticles)
    app.use('/cursos', routerCourses)
    app.use('/cursosadvanced', routerCoursesAdvance)
}
module.exports = routerApi;