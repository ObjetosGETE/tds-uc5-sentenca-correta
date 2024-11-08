$('.game-body').hide();
const firstGame = $('.game-body')[0];
$(firstGame).show();
let originalParent;
let correctAnswers = 0;

// Aqui você adiciona ou remove os containers pra onde devem ir os cards
var containers = [
  // Container com os cards que serão realocados
  // Não mexer
  document.querySelector("#cardPile"),

  // Containers que irão receber os cards
  document.querySelector("#slot-1"),
  document.querySelector('#slot-2'),
  document.querySelector('#slot-3')
];
var audio = new Audio();
var erro = 0;

// Solução ao dragindrop
var scrollable = true;

var listener = function (e) {
  console.log(scrollable)
  if (!scrollable) {
    e.preventDefault();
  }
}

document.addEventListener('touchmove', listener, { passive: false });

// Solução ao dragindrop

dragula({
  containers: containers,
  revertOnSpill: true,
  direction: 'vertical',
  accepts: function (el, target, source, sibling) {
    return el.dataset.target == target.id;
  }
}).on('drag', function (el, source) {
  // On mobile this prevents the default page scrolling while dragging an item.
  scrollable = false;
  originalParent = el.parentNode;
}).on("drop", function (el, target) {
  scrollable = true;
  let slotArray = $(target).parents('.slots').find('.slot');
  if (slotArray[0].children.length && slotArray[1].children.length && slotArray[2].children.length) {
    $('.check-answer-btn').removeClass('hidden');
  } else {
    $('.check-answer-btn').addClass('hidden');
  }

  if (target.children.length > 1) {
    originalParent.appendChild(target.children[0]);
  }


}).on("cancel", function () {
  scrollable = true;

});

$('.check-answer-btn').click(function () {
  correctAnswers = 0;
  let slotArray = $(this).parents('.game-body').find('.slot');

  for (let i = 0; i < slotArray.length; i++) {
    if ($(slotArray[i]).children()[0].classList.contains('correct')) {
      correctAnswers = correctAnswers + 1;
    }
  }
  console.log(`correctAnswers = ${correctAnswers}`);
  if (correctAnswers == slotArray.length) {
    console.log('sabe mt paizao');
    

  } else {
    console.log(':( try again m8')
    for (let i = 0; i < slotArray.length; i++) {
      if ($(slotArray[i]).children()[0].classList.contains('correct') == false) {
        $('#cardPile').append($(slotArray[i]).children()[0]);
      }
    }
  }
});