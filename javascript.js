// ================= FIREBASE =================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ================= FIREBASE CONFIG =================

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain:
  "YOUR_PROJECT.firebaseapp.com",

  projectId:
  "YOUR_PROJECT_ID",

  storageBucket:
  "YOUR_PROJECT.appspot.com",

  messagingSenderId:
  "XXXXXXXX",

  appId:
  "XXXXXXXX"

};

// ================= INIT =================

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

// ================= SAFE GET =================

function $(id){

  return document.getElementById(id);

}

// ================= ELEMENT =================

const roleText =
$("roleText");

const openLoginBtn =
$("openLoginBtn");

const openRegisterBtn =
$("openRegisterBtn");

const userProfile =
$("userProfile");

const logoutBtn =
$("logoutBtn");

// ================= USER =================

let currentUser = null;

// ================= CHECK LOGIN =================

function checkLogin(){

  const savedUser =
  localStorage.getItem(
    "bookrent_user"
  );

  if(savedUser){

    currentUser =
    JSON.parse(savedUser);

    roleText.textContent =
    currentUser.username;

    openLoginBtn.classList.add(
      "hidden"
    );

    openRegisterBtn.classList.add(
      "hidden"
    );

    userProfile.classList.remove(
      "hidden"
    );

    // ADMIN MODE

    if(currentUser.admin){

      $("userInterface")
      .classList.add("hidden");

      $("adminDashboard")
      .classList.remove("hidden");

      renderAdminBooks();

    }

  }

}

checkLogin();

// ================= LOGIN =================

const loginPopup =
$("loginPopup");

const closeLoginPopup =
$("closeLoginPopup");

if(openLoginBtn){

  openLoginBtn.addEventListener(
  "click", () => {

    loginPopup.classList.remove(
      "hidden"
    );

  });

}

if(closeLoginPopup){

  closeLoginPopup.addEventListener(
  "click", () => {

    loginPopup.classList.add(
      "hidden"
    );

  });

}

// ================= LOGIN SYSTEM =================

const loginBtn =
$("loginBtn");

if(loginBtn){

  loginBtn.addEventListener(
  "click", () => {

    const username =
    $("loginUsername")
    .value
    .trim();

    const password =
    $("loginPassword")
    .value
    .trim();

    // ADMIN

    if(
      username === "admin" &&
      password === "0007"
    ){

      currentUser = {

        username:"Admin",
        admin:true

      };

      localStorage.setItem(
        "bookrent_user",
        JSON.stringify(currentUser)
      );

      roleText.textContent =
      "Admin";

      openLoginBtn.classList.add(
        "hidden"
      );

      openRegisterBtn.classList.add(
        "hidden"
      );

      userProfile.classList.remove(
        "hidden"
      );

      $("userInterface")
      .classList.add("hidden");

      $("adminDashboard")
      .classList.remove("hidden");

      loginPopup.classList.add(
        "hidden"
      );

      renderAdminBooks();

      alert(
        "เข้าสู่ระบบแอดมินสำเร็จ"
      );

      return;

    }

    // USER LOGIN

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

    currentUser =
    foundUser;

    localStorage.setItem(
      "bookrent_user",
      JSON.stringify(foundUser)
    );

    roleText.textContent =
    foundUser.username;

    openLoginBtn.classList.add(
      "hidden"
    );

    openRegisterBtn.classList.add(
      "hidden"
    );

    userProfile.classList.remove(
      "hidden"
    );

    loginPopup.classList.add(
      "hidden"
    );

    alert(
      "เข้าสู่ระบบสำเร็จ"
    );

  });

}

// ================= LOGOUT =================

