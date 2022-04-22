export function getBooks() {
    fetch("http://localhost:8080/get/books")
      .then(res => res.json())
      .then(
        (result) => {
            return result;
        },
        (error) => {
            return [];
        }
      )
  }