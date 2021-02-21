console.log(window.innerWidth)

new Splide( '.splide', {
    type: "loop",
    perPage: 30,
    rewind : true,
    perMove: 3,
    autoWidth: true
} ).mount();

const getProducts = async () => {
    const response = await fetch("./components.json")

    const data = await response.json()

    showData(data)
};


const showData = (data) => {
    
    const productEl = data.map((product,index) => {
        return (
            `
            <ul>
            <li id=${index} class="splide__slide">

                <div class="other-details">
                    <span class="discount">
                        ${
                            (product.oldPrice ? "-"+Math.round( (product.oldPrice-product.price) / product.oldPrice * 100 )+ "%" : "")
                        }
                    </span>
                    <span class="like-number">
                        ${
                            (product.params.likeCount ? `<img id="heart-image" src="./heart.svg" /> ` +product.params.likeCount : "")
                        }
                    </span>
                </div>

                <img src=${product.image} alt="">
                <p> ${product.name} </p>

                <span class="details">
                    ${
                        (
                            (product.params.land ? product.params.land : "") + 
                            (product.params.region ? " | "+product.params.region : "") +
                            (product.params.art ? " | "+product.params.art : "") +
                            (product.params.rebsorte ? " | "+product.params.rebsorte : "")
                        )
                    }
                </span>

                <div class="prices">
                    <div class="main-prices">
                        <h4 class="price"> ${product.price} £ * </h4>
                        <h4 class="old-price"> ${(product.oldPrice ? product.oldPrice+" £ *" : "")} </h4>
                    </div>
                    <div class="base-price"> ${product.params.basePrice} </div>
                </div>
                
            </li>
            </ul>
            `
        )
    })
    let slideList = document.querySelector(".splide__list");
    
    productEl.forEach(product => slideList.innerHTML += product);

}

getProducts();


