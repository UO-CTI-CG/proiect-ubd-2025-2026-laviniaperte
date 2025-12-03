from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import os

# -------------------------
#   INSTANȚĂ FLASK ȘI CORS
# -------------------------
app = Flask(__name__, static_folder=os.path.join("biblioteca-react", "client", "build"), static_url_path='/')
CORS(app)

# -------------------------
#  CONFIGURARE BAZA DE DATE
# -------------------------
db = mysql.connector.connect(
    host="localhost",
    user="biblioteca_user",
    password="parola_lavinia7",
    database="biblioteca"
)
cursor = db.cursor(dictionary=True)

# -------------------------
#  RUTA PRINCIPALĂ
# -------------------------
@app.get('/')
def home():
    return jsonify({"message": "API Biblioteca funcționează!"})

# -------------------------
#       CĂRȚI
# -------------------------
@app.get('/books')
def list_books():
    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()
    return jsonify(books)

@app.post('/books')
def add_book():
    data = request.json
    cursor.execute(
        "INSERT INTO books (title, author, year) VALUES (%s, %s, %s)",
        (data['title'], data['author'], data['year'])
    )
    db.commit()
    return jsonify({"message": "Book added successfully"}), 201

@app.get('/books/<int:id>')
def get_book(id):
    cursor.execute("SELECT * FROM books WHERE id=%s", (id,))
    book = cursor.fetchone()
    return jsonify(book)

@app.put('/books/<int:id>')
def update_book(id):
    data = request.json
    cursor.execute(
        "UPDATE books SET title=%s, author=%s, year=%s WHERE id=%s",
        (data['title'], data['author'], data['year'], id)
    )
    db.commit()
    return jsonify({"message": "Book updated"})

@app.delete('/books/<int:id>')
def delete_book(id):
    cursor.execute("DELETE FROM books WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Book deleted"})

# -------------------------
#       UTILIZATORI
# -------------------------
@app.get('/users')
def list_users():
    cursor.execute("SELECT id, username, email, phone, address FROM users")
    users = cursor.fetchall()
    return jsonify(users)

@app.get('/users/<int:id>')
def get_user(id):
    cursor.execute("SELECT id, username, email, phone, address FROM users WHERE id=%s", (id,))
    user = cursor.fetchone()
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

@app.post('/users')
def add_user():
    data = request.json
    cursor.execute(
        "INSERT INTO users (username, email, phone, address) VALUES (%s, %s, %s, %s)",
        (data.get("username"), data.get("email"), data.get("phone"), data.get("address"))
    )
    db.commit()
    return jsonify({"message": "User added"}), 201

@app.put('/users/<int:id>')
def update_user(id):
    data = request.json
    cursor.execute(
        "UPDATE users SET username=%s, email=%s, phone=%s, address=%s WHERE id=%s",
        (data["username"], data.get("email"), data.get("phone"), data.get("address"), id)
    )
    db.commit()
    return jsonify({"message": "User updated"})

@app.delete('/users/<int:id>')
def delete_user(id):
    cursor.execute("DELETE FROM users WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "User deleted"})

# -------------------------
#       ÎMPRUMUTURI
# -------------------------
@app.get('/loans')
def list_loans():
    cursor.execute("""
        SELECT loans.id, users.username AS user, books.title AS book, loans.loan_date, loans.return_date
        FROM loans
        JOIN users ON loans.user_id = users.id
        JOIN books ON loans.book_id = books.id
    """)
    loans = cursor.fetchall()
    return jsonify(loans)

@app.post('/loans')
def add_loan():
    data = request.json
    cursor.execute(
        "INSERT INTO loans (user_id, book_id, loan_date, return_date) VALUES (%s, %s, %s, %s)",
        (data["user_id"], data["book_id"], data["loan_date"], data.get("return_date"))
    )
    db.commit()
    return jsonify({"message": "Împrumut adăugat"}), 201

@app.delete('/loans/<int:id>')
def delete_loan(id):
    cursor.execute("DELETE FROM loans WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Împrumut șters"})


# -------------------------
#  SERVE STATIC REACT BUILD (SPA fallback)
# -------------------------
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    build_dir = app.static_folder
    requested = os.path.join(build_dir, path)
    if path != "" and os.path.exists(requested):
        return send_from_directory(build_dir, path)
    return send_from_directory(build_dir, 'index.html')

# -------------------------
#  PORNIRE SERVER
# -------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)
