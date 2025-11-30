from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="biblioteca_user",
    password="parola_lavinia7",
    database="biblioteca"
)
cursor = db.cursor(dictionary=True)

# RUTA PRINCIPALĂ
@app.get('/')
def home():
    return jsonify({"message": "API Biblioteca funcționează!"})

# LISTA CĂRȚILOR
@app.get('/books')
def list_books():
    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()
    print(books)  # <--- asta afișează în terminal ce primește React
    return jsonify(books)

# ADAUGARE CARTE
@app.post('/books')
def add_book():
    data = request.json
    cursor.execute(
        "INSERT INTO books (title, author, year) VALUES (%s, %s, %s)",
        (data['title'], data['author'], data['year'])
    )
    db.commit()
    return jsonify({"message": "Book added successfully"}), 201

# OBȚINE CARTE DUPĂ ID
@app.get('/books/<int:id>')
def get_book(id):
    cursor.execute("SELECT * FROM books WHERE id=%s", (id,))
    book = cursor.fetchone()
    return jsonify(book)

# UPDATE CARTE
@app.put('/books/<int:id>')
def update_book(id):
    data = request.json
    cursor.execute(
        "UPDATE books SET title=%s, author=%s, year=%s WHERE id=%s",
        (data['title'], data['author'], data['year'], id)
    )
    db.commit()
    return jsonify({"message": "Book updated"})

# ȘTERGERE CARTE
@app.delete('/books/<int:id>')
def delete_book(id):
    cursor.execute("DELETE FROM books WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Book deleted"})

if __name__ == '__main__':
    app.run(debug=True)
