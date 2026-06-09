const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(process.env.DATABASE_URL);

// GET all leads
app.get('/leads', (req, res) => {
  db.query("SELECT * FROM leads", (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// ADD a new lead
app.post('/add', (req, res) => {
  // Add 'source' and 'notes' to the variables
  const { name, email, source, status, notes } = req.body;
  
  const sql = "INSERT INTO leads (name, email, source, status, notes) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sql, [name, email, source, status, notes], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      res.status(500).send(err);
    } else {
      res.send("Lead added successfully!");
    }
  });
});

// DELETE a lead
app.delete('/delete/:id', (req, res) => {
  const sql = "DELETE FROM leads WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Lead deleted");
  });
});

app.put('/update/:id', (req, res) => {
    const { status, notes } = req.body;
    const { id } = req.params;
    db.query('UPDATE leads SET status = ?, notes = ? WHERE id = ?', [status, notes, id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.send('Lead updated');
    });
});
app.listen(5000, () => console.log('Server running on port 5000'));
