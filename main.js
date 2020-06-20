let carts=document.querySelectorAll(".f");
let products=[
    {
      name:"sneaker women 1",
      tag:"sneakerwomen1",
      price:99.95,
      incart:0,
    },
    
    {
      name:"sneaker women 2",
      tag:"sneakerwomen2",
      price:64.95,
      incart:0,
    },
    
    {
      name:"sneaker women 3",
      tag:"sneakerwomen3",
      price:67.95,
      incart:0,
    },
    {
      name:"sneaker women 4",
      tag:"sneakerwomen4",
      price:69.95,
      incart:0,
    },
    {
      name:"T-shirt women 1",
      tag:"t-shirtwomen1",
      price:20.97,
      incart:0,
    },
    {
      name:"T-shirt women 2",
      tag:"t-shirtwomen2",
      price:29.95,
      incart:0,
    },
    {
      name:"T-shirt women 3",
      tag:"t-shirtwomen3",
      price:21.97,
      incart:0,
    },
    {
      name:"T-shirt women 4",
      tag:"t-shirtwomen4",
      price:24.95,
      incart:0,
    },
    {
      name:"Pants women 1",
      tag:"pantstwomen1",
      price:20.97,
      incart:0,
    },
    {
      name:"Pants women 2",
      tag:"pantstwomen2",
      price:29.95,
      incart:0,
    },
    {
      name:"Pants women 3",
      tag:"pantstwomen3",
      price:39.95,
      incart:0,
    },
     {
      name:"Pants women 4",
      tag:"pantstwomen4",
      price:59.95,
      incart:0,
     },
     {
      name:"Sneakers men 1",
      tag:"sneakerstmen1",
      price:74.95,
      incart:0,
     },
     {
      name:"Sneakers men 2",
      tag:"sneakerstmen2",
      price:75,
      incart:0,  
     },
     {
      name:"Sneakers men 3",
      tag:"sneakerstmen3",
      price:64.95,
      incart:0,
     },
     {
      name:"Sneakers men 4",
      tag:"sneakerstmen4",
      price:74.95,
      incart:0,
     },
     {
      name:"T-shirt men 1",
      tag:"t-shirtmen1",
      price:24.95,
      incart:0,  
     },
     {
      name:"T-shirt men 2",
      tag:"t-shirtmen2",
      price:24.95,
      incart:0, 
     },
     {
      name:"T-shirt men 3",
      tag:"t-shirtmen3",
      price:24.95,
      incart:0,  
     },
     {
      name:"T-shirt men 4",
      tag:"t-shirtmen4",
      price:24.95,
      incart:0, 
     },
     {
      name:"Pants men 1",
      tag:"pantsmen1",
      price:49.95,
      incart:0 , 
     },
     {
      name:"Pants men 2 ",
      tag:"pantsmen2",
      price:34.97,
      incart:0,  
     },
     {
      name:"Pants men 3",
      tag:"pantsmen3",
      price:39.95,
      incart:0,  
     },
     {
      name:"Pants men 4",
      tag:"pantsmen4",
      price:48.97,
      incart:0,  
     }
  
  ]
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function OnLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }

}
function cartNumbers(product){
   
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if (productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
   setItems(product);
}
function setItems(product){
    let cartItems=localStorage.getItem('ProductsInCart')
    cartItems=JSON.parse(cartItems);
    if (cartItems != null){
        if (cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].incart += 1;
    }else{
        product.incart=1;
        cartItems={
          [product.tag]:product
    }
    }
    
    localStorage.setItem('ProductsInCart',JSON.stringify(cartItems));
     
}
function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
     
     if (cartCost != null){
        cartCost=parseInt(cartCost);
         localStorage.setItem('totalCost', cartCost + product.price);
     }else{
        localStorage.setItem('totalCost',product.price)
     }
    
}
function displayCart() {
    let cartItems=localStorage.getItem('ProductsInCart');
    cartItems= JSON .parse (cartItems);
    let productContainer=document.querySelector(".products")
    let cartCost=localStorage.getItem('totalCost');

    if(cartItems && productContainer){
      productContainer.innerHTML = ''; 
      Object.values(cartItems).map(item => {
          productContainer.innerHTML += `
           <div class="product-title">
            <img src="./res/./ADIDAS PHOTOS/${item.tag}.jpg">
            <span>${item.name}</span> 
            <button class='btn btn-danger' type='button'>-</button>
          </div>
          <div class="price">€${item.price}</div>
          <div class="quantity">
          <span>${item.incart}</span>
          </div>
          <div class="total">
             €${item.incart* item.price}
          </div>`
      });
    
      productContainer.innerHTML += `
        <div class='BasketTotalContainer'>
          <h4 class='BasketTotalTitle'>
           Basket Total
          </h4>
          <h4 class='BasketTotal'>
            €${cartCost}
          </h4>
        </div>`
      
        var minus=document.getElementsByClassName("btn-danger")
        console.log(minus)
       for(var i=0 ; i < minus.length ; i++){
    var button=minus[i];
    button.addEventListener('click', function(event) {
      var buttonClicked=event.target
      buttonClicked.parentNode.parentNode.remove()
    })
    upadateCartTotal()
  }
  
  
  function upadateCartTotal(){
    var cartItemContainer=document.getElementsByClassName("products-container")[0]
    var cartRows=cartItemContainer.getElementsByClassName("product-header")
    for(var i=0 ; i <cartRows.length ; i++){
      var cartRow=cartRows[i]
      var priceElement=cartRow.getElementsByClassName('price')[0]
      var quantityElement=cartRow.getElementsByClassName('quantity')[0]
      console.log( priceElement,quantityElement)
  }
 }
    }
  }
   OnLoadCartNumbers();
   displayCart();

