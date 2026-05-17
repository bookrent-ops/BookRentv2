// ================= SAFE GET =================

function $(id){
  return document.getElementById(id);
}

// ================= ELEMENTS =================

const roleText = $("roleText");

const openLoginBtn =
$("openLoginBtn");

const openRegisterBtn =
$("openRegisterBtn");

const userProfile =
$("userProfile");

const logoutBtn =
$("logoutBtn");

// ================= UPDATE UI =================

function updateUI(){

  const currentUser =
  JSON.parse(
    localStorage.getItem("currentUser")
  );

  if(currentUser){

    roleText.textContent =
    currentUser.username;

    userProfile.classList.remove(
      "hidden"
    );

    openLoginBtn.classList.add(
      "hidden"
    );

    openRegisterBtn.classList.add(
      "hidden"
    );

  }else{

    roleText.textContent =
    "Guest";

    userProfile.classList.add(
      "hidden"
    );

    openLoginBtn.classList.remove(
      "hidden"
    );

    openRegisterBtn.classList.remove(
      "hidden"
    );

  }

}

// ================= LOGIN =================

const loginPopup =
$("loginPopup");

const closeLoginPopup =
$("closeLoginPopup");

const loginBtn =
$("loginBtn");

// OPEN LOGIN

if(openLoginBtn){

  openLoginBtn.addEventListener(
    "click",
    () => {

      loginPopup.classList.remove(
        "hidden"
      );

    }
  );

}

// CLOSE LOGIN

if(closeLoginPopup){

  closeLoginPopup.addEventListener(
    "click",
    () => {

      loginPopup.classList.add(
        "hidden"
      );

    }
  );

}

// LOGIN SYSTEM

if(loginBtn){

  loginBtn.addEventListener(
    "click",
    () => {

      const username =
      $("loginUsername")
      .value
      .trim();

      const password =
      $("loginPassword")
      .value
      .trim();

      // ================= ADMIN =================

      if(
        username === "admin" &&
        password === "0007"
      ){

        localStorage.setItem(
          "currentUser",

          JSON.stringify({
            username:"Admin",
            role:"admin"
          })

        );

        loginPopup.classList.add(
          "hidden"
        );

        $("userInterface")
        .classList.add(
          "hidden"
        );

        $("adminDashboard")
        .classList.remove(
          "hidden"
        );

        renderAdminBooks();

        updateUI();

        alert(
          "เข้าสู่ระบบแอดมินสำเร็จ"
        );

        return;

      }

      // ================= USER LOGIN =================

      let users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

      const foundUser =
      users.find(user => {

        return (
          user.username === username &&
          user.password === password
        );

      });

      if(!foundUser){

        alert(
          "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
        );

        return;

      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify(foundUser)
      );

      loginPopup.classList.add(
        "hidden"
      );

      updateUI();

      alert(
        "เข้าสู่ระบบสำเร็จ"
      );

    }
  );

}

// ================= REGISTER =================

const registerModal =
$("registerModal");

const closeRegisterModal =
$("closeRegisterModal");

const registerBtn =
$("registerBtn");

const registerTermsCheck =
$("registerTermsCheck");

// OPEN REGISTER

if(openRegisterBtn){

  openRegisterBtn.addEventListener(
    "click",
    () => {

      registerModal.classList.remove(
        "hidden"
      );

    }
  );

}

// CLOSE REGISTER

if(closeRegisterModal){

  closeRegisterModal.addEventListener(
    "click",
    () => {

      registerModal.classList.add(
        "hidden"
      );

    }
  );

}

// ENABLE REGISTER BUTTON

if(registerTermsCheck){

  registerTermsCheck.addEventListener(
    "change",
    () => {

      registerBtn.disabled =
      !registerTermsCheck.checked;

    }
  );

}

// REGISTER SYSTEM

if(registerBtn){

  registerBtn.addEventListener(
    "click",
    () => {

      const username =
      $("registerUsername")
      .value
      .trim();

      const phone =
      $("registerPhone")
      .value
      .trim();

      const password =
      $("registerPassword")
      .value;

      const confirmPassword =
      $("registerConfirmPassword")
      .value;

      if(
        !username ||
        !phone ||
        !password ||
        !confirmPassword
      ){

        alert(
          "กรอกข้อมูลให้ครบ"
        );

        return;

      }

      if(password !== confirmPassword){

        alert(
          "รหัสผ่านไม่ตรงกัน"
        );

        return;

      }

      let users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

      const userExists =
      users.find(user => {

        return (
          user.username === username
        );

      });

      if(userExists){

        alert(
          "ชื่อผู้ใช้นี้มีอยู่แล้ว"
        );

        return;

      }

      const newUser = {

        username,
        phone,
        password

      };

      users.push(newUser);

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify(newUser)
      );

      registerModal.classList.add(
        "hidden"
      );

      updateUI();

      alert(
        "สมัครบัญชีสำเร็จ"
      );

    }
  );

}

