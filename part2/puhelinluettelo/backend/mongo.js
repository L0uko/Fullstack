const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://toukottoivonen_db_user:${password}@cluster0.blhpok2.mongodb.net/?appName=Cluster0retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Note = mongoose.model("Note", noteSchema);

const name = process.argv[3];
const number = process.argv[4];

const note = new Note({
  name: name,
  number: number,
});
if (process.argv.length === 3) {
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note.name, note.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  note.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook!`);
    mongoose.connection.close();
  });
} else {
  console.log("invalid argument");
  mongoose.connection.close();
}
