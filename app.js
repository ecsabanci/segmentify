new Splide( '#splide', {
    type: "loop",
    perPage: 3,
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


                    ${product.oldPrice ? 
                    
                        `<span class=discount> - ${Math.round( (product.oldPrice-product.price) / product.oldPrice * 100)}% </span> `

                        :

                        ""
                    
                    }


                    ${product.params.likeCount ? 
                        `<span class=like-number>  <img id=heart-image src=./heart.svg />  ${product.params.likeCount} </span>`

                        :

                        ""
                    }


                    ${product.params.isNew ? 
                        
                        "<span class=isNew> NEU </span>"
                        :

                        ""
                    }
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
                        <h4 class="price"> ${product.priceText.slice(1)} ${product.priceText[0]} * </h4>
                        <h4 class="old-price"> ${(product.oldPriceText ? product.oldPriceText.slice(1) + " " + product.oldPriceText[0] +" *": "")} </h4>
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


