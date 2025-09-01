    function firstButton() {
  let gamingButtton = document.querySelector('.off-button');
  if (gamingButtton.classList.contains('on-button')) {
    gamingButtton.classList.remove('on-button');
  }else{
    gamingButtton.classList.add('on-button');
  }
    }
    function secondButton() {
  let musicButton = document.querySelector('.two-off-button');
  if (musicButton.classList.contains('two-on-button')) {
    musicButton.classList.remove('two-on-button');
  }else{
    musicButton.classList.add('two-on-button');
  }
    
    }
    function thirdButton() {
  let techButton = document.querySelector('.three-off-button');
  if (techButton.classList.contains('three-on-button')) {
    techButton.classList.remove('three-on-button');
  }else{
    techButton.classList.add('three-on-button');
  }
    
    }