async function fetchFlowers() {
  const response = await fetch('http://localhost:5000/api/flowers');
  const flowers = await response.json();
  const flowerList = document.getElementById('flowerList');
  flowerList.innerHTML = '';
  flowers.forEach(flower => {
    const listItem = document.createElement('li');
    listItem.textContent = `${flower.name} - $${flower.price}`;
    flowerList.appendChild(listItem);
  });
}

document.getElementById('flowerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    price: formData.get('price')
  };

  await fetch('http://localhost:5000/api/flowers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  fetchFlowers();
  event.target.reset();
});

fetchFlowers();