// ================= LOGOUT =================

if(logoutBtn){

  logoutBtn.addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        "currentUser"
      );

      location.reload();

    }
  );

}

// ================= TERMS =================

const openTermsPopup =
$("openTermsPopup");

const termsPopup =
$("termsPopup");

const closeTermsPopup =
$("closeTermsPopup");

if(openTermsPopup){

  openTermsPopup.addEventListener(
    "click",
    () => {

      termsPopup.classList.remove(
        "hidden"
      );

    }
  );

}

if(closeTermsPopup){

  closeTermsPopup.addEventListener(
    "click",
    () => {

      termsPopup.classList.add(
        "hidden"
      );

    }
  );

}

// ================= IMAGE PREVIEW =================

const bookImage =
$("bookImage");

const previewImage =
$("previewImage");

if(bookImage){

  bookImage.addEventListener(
    "change",
    function(){

      const file =
      this.files[0];

      if(file){

        const reader =
        new FileReader();

        reader.onload = function(){

          previewImage.src =
          reader.result;

          previewImage.classList.remove(
            "hidden"
          );

        };

        reader.readAsDataURL(file);

      }

    }
  );

}

// ================= SUBMIT BOOK =================

const bookForm =
$("bookForm");

if(bookForm){

  bookForm.addEventListener(
    "submit",
    function(e){

      e.preventDefault();

      const currentUser =
      JSON.parse(
        localStorage.getItem(
          "currentUser"
        )
      );

      if(!currentUser){

        alert(
          "กรุณา Login ก่อน"
        );

        return;

      }

      const title =
      $("bookTitle").value;

      const author =
      $("bookAuthor").value;

      const checkedCategories =
      document.querySelectorAll(
      '.multi-category input:checked'
      );

      const category =
      Array.from(
        checkedCategories
      )
      .map(item => item.value)
      .join(", ");

      const deposit =
      $("bookDeposit").value;

      const image =
      previewImage.src;

      if(!image){

        alert(
          "กรุณาใส่รูปหนังสือ"
        );

        return;

      }

      const newBook = {

        id: Date.now(),

        title,
        author,
        category,
        deposit,
        image,

        owner:
        currentUser.username,

        status:"pending"

      };

      let books =
      JSON.parse(
        localStorage.getItem("books")
      ) || [];

      books.push(newBook);

      localStorage.setItem(
        "books",
        JSON.stringify(books)
      );

      $("statusMessage").innerHTML =
      "⏳ รอแอดมินตรวจสอบ";

      this.reset();

      previewImage.classList.add(
        "hidden"
      );

    }
  );

}

// ================= ADMIN =================

function renderAdminBooks(){

  const adminBooks =
  $("adminBooks");

  adminBooks.innerHTML = "";

  let books =
  JSON.parse(
    localStorage.getItem("books")
  ) || [];

  books.forEach(book => {

    const card =
    document.createElement("div");

    card.className =
    "admin-card";

    card.innerHTML = `

      <img src="${book.image}">

      <div class="admin-content">

        <h3>${book.title}</h3>

        <p>ผู้เขียน: ${book.author}</p>

        <p>หมวดหมู่: ${book.category}</p>

        <p>มัดจำ: ${book.deposit} บาท</p>

        <p>ผู้ปล่อย: ${book.owner}</p>

        <p>สถานะ: ${book.status}</p>

        <div class="admin-actions">

          <button
          class="approve-btn"
          onclick="approveBook(${book.id})">

            อนุมัติ

          </button>

          <button
          class="reject-btn"
          onclick="rejectBook(${book.id})">

            ปฏิเสธ

          </button>

        </div>

      </div>

    `;

    adminBooks.appendChild(card);

  });

}

// ================= APPROVE =================

function approveBook(id){

  let books =
  JSON.parse(
    localStorage.getItem("books")
  ) || [];

  books = books.map(book => {

    if(book.id === id){

      book.status =
      "approved";

    }

    return book;

  });

  localStorage.setItem(
    "books",
    JSON.stringify(books)
  );

  renderAdminBooks();

  renderApprovedBooks();

}

// ================= REJECT =================

function rejectBook(id){

  let books =
  JSON.parse(
    localStorage.getItem("books")
  ) || [];

  books = books.filter(book => {

    return book.id !== id;

  });

  localStorage.setItem(
    "books",
    JSON.stringify(books)
  );

  renderAdminBooks();

}

// ================= RENDER BOOKS =================

function renderApprovedBooks(){

  const approvedBooks =
  $("approvedBooks");

  approvedBooks.innerHTML = "";

  let books =
  JSON.parse(
    localStorage.getItem("books")
  ) || [];

  books
  .filter(book =>
    book.status === "approved"
  )
  .forEach(book => {

    const card =
    document.createElement("div");

    card.className =
    "book-card";

    card.setAttribute(
      "data-category",
      book.category
    );

    card.innerHTML = `

      <img src="${book.image}">

      <div class="book-content">

        <h3>${book.title}</h3>

        <p>${book.author}</p>

        <p>${book.category}</p>

        <p>มัดจำ ${book.deposit} บาท</p>

        <button
        class="rent-btn"
        onclick='openRentModal(${JSON.stringify(book)})'>

          เช่าหนังสือ

        </button>

      </div>

    `;

    approvedBooks.appendChild(card);

  });

}

