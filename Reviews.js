  
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    
    let swipperWrapper = document.querySelector(".swiper-wrapper")

    window.addEventListener("DOMContentLoaded", function() {
      renderReviews();
    })

    
    function renderReviews() {
      if(reviews.length === 0) {
        swipperWrapper.innerHTML = `<p class="alert">The Game has No Review Yet<p>`
      }
      else {
        swipperWrapper.innerHTML = ""

        reviews.forEach(item => {
          let {name, message, stars} = item;

          let starsHTML = "";

          for (let i = 1; i <= 5; i++) {
            const activeClass = i <= stars ? "active" : "";
            starsHTML += `<i class="fa-solid fa-star ${activeClass}" data-id="${i}"></i>`;
          }

          swipperWrapper.innerHTML += `
          <div class="swiper-slide">
          <p class="customer-message">${message}</p>
          <h2 class="customer-name">-${name}</h2>
          <div class="customer-rate">
            <div class="stars">
              ${starsHTML}
            </div>
            <span>(${stars})</span>
          </div>
        </div>
          `
        })
      }
    }

    var swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 2000, // Adjust the delay as needed (in milliseconds)
        disableOnInteraction: false, // Disable autoplay on user interaction
      },
    });


    

  
