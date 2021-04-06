from flask import Flask, render_template, url_for, request, redirect
from datetime import datetime
import sqlite3
from sqlite3 import Error

message_boards = Flask(__name__) #means current file


#def application(environ, start_response):
 # if environ['REQUEST_METHOD'] == 'OPTIONS':
  #  start_response(
   #   '200 OK',
    #  [
     #   ('Content-Type', 'application/json'),
      #  ('Access-Control-Allow-Origin', '*'),
       # ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
        #('Access-Control-Allow-Methods', 'POST'),
      #]
    #)
    #return ''


# create a DB and a connection
def create_connection(db_file):
    connection = None;
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)

    return conn

# call the function for my db (if db doesn't exist then the db is made)

create_connection("storemessages.db")

#create table to put in the database

def create_table(conn, storemessages):

    sql = """ INSERT INTO messagetable(Message)
              VALUES(?) """

    c = conn.cursor()
    c.execute(sql,storemessages)
    return cur.lastrowid


# now insert the created table
def main():
    database = r"storemessages.db"

    sql_create_messagetable = """ CREATE TABLE IF NOT EXISTS storemessages (
                                        id integer PRIMARY KEY,
                                        Message text NOT NULL
                                    ); """

    conn = create_connection(database)

    if conn is not None:
        create_table(conn, sql_create_messagetable)

    else:
        print("Error! cannot create the database connection.")



# index for the html page
@message_boards.route('/')
def index():
    return render_template("index.html")


# sending input form form to db
@message_boards.route('/my_form', methods=['POST'])
def my_form():

    if request.method == 'POST':
        c = conn.cursor()
        new_message = request.form.get('SendMessage')


        try:
            sql = ("INSERT INTO storemessages.messagetable (columnName,columnNamepy) VALUES (%s, %s, %s, %s)")
            c.execute(sql,(new_message))
            connection.commit()
            return redirect('/')
        except:
            return 'an error occured in saving the data'

#run the message_boards
if __name__ == '__main__':
    message_boards.run(debug=True)