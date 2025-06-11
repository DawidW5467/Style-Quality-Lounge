import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProducts, getProduct, getProductsByCategory, loginUser, getUserById, registerUser, checkUserExists, addProduct, addToCart, getCartItemsByUserId, removeCartItem, createOrder } from './database.js';

const port = 5555;
const app = express();

// Dodanie CORS
app.use(cors());
app.use(express.json());

app.listen(5555, () => {
  console.log(`Server is listening at ${port}`);
});

app.get('/', (req, res) => {
  res.send("<h1>DigitalServer Working</h1>");
});

// Endpoint z produktami
app.get('/products', async (req, res) => {
  try {
    const products = await getProducts();
    console.log('Pobrane produkty:', products);
    res.json(products);
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint dla pojedynczego produktu
app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Próba pobrania produktu o ID: ${id}`);

    const product = await getProduct(id);

    if (!product) {
      console.log(`Produkt o ID ${id} nie znaleziony`);
      return res.status(404).json({ error: 'Produkt nie znaleziony' });
    }

    console.log('Pobrano produkt:', product);
    res.json(product);
  } catch (error) {
    console.error('Błąd podczas pobierania produktu:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint do pobierania produktów według kategorii
app.get('/products/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    console.log(`Próba pobrania produktów z kategorii: ${category}`);

    const products = await getProductsByCategory(category);

    if (!products || products.length === 0) {
      console.log(`Brak produktów w kategorii ${category}`);
      return res.status(404).json({ error: 'Brak produktów w tej kategorii' });
    }

    console.log(`Pobrano ${products.length} produktów z kategorii ${category}`);
    res.json(products);
  } catch (error) {
    console.error('Błąd podczas pobierania produktów z kategorii:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint do logowania
app.post('/api/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    // Walidacja podstawowa
    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: 'Login i hasło są wymagane'
      });
    }

    // Sprawdzenie użytkownika w bazie
    const user = await loginUser(login, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Nieprawidłowy login lub hasło'
      });
    }

    // Ukryj hasło przed wysłaniem odpowiedzi
    const { user_password, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas logowania'
    });
  }
});

// Endpoint do rejestracji
app.post('/api/register', async (req, res) => {
  try {
    const { name, surname, login, password } = req.body;

    // Walidacja podstawowa
    if (!name || !surname || !login || !password) {
      return res.status(400).json({
        success: false,
        message: 'Wszystkie pola są wymagane'
      });
    }

    // Sprawdzenie czy użytkownik już istnieje
    const userExists = await checkUserExists(login);

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: 'Użytkownik o podanym loginie już istnieje'
      });
    }

    // Rejestracja użytkownika
    const result = await registerUser(name, surname, login, password);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Nie udało się zarejestrować użytkownika',
        error: result.error
      });
    }

    // Pobierz dane nowego użytkownika
    const newUser = await getUserById(result.userId);

    res.status(201).json({
      success: true,
      message: 'Rejestracja zakończona pomyślnie',
      user: newUser
    });
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas rejestracji'
    });
  }
});


// Endpoint do dodawania produktu
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, id_category, condition } = req.body;

    // Tutaj powinno być pobranie id_user z sesji/tokena, na potrzeby przykładu używamy 1
    const id_user = 1;

    // Walidacja podstawowa
    if (!name || !price || !description || !id_category || !condition) {
      return res.status(400).json({
        success: false,
        message: 'Wszystkie pola są wymagane'
      });
    }

    // Dodanie produktu
    const result = await addProduct(name, id_user, id_category, price, description, condition);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Nie udało się dodać produktu',
        error: result.error
      });
    }
    console.log("Produkt dodano pomyślnie")
    res.status(201).json({
      success: true,
      message: 'Produkt dodany pomyślnie',
      productId: result.productId
    });
  } catch (error) {
    console.error('Błąd podczas dodawania produktu:', error);
    alert('Błąd podczas dodawania produktu:', error);
    console.log('Błąd podczas dodawania produktu:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas dodawania produktu'
    });
  }
});


// Endpoint do dodawania produktu do koszyka
app.post('/api/cart', async (req, res) => {
  try {
    const { id_product, id_user, quantity } = req.body; // Zakładamy, że frontend wyśle id_product i id_user

    // Walidacja
    if (!id_product || !id_user || !quantity ) {
      return res.status(400).json({
        success: false,
        message: 'Brakuje id_product lub id_user'
      });
    }

    const result = await addToCart(id_user, id_product,quantity);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Nie udało się dodać produktu do koszyka',
        error: result.error
      });
    }

    res.status(201).json({
      success: true,
      message: 'Produkt dodany do koszyka pomyślnie',
      cartPositionId: result.cartPositionId
    });
  } catch (error) {
    console.error('Błąd podczas dodawania produktu do koszyka:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas dodawania produktu do koszyka'
    });
  }
});

// Endpoint do pobierania produktów z koszyka dla danego użytkownika
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Brakuje ID użytkownika'
      });
    }

    const result = await getCartItemsByUserId(userId);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Nie udało się pobrać produktów z koszyka',
        error: result.error
      });
    }

    res.status(200).json({
      success: true,
      items: result.items
    });
  } catch (error) {
    console.error('Błąd podczas pobierania koszyka:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas pobierania koszyka'
    });
  }
});



// Endpoint do usuwania produktu z koszyka
app.delete('/api/cart/:id_cart_position', async (req, res) => {
  try {
    const id_cart_position = req.params.id_cart_position;

    if (!id_cart_position) {
      return res.status(400).json({
        success: false,
        message: 'Brakuje ID pozycji koszyka do usunięcia.'
      });
    }

    const result = await removeCartItem(id_cart_position);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Nie udało się usunąć produktu z koszyka.',
        error: result.error
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pozycja w koszyku o podanym ID nie została znaleziona.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Produkt usunięty z koszyka pomyślnie.'
    });
  } catch (error) {
    console.error('Błąd podczas usuwania produktu z koszyka:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas usuwania produktu z koszyka.'
    });
  }
});
// Endpoint do składania zamówień
app.post('/api/orders', async (req, res) => {
  try {
    console.log('Otrzymano żądanie POST na /api/orders');
    const {
      id_user,
      ulica,
      numer_domu,
      kod_pocztowy,
      miasto,
      metoda_dostawy,
      powiadomienia_sms,
      suma,
      items
    } = req.body;

    console.log('Dane zamówienia:', {
      id_user, ulica, numer_domu, kod_pocztowy, miasto, metoda_dostawy,
      powiadomienia_sms, suma,
      items_count: items ? items.length : 0
    });

    // Walidacja podstawowa
    if (!id_user || !ulica || !numer_domu || !kod_pocztowy || !miasto || !metoda_dostawy || !items || !items.length) {
      console.log('Brakuje wymaganych danych:', {
        id_user: !!id_user,
        ulica: !!ulica,
        numer_domu: !!numer_domu,
        kod_pocztowy: !!kod_pocztowy,
        miasto: !!miasto,
        metoda_dostawy: !!metoda_dostawy,
        items: !!items,
        items_length: items ? items.length : 0
      });

      return res.status(400).json({
        success: false,
        message: 'Brakuje wymaganych danych zamówienia'
      });
    }

    console.log('Dane zwalidowane, wywołuję funkcję createOrder');

    // Wywołaj funkcję createOrder
    const result = await createOrder(
        id_user,
        ulica,
        numer_domu,
        kod_pocztowy,
        miasto,
        metoda_dostawy,
        powiadomienia_sms,
        suma,
        items
    );

    console.log('Wynik createOrder:', result);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Nie udało się złożyć zamówienia',
        error: result.error
      });
    }

    res.status(201).json({
      success: true,
      message: 'Zamówienie złożone pomyślnie',
      order_id: result.orderId,
      delivery_date: result.deliveryDate
    });
  } catch (error) {
    console.error('Błąd podczas przetwarzania zamówienia:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas składania zamówienia',
      error: error.message
    });
  }
});