// ================= CATEGORY FILTER =================

const categoryButtons =
document.querySelectorAll(
".category-btn"
);

categoryButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      categoryButtons.forEach(btn => {

        btn.classList.remove(
          "active"
        );

      });

      button.classList.add(
        "active"
      );

      const category =
      button.dataset.category;

      const cards =
      document.querySelectorAll(
        ".book-card"
      );

      cards.forEach(card => {

        if(
          category === "all" ||
          card.dataset.category.includes(category)
        ){

          card.style.display =
          "block";

        }else{

          card.style.display =
          "none";

        }

      });

    }
  );

});

// ================= RENT MODAL =================

const rentModal =
$("rentModal");

const closeRentModal =
$("closeRentModal");

function openRentModal(book){

  rentModal.classList.remove(
    "hidden"
  );

  $("rentBookImage").src =
  book.image;

  $("rentBookTitle").textContent =
  book.title;

  $("rentBookAuthor").textContent =
  "ผู้เขียน: " + book.author;

  $("rentBookCategory").textContent =
  "หมวดหมู่: " + book.category;

  $("rentBookDeposit").textContent =
  "ค่ามัดจำ: " +
  book.deposit +
  " บาท";

}

// CLOSE RENT

if(closeRentModal){

  closeRentModal.addEventListener(
    "click",
    () => {

      rentModal.classList.add(
        "hidden"
      );

    }
  );

}

// CONFIRM RENT

const confirmRentBtn =
document.querySelector(
".confirm-rent-btn"
);

if(confirmRentBtn){

  confirmRentBtn.addEventListener(
    "click",
    () => {

      alert(
        "✅ ส่งคำขอเช่าหนังสือสำเร็จ"
      );

      rentModal.classList.add(
        "hidden"
      );

    }
  );

}

// ================= REVIEWS =================

let selectedStars = 0;

const stars =
document.querySelectorAll(
".star-select span"
);

stars.forEach(star => {

  star.addEventListener(
    "click",
    () => {

      selectedStars =
      star.dataset.star;

      stars.forEach(s => {

        s.classList.remove(
          "active"
        );

      });

      for(
        let i = 0;
        i < selectedStars;
        i++
      ){

        stars[i]
        .classList.add(
          "active"
        );

      }

    }
  );

});

// ================= SUBMIT REVIEW =================

const submitReviewBtn =
$("submitReviewBtn");

if(submitReviewBtn){

  submitReviewBtn.addEventListener(
    "click",
    () => {

      const currentUser =
      JSON.parse(
        localStorage.getItem(
          "currentUser"
        )
      );

      if(!currentUser){

        alert(
          "กรุณา Login ก่อนรีวิว"
        );

        return;

      }

      const message =
      $("reviewMessage")
      .value
      .trim();

      if(
        !message ||
        selectedStars == 0
      ){

        alert(
          "กรอกข้อความและเลือกดาว"
        );

        return;

      }

      const review = {

        user:
        currentUser.username,

        message,

        stars:
        selectedStars

      };

      let reviews =
      JSON.parse(
        localStorage.getItem(
          "reviews"
        )
      ) || [];

      reviews.unshift(review);

      localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
      );

      $("reviewMessage").value =
      "";

      selectedStars = 0;

      stars.forEach(s => {

        s.classList.remove(
          "active"
        );

      });

      renderReviews();

    }
  );

}

// ================= RENDER REVIEWS =================

function renderReviews(){

  const reviewList =
  $("reviewList");

  reviewList.innerHTML = "";

  let reviews =
  JSON.parse(
    localStorage.getItem("reviews")
  ) || [];

  reviews.forEach(review => {

    const card =
    document.createElement("div");

    card.className =
    "review-card";

    let starHTML = "";

    for(
      let i = 0;
      i < review.stars;
      i++
    ){

      starHTML += "★";

    }

    card.innerHTML = `

      <div class="review-top">

        <div class="review-user">

          ${review.user}

        </div>

        <div class="review-stars">

          ${starHTML}

        </div>

      </div>

      <div class="review-text">

        ${review.message}

      </div>

    `;

    reviewList.appendChild(card);

  });

}

// ================= INIT =================

updateUI();

renderApprovedBooks();

renderReviews();

const currentUser =
JSON.parse(
  localStorage.getItem(
    "currentUser"
  )
);

if(
  currentUser &&
  currentUser.role === "admin"
){

  $("userInterface")
  .classList.add(
    "hidden"
  );

  $("adminDashboard")
  .classList.remove(
    "hidden"
  );

  renderAdminBooks();

}