class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI{
    static displayBooks(){
//     const storedBooks=[{
//         title:'Book One',
//         author:'Brade',
//         isbn:'123456'
//     },
//     {
//         title:'Book Second',
//         author:'peter',
//         isbn:'123456'
//     }
// ];
const books=Store.getBooks();
books.forEach((book)=>{
    UI.addBooktoList(book);
});     
    }
    static addBooktoList(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger delete col-2">X</a></td>`;
        list.appendChild(row);
    }
    static clearDisplay(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    static deleteBook(el){
    if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
    }
    }
    static showAlert(msg,className){
     const div=document.createElement('div');
     div.className=`alert alert-${className}`;
     div.appendChild(document.createTextNode(msg));
     const container=document.querySelector('.container');
     const form=document.querySelector('#book-form');
     container.insertBefore(div,form);
    // container.appendChild(div)
    setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }
}
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        let books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        let books=this.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}
//display book event
document.addEventListener('DOMContentLoaded',UI.displayBooks());
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    if(title===''||author===''||isbn===''){
     UI.showAlert('Please fill in all fields','danger');
    }
    else{
        const book=new Book(title,author,isbn);
        UI.addBooktoList(book);
        Store.addBook(book);
        UI.showAlert('book added succesfully!','success');
        UI.clearDisplay();
    }
    
});
document.querySelector('#book-list').addEventListener('click',(e)=>{
   UI.deleteBook(e.target);
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
   UI.showAlert('book removed successfully!','success')
//    console.log(e.target);
})