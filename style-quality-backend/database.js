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

// Pobieranie produktów z koszyka dla danego użytkownika
async function getCartItemsByUserId(id_user) {
    try {
        // Dołączamy dane produktu do pozycji w koszyku
        const [rows] = await pool.query(
            `SELECT 
                c.id_cart_position, 
                quantity,
                c.id_product, 
                p.name AS product_name, 
                p.price AS product_price,
                p.description AS product_description,
                p.identity AS product_identity
            FROM carts c
            JOIN products p ON c.id_product = p.id_product
            WHERE c.id_user = ?`,
            [id_user]
        );
        return { success: true, items: rows };
    } catch (error) {
        console.error("Błąd podczas pobierania koszyka:", error);
        return { success: false, error: error.message };
    }
}

async function removeCartItem(id_cart_position) {
    try {
        const [result] = await pool.query(
            `DELETE FROM carts WHERE id_cart_position = ?`,
            [id_cart_position]
        );
        return { success: true, affectedRows: result.affectedRows };
    } catch (error) {
        console.error("Błąd podczas usuwania z koszyka:", error);
        return { success: false, error: error.message };
    }
}



async function createOrder(id_user, ulica, numer_domu, kod_pocztowy, miasto, metoda_dostawy, powiadomienia_sms, suma, items) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        console.log('Rozpoczynam tworzenie zamówienia dla użytkownika:', id_user);

        // Oblicz datę dostawy w zależności od wybranej metody
        const currentDate = new Date();
        let deliveryDate = new Date(currentDate);

        if (metoda_dostawy === 'next_day') {
            // Dostawa na następny dzień
            deliveryDate.setDate(currentDate.getDate() + 1);
        } else {
            // Standardowa dostawa (4 dni)
            deliveryDate.setDate(currentDate.getDate() + 4);
        }

        // Formatuj daty do formatu MySQL
        const orderDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedDeliveryDate = deliveryDate.toISOString().split('T')[0]; // YYYY-MM-DD

        // Znajdź sprzedawcę pierwszego produktu w koszyku (lub użyj NULL jeśli nie ma produktów)
        let seller = null;
        if (items && items.length > 0) {
            const [sellerResult] = await connection.execute(
                'SELECT id_user FROM products WHERE id_product = ?',
                [items[0].id_product]
            );

            if (sellerResult && sellerResult.length > 0) {
                seller = sellerResult[0].id_user;
            }
        }

        // Dodaj zamówienie do tabeli orders
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (customer, seller, price, order_date, delivery_date, shipping_method, ulica, numer_domu, kod_pocztowy, miasto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_user, seller, suma, orderDate, formattedDeliveryDate, metoda_dostawy, ulica, numer_domu, kod_pocztowy, miasto]
        );

        const orderId = orderResult.insertId;
        console.log('Utworzono zamówienie z ID:', orderId);

        try {
            // Dodaj elementy zamówienia do tabeli order_products zgodnie z jej strukturą
            for (const item of items) {
                await connection.execute(
                    'INSERT INTO order_products (id_order, id_product) VALUES (?, ?)',
                    [orderId, item.id_product]
                );
            }
            console.log('Dodano elementy zamówienia');
        } catch (itemError) {
            console.error('Błąd podczas dodawania elementów zamówienia:', itemError);
            throw itemError;
        }

        // Wyczyść koszyk użytkownika
        await connection.execute('DELETE FROM carts WHERE id_user = ?', [id_user]);
        console.log('Wyczyszczono koszyk użytkownika');

        // Zatwierdź transakcję
        await connection.commit();
        console.log('Transakcja zakończona pomyślnie');

        return {
            success: true,
            orderId: orderId,
            deliveryDate: formattedDeliveryDate
        };
    } catch (error) {
        // W przypadku błędu cofnij transakcję
        try {
            await connection.rollback();
            console.log('Transakcja wycofana');
        } catch (rollbackError) {
            console.error('Błąd podczas wycofywania transakcji:', rollbackError);
        }

        console.error('Błąd podczas tworzenia zamówienia:', error);
        return {
            success: false,
            error: error.message
        };
    } finally {
        connection.release();
        console.log('Połączenie zwolnione');
    }
}


// Pobieranie liczby produktów użytkownika
async function getUserProductsCount(id_user) {
    const [rows] = await pool.query(
        'SELECT COUNT(*) as count FROM products WHERE id_user = ?',
        [id_user]
    );
    return rows[0].count;
}

// Pobieranie liczby sprzedanych produktów użytkownika
async function getUserSoldProductsCount(id_user) {
    const [rows] = await pool.query(
        'SELECT COUNT(*) as count FROM orders WHERE seller = ?',
        [id_user]
    );

    return rows[0].count;
}

// Aktualizacja ilości produktu w koszyku
async function updateCartItemQuantity(id_cart_position, quantity) {
    try {
        const [result] = await pool.query(
            'UPDATE carts SET quantity = ? WHERE id_cart_position = ?',
            [quantity, id_cart_position]
        );

        if (result.affectedRows === 0) {
            return { success: false, message: 'Pozycja w koszyku nie znaleziona' };
        }

        return { success: true };
    } catch (error) {
        console.error('Błąd updateCartItemQuantity:', error);
        return { success: false, error: error.message };
    }
}

async function getUserPurchasedProductsCount(id_user) {
    const [rows] = await pool.query(
        'SELECT COUNT(*) as count FROM orders WHERE customer = ?',
        [id_user]
    );
    return rows[0].count;
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
    addToCart,
    getCartItemsByUserId,
    removeCartItem,
    createOrder,
    getUserProductsCount,
    getUserSoldProductsCount,
    updateCartItemQuantity,
    getUserPurchasedProductsCount
}