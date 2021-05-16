const router = require('express').Router();
const {Playlist, User} = require('../../models');

router.post('/add', async (req, res) => {
    try {
        console.log('trying to create a user')
        const userData = await User.create(req.body);
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
    
          res.status(200).json(userData);
        });
      } catch (err) {
        res.status(400).json(err);
      }
});
router.post('/login', async (req, res) => {
    try {
       const userData = await User.findOne({where: { userName: req.body.username}});

       if(!userData){
           res.status(400).json({message: 'Incorrect Username or Password, please try again'});
           return
       }
       const validPassword = await userData.checkPassword(req.body.password);
       if(!validPassword) {
           res.status(400).json({message: 'Incorrect Username or Password, please try again'});
           return
       }

       req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (error) {
        res.status(400).json(error);
    }
})

router.post('/logout', (req, res) => {
    if( req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end()
    }
})
module.exports = router;