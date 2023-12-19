document.querySelector('.menu-icon').addEventListener('click', function() {
let nav = document.querySelector('aside');

nav.classList.toggle("hide")
  
        });
  
function toggleOptions() {
    const optionsList = document.querySelector('.options-list');
    optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
}

function selectItem(item) {
    const selectedItem = document.querySelector('.selected-item');
    selectedItem.textContent = item;
    toggleOptions();
}

document.addEventListener('click', function(event) {
    const carbonSelector = document.querySelector('.carbon-selector');
    if (!carbonSelector.contains(event.target)) {
        document.querySelector('.options-list').style.display = 'none';
    }
});
