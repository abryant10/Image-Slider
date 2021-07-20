const renderPhotoSlider = function renderPhotoSlider(arrayOfPhotos) {
  const imageSliderContainer = document.getElementById('imageSliderContainer');
  const numberOfPhotos = arrayOfPhotos.length;
  let currentPhotoNumber = 0;
  let rightPhotoNumber = 1;
  let leftPhotoNumber = numberOfPhotos - 1;

  const navContainer = document.createElement('div');
  navContainer.classList.add('navContainer');
  imageSliderContainer.appendChild(navContainer);

  const circleClick = function circleClick(e) {
    let circleNumber = parseInt(e.target.dataset.circle, 10);
    if (circleNumber === currentPhotoNumber) return;
    if (currentPhotoNumber < circleNumber) {
      let travel = (circleNumber - currentPhotoNumber)
      for (let i = 0; i < travel; i += 1){
        setTimeout(advanceRight, i * 500);
      }
    } else {
        let travel = (currentPhotoNumber - circleNumber);
        for (let i = 0; i < travel; i += 1){
        setTimeout(advanceLeft, i * 500);
        }
      }
    };

  for (let i = 0; i < numberOfPhotos; i += 1) {
    const circle = document.createElement('div');
    circle.classList.add('emptyCircle');
    circle.id = `circle${i}`;
    circle.dataset.circle = i;
    navContainer.appendChild(circle);
    circle.addEventListener('click', circleClick);
  }
  const leftButton = document.createElement('div');
  leftButton.classList.add('leftButton');
  leftButton.innerHTML = '&#10094;';
  const rightButton = document.createElement('div');
  rightButton.classList.add('rightButton');
  rightButton.innerHTML = '&#10095;';
  imageSliderContainer.appendChild(leftButton);
  imageSliderContainer.appendChild(rightButton);

  arrayOfPhotos.forEach((photo) => {
    const photoDiv = document.createElement('div');
    photoDiv.classList.add('hiddenPhoto');
    photoDiv.id = `photo${parseInt(arrayOfPhotos.indexOf(photo))}`;
    const createPhoto = document.createElement('img');
    createPhoto.src = photo;
    createPhoto.classList.add('photo');
    photoDiv.appendChild(createPhoto);
    imageSliderContainer.appendChild(photoDiv);
  })

  const getPhotoNumbersRight = function getPhotoNumbersRight() {
    currentPhotoNumber += 1;
    if (currentPhotoNumber >= numberOfPhotos) { currentPhotoNumber = 0; }
    leftPhotoNumber += 1;
    if (leftPhotoNumber >= numberOfPhotos) { leftPhotoNumber = 0; }
    rightPhotoNumber += 1;
    if (rightPhotoNumber >= numberOfPhotos) { rightPhotoNumber = 0; }
  };
  const getPhotoNumbersLeft = function getPhotoNumbersLeft() {
    currentPhotoNumber -= 1;
    if (currentPhotoNumber < 0) { currentPhotoNumber = numberOfPhotos - 1; }
    leftPhotoNumber -= 1;
    if (leftPhotoNumber < 0) { leftPhotoNumber = numberOfPhotos - 1; }
    rightPhotoNumber -= 1;
    if (rightPhotoNumber < 0) { rightPhotoNumber = numberOfPhotos - 1; }
  };
  const getCurrentDom = function getPhotoDom() {
    leftPhoto = document.getElementById(`photo${leftPhotoNumber}`);
    currentPhoto = document.getElementById(`photo${currentPhotoNumber}`);
    rightPhoto = document.getElementById(`photo${rightPhotoNumber}`);
    currentCircle  = document.getElementById(`circle${currentPhotoNumber}`);
  };
  const advanceRight = function advanceRight() {
    stopLoop();
    currentPhoto.classList.add('leftPhoto');
    rightPhoto.classList.add('centerPhoto');
    currentPhoto.classList.remove('centerPhoto');
    rightPhoto.classList.remove('rightPhoto');
    leftPhoto.classList.remove('leftPhoto'); 
    currentCircle.classList.remove('filledCircle');
    getPhotoNumbersRight();
    getCurrentDom();
    currentCircle.classList.add('filledCircle');
    rightPhoto.classList.add('rightPhoto');
    theLoop = setInterval(advanceRight, 5000);
  };
  const advanceLeft = function advanceLeft() {
    stopLoop();
    currentPhoto.classList.add('rightPhoto');
    leftPhoto.classList.add('centerPhoto');
    currentPhoto.classList.remove('centerPhoto');
    leftPhoto.classList.remove('leftPhoto');
    rightPhoto.classList.remove('rightPhoto');
    currentCircle.classList.remove('filledCircle');
    getPhotoNumbersLeft();
    getCurrentDom();
    currentCircle.classList.add('filledCircle');
    leftPhoto.classList.add('leftPhoto');
    theLoop = setInterval(advanceRight, 5000);
  };

  rightButton.addEventListener('click', advanceRight);
  leftButton.addEventListener('click', advanceLeft);

  let currentPhoto = document.getElementById('photo0');
  currentPhoto.classList.add('centerPhoto');
  let leftPhoto = document.getElementById(`photo${numberOfPhotos - 1}`);
  leftPhoto.classList.add('leftPhoto');
  let rightPhoto = document.getElementById('photo1');
  rightPhoto.classList.add('rightPhoto');
  let currentCircle = document.getElementById(`circle${currentPhotoNumber}`);
  currentCircle.classList.add('filledCircle');

  var theLoop = setInterval(advanceRight, 5000);

  const stopLoop = function stopLoop() {
    clearInterval(theLoop);
  }; 

};

export { renderPhotoSlider };
