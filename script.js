document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();
  const file = document.getElementById('csvFile').files[0];
  const reader = new FileReader();

  reader.onload = async function(event) {
    const base64 = event.target.result.split(',')[1];

    const response = await fetch('/.netlify/functions/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: base64 }),
    });

    const result = await response.json();
    document.getElementById('result').innerText = JSON.stringify(result);
  };

  reader.readAsDataURL(file);
};