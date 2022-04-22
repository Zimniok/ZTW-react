import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BooksList from "./routes/books-list";
import BooksModify from "./routes/books-modify";

import BooksPage from "./routes/books-page";
import AuthorsPage from "./routes/authors-page";
import ClientsPage from "./routes/clients-page";
import LendsPage from "./routes/lends-page";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="books/" element={<BooksPage />}>
          <Route path="list" element={<BooksList />} />
          <Route path="modify" element={<BooksModify />} />
        </Route>
        <Route path="authors/" element={<AuthorsPage />} />
        <Route path="clients/" element={<ClientsPage />} />
        <Route path="lends/" element={<LendsPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404 There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);