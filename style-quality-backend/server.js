import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProducts , getProduct, getProductsByCategory, loginUser, getUserById, registerUser, checkUserExists} from './database.js';

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