const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
app.use(express.json());

let users = [
  {
    id: "01",
    name: "m khan",
    session: "C4MA",
    email: "mkhan@gmail.com",
  },
  {
    id: "02",
    name: "ali",
    session: "C4MA",
    email: "ali@gmail.com",
  },
];

const secretKey = "secretkey";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.send(" No token provided");
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send("Failed to authenticate token");
    }
    req.user = decoded;
    next();
  });
};

app.get("/", verifyToken, (req, res) => {
  try {
    res.status(200).json({ message: "Data retrieved successfully", users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.post("/", (req, res) => {
  const { id, name, session, email } = req.body;
  const exist = users.find((user) => user.email === email);

  if (!exist) {
    const newEntry = { id, name, session, email };

    
    users.push(newEntry);

  
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" }); 

    res.status(200).json({ message: "Successfully saved data", token });
  } else {
    res.status(500).json({ message: "User already exists" });
  }
});

app.put("/:id", (req, res) => {
  const userToUpdate = users.find((user) => user.id === req.params.id);
  if (!userToUpdate) {
    res.status(404).json({ message: "user not found" });
  } else {
    const { name, session, email } = req.body;
    if (name !== undefined) userToUpdate.name = name;
    if (session !== undefined) userToUpdate.session = session;
    if (email !== undefined) userToUpdate.email = email;
    console.log(name);
    res.status(200).json({ message: "user updated", userToUpdate });
  }
});

app.delete("/:id", (req, res) => {
  const userindexdelete = users.findIndex((user) => user.id === req.params.id);
  if (!userindexdelete) {
    res.status(404).json({ message: "user not found" });
  } else {
    const result = users.splice(userindexdelete, 1);
    console.log(result);
    res.status(200).json({ msg: "user deleted", result });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
