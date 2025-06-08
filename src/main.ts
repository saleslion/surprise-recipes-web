async function fetchRecipes() {
  const container = document.getElementById('recipes');
  if (!container) return;

  container.innerHTML = 'Loading...';

  try {
    const response = await fetch('/api/recipes');
    const data = await response.json();

    if (!data.recipes?.length) {
      container.innerHTML = 'No recipes found.';
      return;
    }

    container.innerHTML = '';
    data.recipes.forEach((r: any) => {
      const div = document.createElement('div');
      div.className = 'recipe';
      div.innerHTML = `
        <h3>${r.title}</h3>
        <p>${r.description}</p>
        <a href="${r.url}" target="_blank">View full recipe</a>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = 'Failed to load recipes. Please try again later.';
  }
}

// Attach to global for onclick binding
(window as any).fetchRecipes = fetchRecipes;
