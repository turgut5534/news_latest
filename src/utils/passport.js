const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('../models/User')
const UserPassword = require('../models/UserPassword')

function verifyPassword(inputPassword, storedPasswordHash, storedPasswordSalt) {

    storedPasswordHash = Buffer.from(storedPasswordHash)
    storedPasswordSalt = Buffer.from(storedPasswordSalt)

    const hmac = crypto.createHmac('sha512', storedPasswordSalt);
    const computeHash = hmac.update(inputPassword).digest('hex');
    
    const isMatched = Buffer.from(computeHash, 'hex').equals(storedPasswordHash);

    return isMatched
  }

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
        return done(null, false, { message: 'Mail veya şifre hatalı.' });
    }

    const dbPassword = await UserPassword.findOne({ where: { user_id: user.id } })

    const passwordMatch = await verifyPassword(password.toString(), dbPassword.hash_pass, dbPassword.salt_pass);

    if (!passwordMatch) {
        return done(null, false, { message: 'Mail veya şifre hatalı' });
    }
    return done(null, user);
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // const user = await db.query('SELECT * FROM "user" WHERE id = $1', [id]);
    const user = await User.findByPk(id)
    done(null, user);
});

module.exports = passport;