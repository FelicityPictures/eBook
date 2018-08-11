document.addEventListener("DOMContentLoaded", renderBook);

var bookWidth = 0.2;
var bookHeight = 0.3;
var bookDepth = 0.05;
var bookCoverWidth = bookWidth + 0.01;
var bookCoverDepth = 0.01;
var pageDepth = 0.001;
var bookIsOpen = false;

var book;
const book_left = document.querySelector("#book-left");
const book_right = document.querySelector("#book-right");
console.log(book);

function renderBook(){
  book = document.querySelector("#book");
  const book_back_cover = document.querySelector('#book-back-cover');
  var bbc = leftBottomFront(0, 0, 0, bookCoverWidth, bookHeight, bookCoverDepth);
  book_back_cover.innerHTML = `<a-box position="${bbc[0]} ${bbc[1]} ${bbc[2]}"
                             width="${bookCoverWidth}" height="${bookHeight}" depth="${bookCoverDepth}"
                             color="tomato"></a-box>`;

  const book_right_pages = document.querySelector('#book-right-pages');
  var brp = leftBottomFront(0, 0, bookCoverDepth, bookWidth, bookHeight, bookDepth);
  book_right_pages.innerHTML = `<a-box position="${brp[0]} ${brp[1]} ${brp[2]}"
                             width="${bookWidth}" height="${bookHeight}" depth="${bookDepth}"
                             color="white"></a-box>`;

  const book_left_pages = document.querySelector('#book-left-pages');
  var blp = leftBottomFront(0, 0, bookCoverDepth+bookDepth, bookWidth, bookHeight, pageDepth);
  book_left_pages.innerHTML = `<a-box position="${blp[0]} ${blp[1]} ${blp[2]}"
                            width="${bookWidth}" height="${bookHeight}" depth="${pageDepth}"
                            color="pink"></a-box>`;

  const book_front_cover = document.querySelector('#book-front-cover');
  var bfc = leftBottomFront(0, 0, bookCoverDepth+bookDepth+pageDepth, bookCoverWidth, bookHeight, bookCoverDepth);
  book_front_cover.innerHTML = `<a-box position="${bfc[0]} ${bfc[1]} ${bfc[2]}"
                            width="${bookCoverWidth}" height="${bookHeight}" depth="${bookCoverDepth}"
                            color="tomato"></a-box>`;

  const book_binding = document.querySelector('#book-binding');
  var bb = rightBottomBack(0, 0, 0, bookCoverDepth, bookHeight, (bookCoverDepth*2)+bookDepth+pageDepth);
  book_binding.innerHTML = `<a-box position="${bb[0]} ${bb[1]} ${bb[2]}"
                            width="${bookCoverDepth}" height="${bookHeight}" depth="${(bookCoverDepth*2)+bookDepth}"
                            color="tomato"></a-box>`;
}

AFRAME.registerComponent('camview', {
  tick: function () {
    if (bookIsOpen === true){ //The ball actually starts as static-body underneath the green platform.  Once I turn this boolean variable to false, the ball begins to follow the player. (Note: It's still a static-body when following the player!)
      var playerX = this.el.object3D.position.x;
      var playerY = this.el.object3D.position.y; // We use these variables to access the player's position;
      var playerZ = this.el.object3D.position.z;
      // console.log("tick working");
      // console.log(book);
      book.setAttribute("position", `${playerX} ${playerY-.35} ${playerZ - .5}`);
    }
  }
});


window.addEventListener("keydown", e => {
  console.log(e.keyCode);
    if (e.keyCode == 32 && bookIsOpen){
      bookDown();
    }else{
      if(e.keyCode == 32 && !bookIsOpen){
        bookUp();
      }
    }
    // if (e.keyCode == 32 && bookIsOpen == true) {
    //     closeBook();
    // };
});

function bookDown() {
    bookIsOpen = false;
    book.removeAttribute("static-body");
    book.setAttribute("dynamic-body","");
}

function bookUp() {
    bookIsOpen = true;
    book.removeAttribute("dynamic-body");
    book.setAttribute("static-body","");
}
