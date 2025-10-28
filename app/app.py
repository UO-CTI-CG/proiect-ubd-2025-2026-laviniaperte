from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="biblioteca_user",
    password="parola_lavinia7",
    database="biblioteca"
)
cursor = db.cursor(dictionary=True)

@app.route('/')
def index():
    return redirect('/books')

@app.route('/books')
def list_books():
    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()
    return render_template('books.html', books=books)

@app.route('/add-book', methods=['GET', 'POST'])
def add_book():
    if request.method == 'POST':
        title = request.form['title']
        author = request.form['author']
        year = request.form['year']
        cursor.execute("INSERT INTO books (title, author, year) VALUES (%s, %s, %s)", (title, author, year))
        db.commit()
        return redirect('/books')
    return render_template('add_book.html')

@app.route('/edit-book/<int:id>', methods=['GET', 'POST'])
def edit_book(id):
    if request.method == 'POST':
        title = request.form['title']
        author = request.form['author']
        year = request.form['year']
        cursor.execute("UPDATE books SET title=%s, author=%s, year=%s WHERE id=%s", (title, author, year, id))
        db.commit()
        return redirect('/books')
    cursor.execute("SELECT * FROM books WHERE id=%s", (id,))
    book = cursor.fetchone()
    return render_template('edit_book.html', book=book)

@app.route('/delete-book/<int:id>')
def delete_book(id):
    cursor.execute("DELETE FROM books WHERE id=%s", (id,))
    db.commit()
    return redirect('/books')

if __name__ == '__main__':
    app.run(debug=True)
