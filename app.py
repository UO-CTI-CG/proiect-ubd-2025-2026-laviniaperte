from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import os
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder=os.path.join("biblioteca-react", "client", "build"), static_url_path='/')
app.config['SECRET_KEY'] = "secret_super_sigur_123"
CORS(app)

DB_CONFIG = {
    "host": "localhost",
    "user": "biblioteca_user",
    "password": "parola_lavinia7",
    "database": "biblioteca",
    "connection_timeout": 100
}

def get_connection():
    return mysql.connector.connect(**DB_CONFIG)

# ------------------ BOOKS ------------------
@app.get('/books')
def list_books():
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM books")
        books = cursor.fetchall()
        cursor.execute("SELECT book_id, return_date FROM loans")
        loans = cursor.fetchall()
        today = datetime.date.today()
        for book in books:
            loan = next((l for l in loans if l["book_id"] == book["id"] and (l["return_date"] is None or l["return_date"] > today)), None)
            book["status"] = "Împrumutată" if loan else "Disponibilă"
    finally:
        cursor.close()
        db.close()
    return jsonify(books)

@app.post('/books')
def add_book():
    data = request.json
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("INSERT INTO books (title, author, year) VALUES (%s, %s, %s)",
                       (data['title'], data['author'], data['year']))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "Book added successfully"}), 201

@app.get('/books/<int:id>')
def get_book(id):
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM books WHERE id=%s", (id,))
        book = cursor.fetchone()
    finally:
        cursor.close()
        db.close()
    return jsonify(book)

@app.put('/books/<int:id>')
def update_book(id):
    data = request.json
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("UPDATE books SET title=%s, author=%s, year=%s WHERE id=%s",
                       (data['title'], data['author'], data['year'], id))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "Book updated"})

@app.delete('/books/<int:id>')
def delete_book(id):
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM books WHERE id=%s", (id,))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "Book deleted"})

# ------------------ USERS ------------------
@app.get('/users')
def list_users():
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id, username, email, phone, address FROM users")
        users = cursor.fetchall()
    finally:
        cursor.close()
        db.close()
    return jsonify(users)

@app.get('/users/<int:id>')
def get_user(id):
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id, username, email, phone, address FROM users WHERE id=%s", (id,))
        user = cursor.fetchone()
    finally:
        cursor.close()
        db.close()
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

@app.post('/users')
def add_user():
    data = request.json
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("INSERT INTO users (username, email, phone, address) VALUES (%s, %s, %s, %s)",
                       (data.get("username"), data.get("email"), data.get("phone"), data.get("address")))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "User added"}), 201

@app.put('/users/<int:id>')
def update_user(id):
    data = request.json
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("UPDATE users SET username=%s, email=%s, phone=%s, address=%s WHERE id=%s",
                       (data["username"], data.get("email"), data.get("phone"), data.get("address"), id))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "User updated"})

@app.delete('/users/<int:id>')
def delete_user(id):
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM users WHERE id=%s", (id,))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "User deleted"})

# ------------------ LOANS ------------------
@app.get('/loans')
def list_loans():
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("""
            SELECT loans.id, users.username AS user, books.title AS book, loans.book_id, loans.user_id, loans.loan_date, loans.return_date
            FROM loans
            JOIN users ON loans.user_id = users.id
            JOIN books ON loans.book_id = books.id
        """)
        loans = cursor.fetchall()
    finally:
        cursor.close()
        db.close()
    return jsonify(loans)

@app.get('/loans/<int:id>')
def get_loan(id):
    try:
        db = get_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM loans WHERE id=%s", (id,))
        loan = cursor.fetchone()
    finally:
        cursor.close()
        db.close()
    if loan:
        return jsonify(loan)
    return jsonify({"error": "Împrumut inexistent"}), 404

@app.post('/loans')
def add_loan():
    data = request.json
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("INSERT INTO loans (user_id, book_id, loan_date, return_date) VALUES (%s, %s, %s, %s)",
                       (data["user_id"], data["book_id"], data["loan_date"], data.get("return_date") or None))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "Împrumut adăugat"}), 201

@app.put('/loans/<int:id>')
def edit_loan(id):
    data = request.json
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("UPDATE loans SET user_id=%s, book_id=%s, loan_date=%s, return_date=%s WHERE id=%s",
                       (data["user_id"], data["book_id"], data["loan_date"], data.get("return_date") or None, id))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "Împrumut actualizat"}), 200

@app.delete('/loans/<int:id>')
def delete_loan(id):
    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM loans WHERE id=%s", (id,))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "Împrumut șters"})

# ------------------ SERVE REACT ------------------
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    build_dir = app.static_folder
    requested = os.path.join(build_dir, path)
    if path != "" and os.path.exists(requested):
        return send_from_directory(build_dir, path)
    return send_from_directory(build_dir, 'index.html')

# ------------------ LOGIN/SIGNUP ------------------
@app.post("/login")
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM librarians WHERE username=%s", (username,))
    librarian = cursor.fetchone()
    cursor.close()
    db.close()
    if not librarian:
        return jsonify({"error": "Utilizator inexistent"}), 401
    if not check_password_hash(librarian["password"], password):
        return jsonify({"error": "Parolă greșită"}), 401
    token = jwt.encode({"id": librarian["id"], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
                       app.config['SECRET_KEY'])
    return jsonify({"token": token})

@app.post("/signup")
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    hashed_password = generate_password_hash(password)
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("INSERT INTO librarians (username, password) VALUES (%s, %s)",
                   (username, hashed_password))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Cont creat cu succes"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
