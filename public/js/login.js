let btn = document.querySelector('button')
let error = document.querySelector('.error')

let password = 'test';
let user='test'


function check() {
	let pass = document.querySelector('#password');
  let name = document.querySelector('#username');
    
    console.log('Function called');
    
    if (pass.value == password&& name.value == user) {
    	window.location.href='index.html'
        console.log('correct password');
    } else {
        error.innerHTML='incorrect password and username';
    }
    
}
btn.addEventListener('click', check)