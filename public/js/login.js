function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  var data = {
    username: username,
    password: password
  };

  fetch('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      // Login successful, handle accordingly
      alert(data.message);
      window.location.href="/dashboard"
    } else {
      // Login failed, handle accordingly
      alert('Login failed: ' + data.err);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
