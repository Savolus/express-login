# **Secure login system** 🔒

Implementation of simple secure login system using Express.js and MySQL database.

## **Instalation** 💻

Install all node packages:
```bash
npm i
```

Initialize database as root user:
```bash
mysql -u root
```
**Notice**, if you have `Permission denied` message, then you just need to add `sudo` keyword before `mysql` command.

And run initialize sql file:
```sql
SOURCE sql/init.sql;
```

## **Usage** ⌨️

Start server with `npm`:
```bash
npm start
```

Open in browser:
```bash
http://localhost:3000
```

## **Remark** 📍

Database credentials as:
```
DB_USER: 'username'
DB_PASSWORD: 'password'
```
were choosen to learn how to implement simple secure login system using Express.js and MySQL.

Also `.env` and `sql/init.sql` were pushed because of learning. In production **YOU SHOULDN'T PUSH `.env` AND `sql/init.sql` FILES**!

## **Bugs** 🐛

If You found some bugs then just tell it in the [issues](https://github.com/Savolus/express-login/issues)
