const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());


let users= [
  {
    id: "01",
    name: "m khan",
    image: "path",
    session: "C4MA",
    email: "mkhan@gmail.com",
  },
  {
    id: "02",
    name: "ali",
    image: "path",
    session: "C4MA",
    email: "ali@gmail.com",
  },
];



app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "data get succesflly", users });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});



app.post("/", (req, res) => {
  try {
    let { id, name, session, email } = req.body;
    const exist =users.find((user) => user.email === email);
    if (!exist) {
      const newEntry = {
        id,
        name,
        session,
        email,
      };
      users.push(newEntry);
      res.status(200).json({ message: "suucssfully save data" });
    } else {
      res.status(500).json({ message: "user already exist" });
    }
  } catch (error) {
    res.send(error);
  }
});



app.put("/:id", (req, res) => {
  const userToUpdate =users.find((user) => user.id === req.params.id);
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
  const userindexdelete =users.findIndex((user) => user.id === req.params.id);
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
