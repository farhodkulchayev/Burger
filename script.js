let food = {
    plainBurger: {
        name: "GAMBURGER",
        price: 10000,
        amount: 0,
        kcall: 650,
        get calcSum() {
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        },
    },
    freshBurger: {
        name: "GAMBURGER FRESH",
        price: 20500,
        amount: 0,
        kcall: 750,
        get calcSum() {
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        },
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        amount: 0,
        kcall: 850,
        get calcSum() {
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        },
    },
}

let btn = document.querySelectorAll(".main__product-btn")

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        // console.log(this.closest(".main__product").getAttribute("id"));
        prepare(this)
    })
}
// Делегирование
function prepare(item) {
    // console.log(item); btn!!!
    let parent = item.closest(".main__product") /* main__product */
    let parentID = parent.getAttribute("id") /* plainBurger ... */
    let num = parent.querySelector(".main__product-num")
    let price = parent.querySelector(".main__product-price span")
    let kcall = parent.querySelector(".main__product-kcall span")
    let sym = item.getAttribute("data-symbol")
    // console.log(parent);
    // console.log(food[parentID]);
    let count = food[parentID].amount

    if (sym == "+") {
        count++
    } else if (sym == "-" && count > 0) {
        count--
    }
    food[parentID].amount = count
    
    num.innerHTML = count
    price.innerHTML = food[parentID].calcSum
    kcall.innerHTML = food[parentID].calcKcall
}

let lev = document.querySelector(".header__timer-extra")
let stop
let speed = 20;

function recLev() {
    stop = setTimeout(() => {
        recLev()
        lev.innerHTML++
        if (lev.innerHTML == 50) {
            speed = 50
        } else if (lev.innerHTML == 80) {
            speed = 100;
        } else if (lev.innerHTML == 100) {
            clearInterval(stop)
        }
    }, speed);
}

recLev()

let receipt = document.querySelector(".receipt")
let receiptWindow = receipt.querySelector(".receipt__window")
let receiptWindowOut = receipt.querySelector(".receipt__window-out")
let receiptWindowBtn = receipt.querySelector(".receipt__window-btn")
let addCart = document.querySelector(".addCart")

addCart.addEventListener("click", function () {
    receipt.style.display = "flex"
    setTimeout(() => {
        receipt.style.opacity = "1"
        receiptWindow.style.top = "25%"
    }, 100);

    let menu = "Your cart: \n\n"
    let totalPrice = 0
    let totalKcall = 0

    for (const key in food) {
        // console.log(food[key].name);
        if (food[key].amount) {
            menu += `${food[key].name} ${food[key].amount}x ${food[key].calcSum} \n`
            totalPrice += food[key].calcSum
            totalKcall += food[key].calcKcall
        }
    }
    receiptWindowOut.innerHTML = `${menu}\nTotal price: ${totalPrice} so'm\nTotal calories: ${totalKcall} calories`
})

receiptWindowBtn.addEventListener("click", function () {
    // location = "https://chrome.google.com/webstore/category/extensions?hl=ru";
    location.reload()
})

receipt.addEventListener("click", function (e) {
    // console.log(e);
    // console.log(e.target);
    // console.log(e.currentTarget); receipt
    if (e.target === e.currentTarget) {
        receipt.style.opacity = "0"
        receiptWindow.style.top = "-100%"
        setTimeout(() => {
            receipt.style.display = "none"
        }, 200);
    }
})

let infoImg = body.querySelectorAll(".main__product-info")

for (let i = 0; i < infoImg.length; i++) {
    infoImg[i].addEventListener("click", function () {
        showImg(this)
    })
}

function showImg(viewIMG) {
    let parent = viewIMG.closest(".main__product")
    let viewImg = body.querySelector(".view")
    let image = body.querySelector(".view img")
    let proImg = parent.querySelector(".main__product-info img")
    let viewClose = body.querySelector(".view__close")
    
    viewImg.classList.add("active")
    
    let x = proImg.getAttribute("src")
    image.removeAttribute("src")
    
    if (proImg.hasAttribute("src")) {
        image.setAttribute("src", `${x}`)
    }
    
    viewImg.addEventListener("click", function (e) {
        if (e.target === e.currentTarget) {
            viewImg.classList.remove("active")
        }
    })
    
    viewClose.addEventListener("click", function () {
        viewImg.classList.remove("active")
    })
}