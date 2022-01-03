const User = require("../models/user");
const Sana = require("../models/sana");
const cors = require("cors");
const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const sanacollection = require("../../../server.js");

router.use(cors());

process.env.SECRET_KEY = "KOODI";

//Käyttäjien reitit
router.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

router.post("/register", (req, res) => {
  const userData = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, null, null),
  };

  //etsitään löytyykö tällä nimellä jo olemassa olevaa käyttäjää
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        //jos ei löydy niin luodaan uusi käyttäjä ja samalla luodaan tokeni
        User.create(userData)
          .then((user) => {
            const payload = {
              _id: user._id,
              username: user.username,
            };
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });
            res.json({ token: token });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

/*router.post("/register", (req, res) => {
  user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user.save(() => {
    res.json(user);
  });
});*/

router.delete("/user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    res.json({ message: "user deleted" });
  });
});

router.post("/login", (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (user) {
        //verrataan salasanoja bcryptillä, jos oikein niin luodaan tokeni ja kirjaudutaan sisään
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            username: user.username,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.json({ token: token });
        } else {
          res.json({ error: "Wrong password" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
//etsin kirjautuneen nimen jotta voin näyttää sen sivulla.
router.get("/profile", (req, res) => {
  const decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({ _id: decoded._id })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
});

//sanojen reitit
// suomi-englanti
router.get("/sanat", (req, res) => {
  Sana.find({}, (err, sanat) => {
    res.json(sanat);
  })
    .collation({ locale: "fi" })
    .sort({ suomi: 1 });
});

//englanti-suomi
router.get("/sanate", (req, res) => {
  Sana.find({}, (err, sanate) => {
    res.json(sanate);
  })
    .collation({ locale: "en" })
    .sort({ englanti: 1 });
});

//sanan poisto
router.delete("/sana/:id", (req, res) => {
  Sana.findByIdAndDelete(req.params.id, (err) => {
    res.json({ message: "sana deleted" });
  });
});

//sanan luonti
router.post("/sana", (req, res) => {
  const sanaData = {
    suomi: req.body.suomi,
    englanti: req.body.englanti,
  };

  //jos sana ja sen sama käännös on jo olemassa, ei haluta samaa sanaa lisätä
  Sana.findOne({
    suomi: req.body.suomi,
    englanti: req.body.englanti,
  })
    .then((sana) => {
      if (!sana) {
        Sana.create(sanaData);
        res.json({ ok: "sana added" });
      } else {
        res.json({ error: "Sana on jo olemassa" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

//käytetään atlaksen omaa searchia ja autocompletea hakuna
router.get("/search", async (req, res) => {
  try {
    let result = await Sana.aggregate([
      {
        $search: {
          autocomplete: {
            query: `${req.query.term}`,
            path: "suomi",
            fuzzy: {
              maxEdits: 0,
              prefixLength: 1,
            },
          },
        },
      },
    ]);

    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
