// 🎠 Carousel Logic
const slides = document.querySelectorAll('.carousel');
const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
let current = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

prevBtn.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

// 🌐 API Fetch Logic
const jokeBtn = document.getElementById('jokeBtn');
const jokeDisplay = document.getElementById('jokeDisplay');

jokeBtn.addEventListener('click', async () => {
  jokeDisplay.textContent = "Fetching a joke...";
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    jokeDisplay.textContent = `${data.setup} — ${data.punchline}`;
  } catch (error) {
    jokeDisplay.textContent = "Couldn't fetch a joke 😅";
  }
});
