const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const mongoURI = process.env.MONGO_URI;
// **Conectare la MongoDB**
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// **Configurare stocare sesiune în MongoDB**
const store = new MongoDBStore({
    uri: "mongodb://0.0.0.0:27017/mydb",
    collection: "sessions"
});

const MongoStore = require("connect-mongo");

app.use(session({
    secret: process.env.SESSION_SECRET,  // Schimbă cu ceva mai sigur în producție
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURI}),
    cookie: { maxAge: 1000 * 60 * 60 } // Sesiunea expiră după 1 oră
}));

// **Middleware-uri**
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Sources")));

// **Schema și Model pentru utilizator**
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created_at: Date,
    extraData: String // Poți adăuga alte câmpuri aici
});

const User = mongoose.model("User", userSchema);

// **Ruta de înregistrare**
app.post("/sign_up", async (req, res) => {
    const { name, show_name, email, password } = req.body;

    try {
        const newUser = new User({
            name,
            show_name,
            email,
            password,
            created_at: Date.now()
        });

        await newUser.save();
        console.log("Utilizator înregistrat cu succes:", name);
        res.redirect("/content/html/login.html");
    } catch (err) {
        console.error("Eroare la înregistrare:", err);
        res.redirect("/content/html/sign_up.html");
    }
});

// **Ruta de autentificare**
app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });

        if (user && user.password === password) {
            req.session.user = { name: user.name, email: user.email }; // Salvăm utilizatorul în sesiune
            console.log("Autentificare reușită:", req.session.user);
            return res.redirect("/content/html/dashboard.html");
        } else {
            console.log("Autentificare eșuată: utilizator sau parolă greșită");
            return res.redirect("/content/html/login.html");
        }
    } catch (err) {
        console.error("Eroare la login:", err);
        return res.redirect("/content/html/login.html");
    }
});

// **Ruta pentru verificarea sesiunii**
app.get("/user_data", (req, res) => {
    if (!req.session.user) {
        return res.json({ authenticated: false });
    }
    return res.json({ authenticated: true, user: req.session.user });
});

app.get("/get_user", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Nu ești autentificat!" });
    }
    try {
        const user = await User.findOne({ name: req.session.user.name });
        if (!user) {
            return res.status(404).json({ error: "Utilizatorul nu a fost găsit!" });
        }
        res.json({ name: user.name, email: user.email, username: user.show_name });
    } catch (error) {
        console.error("Eroare la preluarea datelor utilizatorului:", error);
        res.status(500).json({ error: "Eroare internă a serverului" });
    }
});

app.post("/update_user", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Nu ești autentificat!" });
    }
    try {
        await User.updateOne(
            { name: req.session.user.name },
            { $set: { email: req.body.email } }
        );
        res.json({ success: true });
    } catch (error) {
        console.error("Eroare la actualizare:", error);
        res.status(500).json({ error: "Eroare la actualizare" });
    }
});

app.post("/save_data", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Nu ești autentificat!" });
    }
    try {
        await User.updateOne(
            { name: req.session.user.name },
            { $set: { extraData: req.body.extraData } }
        );
        res.json({ success: true });
    } catch (error) {
        console.error("Eroare la salvarea datelor:", error);
        res.status(500).json({ error: "Eroare la salvare" });
    }
});

// **Ruta pentru logout**
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Eroare la logout:", err);
        }
        res.redirect("/");
    });
});

// Servește automat index.html la accesarea rădăcinii site-ului
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// **Pornirea serverului**
app.listen(3000, () => console.log("Server pornit pe portul 3000"));
