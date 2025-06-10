import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// Pobieranie produktów
async function getProducts(){
    const [rows] = await pool.query('SELECT * FROM products LIMIT 8')
    return rows
}
// console.log(await getProducts())

// Pobieranie jednego produktu
async function getProduct(id){
    const [rows] = await pool.query(`
        Select * from products where id_product = ?
        `, [id])
    return rows[0]
}
// console.log(await getProduct(1))


// Pobieranie po kategorii
async function getProductsByCategory(category){
    const [rows] = await pool.query(`
        Select 
            products.id_product,
            products.name,
            products.id_user,
            products.id_category,
            products.price,
            products.description,
            products.identity,
            products.condition
        from products inner join categories on products.id_category = categories.id_category where categories.name = ?
        `, [category])
    return rows
}
// console.log(await getProductsByCategory('Electronics'))

// Sprawdzanie logowania
async function loginUser(login, password) {
    const [rows] = await pool.query(`
        SELECT * FROM users WHERE login = ? AND user_password = ?
    `, [login, password]);

    return rows.length > 0 ? rows[0] : null;
}

// Sprawdzanie czy użytkownik istnieje (przez login)
async function checkUserExists(login) {
    const [rows] = await pool.query(`
        SELECT * FROM users WHERE login = ?
    `, [login]);

    return rows.length > 0;
}

// Rejestracja nowego użytkownika
async function registerUser(name, surname, login, password) {
    try {
        const [result] = await pool.query(`
            INSERT INTO users (name, surname, login, user_password)
            VALUES (?, ?, ?, ?)
        `, [name, surname, login, password]);

        return {
            success: true,
            userId: result.insertId
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Pobieranie danych użytkownika po ID
async function getUserById(userId) {
    const [rows] = await pool.query(`
        SELECT id_user, name, surname, login
        FROM users
        WHERE id_user = ?
    `, [userId]);

    return rows.length > 0 ? rows[0] : null;
}

// Eksportowanie kwerend
export {
    getProducts,
    getProduct,
    getProductsByCategory,
    loginUser,
    registerUser,
    checkUserExists,
    getUserById,
    addProduct,
    addToCart
}


// Dodawanie nowego produktu
async function addProduct(name, id_user, id_category, price, description, condition) {
    try {
        const [result] = await pool.query(`
            INSERT INTO products (name, id_user, id_category, price, description, identity, products.condition)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [name, id_user, id_category, price, description, Math.floor(Math.random() * 9000) + 1000, condition]);
        return {
            success: true,
            productId: result.insertId
        };
    } catch (error) {
        console.log("Dodawanie nieudane"+error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Dodawanie produktu do koszyka
async function addToCart(id_user, id_product, quantity) {
    try {
        const [result] = await pool.query(
            `INSERT INTO carts (id_user, id_product,quantity) VALUES (?, ?,?)`,
            [id_user, id_product,quantity]
        );
        return { success: true, cartPositionId: result.insertId };
    } catch (error) {
        console.log("Błąd podczas dodawania do koszyka:"+ error);
        console.error("Błąd podczas dodawania do koszyka:", error);
        return { success: false, error: error.message };
    }
}