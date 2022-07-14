const  Router  = require('express');
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const { Movie } = db.models;
const { Op } = db.Sequelize;
const router = Router();

router.set('view engine', 'pug');
router.set('views', path.join(__dirname, 'views'));
router.use(Router.static('public'));
router.use(bodyParser.urlencoded({extended: false}));
(async ()=>await db.sequelize.sync({force:false}))();



/* Get / display page*/
router.get('/', (req, res)=>{
    res.render("index", null);
});

/* POST create movie */
router.post('/', async (req, res, next)=>{
    
    const movie = await Movie.create(req.body);
    const list = await Movie.findAll();
    //console.log(list.map(movies=>movies.toJSON()));
    res.redirect('/movies');
});

/*GET /movies */
router.get('/movies', async(req, res)=>{
    const movies = await Movie.findAll();
    const data = movies.map(m=>m.toJSON());
    //console.log(data);
    res.render('movies', {movies: data});
});

router.get('/:id', async (req, res, next)=>{
    const { id } = req.params;
    if(!isNaN(id)){
        //console.log(req.params.id)
        const m = await Movie.findByPk(req.params.id);
        const data = m.toJSON();
        res.render('film', { movie: data});
    }else{
        const error = new Error(`Oh no! Your request to the path: ${req.url} could not be fulfilled. Something may have been misspelled, or the path may not exist. Please try again or return to the home menue`);
        error.status = 404;
        error.url = req.url;
        next(error);
    }
})

/* GET / retrieve movie to update */
router.get('/:id/edit', async (req, res, next)=>{
    const movie = await Movie.findByPk(req.params.id);
    res.render('movies/edit', {movie, title: 'Edit Movie'});
});

/* PUT update movie */
// router.put('/:id', async (req, res, next) => {
//     const movie = await Movie.findByPk(req.params.id);
//     await movie.update(req.body);
//     res.redirect('/movies/'+movie.id);
// });

/* Delete movie */
router.get('/movies/:id/delete', async (req, res) => {
    const movieToDelete = await Movie. findByPk(req.params.id);
    await movieToDelete.destroy();
    res.redirect('/movies');
})

router.listen(3000, ()=> console.log('App listening on port 3000'));