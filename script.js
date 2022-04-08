let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    var b = new Book (
        title = bookTitle.value,
        author = bookAuthor.value,
        pages = bookPages.value,
        read = bookRead.value,
    )
    myLibrary.push(b);
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
    addBookToLibrary();
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
        html+="<td>"+myLibrary[j].read+"</td>";
        if (myLibrary[j].read == "6") {
            html+="<td>"+"<button id=\"readStatus\">Not Read</button>"+"</td>";
        }
        else {
            html+="<td>"+"<button id=\"readStatus\">Read</button>"+"</td>";
        }
        html+="<td>"+`<button data-index=${j} id=\"delete\">X</button>`+"</td>";
        
        html+="</tr>";
        
    }
    html+="</table>";
    document.getElementById("tableContainer").innerHTML = html;
    
    buttonClickEvent(); //need to prevent adding multiple listeners
    //maybe just use onclick
}

function buttonClickEvent () {
    document.getElementById("tableContainer").addEventListener("click",function(f) {
        if (f.target.id === "readStatus") {
            changeReadStatus();
            return;
        } else if (f.target.id === "delete") {
            deleteBook(f);
            return;
        }
    });
}

//make this work with multiple books
//read and unread isn't showing correctly in button
function changeReadStatus() {
    const btn = document.getElementById("readStatus");

        if (btn.innerText === "Read") {
            btn.innerText = "Not Read"
        } else if (btn.innerText === "Not Read") {
            btn.innerText = "Read"
        }
}

//make this delete from array then redisplayBooks
//get index from button, delete from array using splice
function deleteBook(f) {
    // var pos = f.target.getAttribute("index");
    var pos = f.target.getAttribute("data-index");
    // console.log(pos);
    console.log(pos);
    //remove row
    // var td = f.target.parentNode; 
    // var tr = td.parentNode;
    // tr.parentNode.removeChild(tr);
    // var rowInos);

    // myLibrary.splice(pos, 1);
}

// const showBook = document.getElementById("showBook").addEventListener("click", displayBooks);
const newBook = document.getElementById("addBook").addEventListener("click", addBook);