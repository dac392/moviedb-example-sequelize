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
(async ()=>await db.sequelize.sync({force:true}))();



/* Get / display page*/
router.get('/', (req, res)=>{
    res.render("index", null);
});

/* POST create movie */
router.post('/', async (req, res, next)=>{
    console.log(req.body);
    // const movie = await Movie.create(req.body);
    // const list = await Movie.findALL();
    // console.log(list.map(movies=>movies.toJSON()));
    // res.redirect('/movies/', + movie.id);
});

/* GET / retrieve movie to update */
router.get('/:id/edit', async (req, res, next)=>{
    const movie = await Movie.findByPk(req.params.id);
    res.render('mpvies/edit', {movie, title: 'Edit Movie'});
});

/* PUT update movie */
router.put('/:id', async (req, res, next) => {
    const movie = await Movie.findByPk(req.params.id);
    await movie.update(req.body);
    res.redirect('/movies/'+movie.id);
});

/* Delete movie */
router.post('/movies/:id/delete', async (req, res) => {
    const movieToDelete = await Movie. findByPk(req.params.id);
    await movieToDelete.destroy();
    res.redirect('movies');
})

router.listen(3000, ()=> console.log('App listening on port 3000'));