if(logoutBtn){

  logoutBtn.addEventListener(
  "click", () => {

    localStorage.removeItem(
      "bookrent_user"
    );

    location.reload();

  });

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

if(openRegisterBtn){

  openRegisterBtn.addEventListener(
  "click", () => {

    registerModal.classList.remove(
      "hidden"
    );

  });

}

if(closeRegisterModal){

  closeRegisterModal.addEventListener(
  "click", () => {

    registerModal.classList.add(
      "hidden"
    );

  });

}

// ================= ENABLE REGISTER =================

if(registerTermsCheck){

  registerTermsCheck.addEventListener(
  "change", () => {

    registerBtn.disabled =
    !registerTermsCheck.checked;

  });

}

// ================= REGISTER SYSTEM =================

if(registerBtn){

  registerBtn.addEventListener(
  "click", () => {

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

    const exists =
    users.find(user => {

      return (
        user.username === username
      );

    });

    if(exists){

      alert(
        "ชื่อผู้ใช้นี้ถูกใช้แล้ว"
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
      "bookrent_user",
      JSON.stringify(newUser)
    );

    currentUser =
    newUser;

    roleText.textContent =
    username;

    openLoginBtn.classList.add(
      "hidden"
    );

    openRegisterBtn.classList.add(
      "hidden"
    );

    userProfile.classList.remove(
      "hidden"
    );

    registerModal.classList.add(
      "hidden"
    );

    alert(
      "สมัครบัญชีสำเร็จ"
    );

  });

}

// ================= TERMS =================

const termsPopup =
$("termsPopup");

const openTermsPopup =
$("openTermsPopup");

const closeTermsPopup =
$("closeTermsPopup");

if(openTermsPopup){

  openTermsPopup.addEventListener(
  "click", () => {

    termsPopup.classList.remove(
      "hidden"
    );

  });

}

if(closeTermsPopup){

  closeTermsPopup.addEventListener(
  "click", () => {

    termsPopup.classList.add(
      "hidden"
    );

  });

}

// ================= IMAGE PREVIEW =================

const bookImage =
$("bookImage");

const previewImage =
$("previewImage");

let imageBase64 = "";

if(bookImage){

  bookImage.addEventListener(
  "change", function(){

    const file =
    this.files[0];

    if(file){

      const reader =
      new FileReader();

      reader.onload = function(){

        imageBase64 =
        reader.result;

        previewImage.src =
        reader.result;

        previewImage.classList.remove(
          "hidden"
        );

      };

      reader.readAsDataURL(file);

    }

  });

}

// ================= ADD BOOK =================

const bookForm =
$("bookForm");

if(bookForm){

  bookForm.addEventListener(
  "submit",
  async function(e){

    e.preventDefault();

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
    Array.from(checkedCategories)
    .map(item => item.value)
    .join(", ");

    const deposit =
    $("bookDeposit").value;

    if(!imageBase64){

      alert(
        "กรุณาใส่รูปหนังสือ"
      );

      return;

    }

    const newBook = {

      title,
      author,
      category,
      deposit,

      image:imageBase64,

      owner:
      currentUser.username,

      status:"pending"

    };

    await addDoc(

      collection(db,"books"),

      newBook

    );

    $("statusMessage").innerHTML =
    "⏳ ส่งข้อมูลสำเร็จ รอแอดมินอนุมัติ";

    this.reset();

    previewImage.classList.add(
      "hidden"
    );

    imageBase64 = "";

  });

}

// ================= RENDER BOOKS =================

async function renderApprovedBooks(){

  const approvedBooks =
  $("approvedBooks");

  approvedBooks.innerHTML = "";

  const querySnapshot =
  await getDocs(
    collection(db,"books")
  );

  querySnapshot.forEach(docItem => {

    const book =
    docItem.data();

    if(book.status !== "approved"){

      return;

    }

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
        class="rent-btn">

          เช่าหนังสือ

        </button>

      </div>

    `;

    approvedBooks.appendChild(card);

  });

}

renderApprovedBooks();

// ================= ADMIN =================

async function renderAdminBooks(){

  const adminBooks =
  $("adminBooks");

  adminBooks.innerHTML = "";

  const querySnapshot =
  await getDocs(
    collection(db,"books")
  );

  querySnapshot.forEach(docItem => {

    const book =
    docItem.data();

    const card =
    document.createElement("div");

    card.className =
    "admin-card";

    card.innerHTML = `

      <img src="${book.image}">

      <div class="admin-content">

        <h3>${book.title}</h3>

        <p>${book.author}</p>

        <p>${book.category}</p>

        <p>${book.deposit} บาท</p>

        <p>ผู้ปล่อย:
        ${book.owner}</p>

        <p>สถานะ:
        ${book.status}</p>

        <div class="admin-actions">

          <button
          class="approve-btn">

            อนุมัติ

          </button>

          <button
          class="reject-btn">

            ลบ

          </button>

        </div>

      </div>

    `;

    const approveBtn =
    card.querySelector(
      ".approve-btn"
    );

    const rejectBtn =
    card.querySelector(
      ".reject-btn"
    );

    // APPROVE

    approveBtn.addEventListener(
    "click",
    async () => {

      await updateDoc(

        doc(
          db,
          "books",
          docItem.id
        ),

        {
          status:"approved"
        }

      );

      renderAdminBooks();

      renderApprovedBooks();

    });

    // DELETE

    rejectBtn.addEventListener(
    "click",
    async () => {

      await deleteDoc(

        doc(
          db,
          "books",
          docItem.id
        )

      );

      renderAdminBooks();

      renderApprovedBooks();

    });

    adminBooks.appendChild(card);

  });

}

// ================= CATEGORY =================

const categoryButtons =
document.querySelectorAll(
".category-btn"
);

categoryButtons.forEach(button => {

  button.addEventListener(
  "click", () => {

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

  });

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

if(closeRentModal){

  closeRentModal.addEventListener(
  "click", () => {

    rentModal.classList.add(
      "hidden"
    );

  });

}

// ================= REVIEW =================

let selectedStars = 0;

const stars =
document.querySelectorAll(
".star-select span"
);

stars.forEach(star => {

  star.addEventListener(
  "click", () => {

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
      .classList.add("active");

    }

  });

});

// ================= SEND REVIEW =================

const submitReviewBtn =
$("submitReviewBtn");

if(submitReviewBtn){

  submitReviewBtn.addEventListener(
  "click",
  async () => {

    if(!currentUser){

      alert(
        "กรุณา Login ก่อน"
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

    await addDoc(

      collection(db,"reviews"),

      {

        user:
        currentUser.username,

        message,

        stars:
        selectedStars

      }

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

  });

}

// ================= RENDER REVIEW =================

async function renderReviews(){

  const reviewList =
  $("reviewList");

  reviewList.innerHTML = "";

  const querySnapshot =
  await getDocs(
    collection(db,"reviews")
  );

  querySnapshot.forEach(docItem => {

    const review =
    docItem.data();

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

renderReviews();
