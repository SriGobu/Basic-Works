      let calculation = "";
      function updateCalculation(value) {
        if ((value <= 9 && value >= 0) || (!value <= 9 && !value >= 0)) {
          calculation += value;
          view();
        }
      }

      function evalCalculation() {
        let total = eval(calculation);
        localStorage.setItem("evaluation",JSON.stringify(total));
        document.querySelector(".js_view").innerHTML = total;
      }

      let get1 = JSON.parse(localStorage.getItem("evaluation"));
      console.log(get1);

      function eraseCalculation() {
        let erase = localStorage.removeItem("evaluation");
      }

      function view() {
        let viewElement = document.querySelector(".js_view");
        viewElement.innerHTML = calculation;
      }