export function getBooks() {
    fetch("http://localhost:8080/get/books")
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result);
            return result;
        },
        (error) => {
            console.log(error);
            return [];
        }
      )
  }