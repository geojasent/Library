let myLibrary = [];

//refactored into class instead of constructor
class makeBook {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    addBooktoLibrary(book) {
        myLibrary.push(book);
    }
}

function addBook() {
    var element = document.getElementById("container");
    
    const e = document.createElement("div");
    e.setAttribute("id", "form");
    e.innerHTML = "Fill out the form below and press submit! <br><br>";
    element.appendChild(e);
    
    var inputBookTitle = document.createElement("input");
    inputBookTitle.setAttribute("type","text");
    inputBookTitle.setAttribute("id","bookTitle");
    inputBookTitle.setAttribute("placeholder","Book Title");
    
    var inputBookAuthor = document.createElement("input");
    inputBookAuthor.setAttribute("type","text");
    inputBookAuthor.setAttribute("id","bookAuthor");
    inputBookAuthor.setAttribute('placeholder',"Author");
    
    var inputBookPages = document.createElement("input");
    inputBookPages.setAttribute("type","integer");
    inputBookPages.setAttribute("id","bookPages");
    inputBookPages.setAttribute("placeholder","Number of Pages");
    
    var inputBookRead = document.createElement("input");
    inputBookRead.setAttribute("type","text");
    inputBookRead.setAttribute("id","bookRead");
    inputBookRead.setAttribute("placeholder","Has this book been read? (Y/N)");
    
    var s = document.createElement("button"); 
    s.innerHTML = "Submit";
    s.setAttribute("type","submit");
    s.setAttribute("id","submit");
    s.setAttribute("value","Submit");
    
    e.appendChild(inputBookTitle);
    e.appendChild(inputBookAuthor);
    e.appendChild(inputBookPages);
    e.appendChild(inputBookRead);
    e.appendChild(s);
    
    element.replaceWith(e);
    const f = document.getElementById("submit");
    f.addEventListener("click", submit);
}

function submit() {
    var bookInput = new makeBook(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookRead.value
    )
    bookInput.addBooktoLibrary(bookInput);
    assignIndex();
    clearInput();
    displayBooks();
}

function assignIndex() {
    var myLibraryIndex  = myLibrary.map((item, index) => {
        return {"index": index + 1, ...item};
    });
    myLibrary = myLibraryIndex;
}

function clearInput() {
    const inputs = document.querySelectorAll("#bookTitle, #bookAuthor, #bookPages, #bookRead");
        
    inputs.forEach(input => {
        input.value = '';
    });
}

function displayBooks() {
    var html = "<table border='1|1'>";
    for (var j = 0; j < myLibrary.length; j++) {
        html+="<tr>";
        html+="<td>"+myLibrary[j].title+"</td>";
        html+="<td>"+myLibrary[j].author+"</td>";
        html+="<td>"+myLibrary[j].pages+"</td>";
        if (myLibrary[j].read == "Y") {
            html+="<td>"+`<button id=\"readStatus\" onclick=\"changeReadStatus()\">Read</button>`+"</td>";
        }
        else {
            html+="<td>"+"<button id=\"readStatus\" onclick=\"changeReadStatus()\">Not Read</button>"+"</td>";
        }
        html+="<td>"+`<button data-index=${j} id=\"delete\" onclick=\"deleteBook()\">X</button>`+"</td>";
        
        html+="</tr>";
        
    }
    html+="</table>";
    document.getElementById("tableContainer").innerHTML = html;
}

function changeReadStatus() {
    var buttonText = event.target.innerText;
        if (buttonText === "Read") {
            event.target.innerText = "Not Read";
        } else {
            event.target.innerText = "Read";
        }
    }
    
//get index from button, delete from array using splice
function deleteBook() {
    var td = event.target.parentNode; 
    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);
    var pos = event.target.getAttribute("index");
    var pos = event.target.getAttribute("data-index");
    myLibrary.splice(pos, 1);
}

newBook = document.getElementById("addBook").addEventListener("click", addBook);