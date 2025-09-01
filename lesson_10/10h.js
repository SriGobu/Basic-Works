      function handleCostKeydown(event) {
        console.log(event.key);
        if (event.key === "Enter") {
          // by using event.key - we can get the key that we pressed
          calculateTotal();
        }
      }
      function calculateTotal() {
        const inputElement = document.querySelector(".js-cost-input");
        let cost = Number(inputElement.value); //by using this is how we get the text inside a text box
        //.value - by using  it gives the text that is inside the text box
        // whenever we get a value from the DOM , the value will be a string
        // if we want to do math with it we have to manually convert this value into number
        if ( cost < 40 && cost > 0 ) {
          cost = Number(cost + 10);
          console.log(cost);
          document.querySelector(".js-total-cost").innerHTML = `$${cost}`;
        } else if (cost < 0) {
          console.log(document.querySelector('.js-select').innerHTML = 'Error: cost cannot be less than $0');

        }


        
      }

      function Subscribe() {
        const buttonElement = document.querySelector(".js-Subscribe-button");


        if (buttonElement.innerText === "Subscribe") {
          buttonElement.innerHTML = "Subscribed";
        buttonElement.classList.add('is-subscribed');
        // by using the classList.add we can add a class 
        } else {
          buttonElement.innerHTML = "Subscribe";
          buttonElement.classList.remove('is-subscribed');
        }
      }