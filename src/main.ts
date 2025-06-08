async function fetchRecipes(): Promise<void> {
  const recipesContainer = document.getElementById('recipes');
  if (!recipesContainer) return;

  recipesContainer.innerHTML = '<p>Loading recipes...</p>';

  try {
    const response = await fetch('/api/recipes');
    const data = await response.json();
    const recipes = data.recipes;

    if (!recipes || recipes.length === 0) {
      recipesContainer.innerHTML = '<p>No recipes found.</p>';
      return;
    }

    recipesContainer.innerHTML = '';
    recipes.forEach((recipe: any) => {
      const div = document.createElement('div');
      div.className = 'recipe';
      div.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <a href="${recipe.url}" target="_blank">View Recipe</a>
      `;
      recipesContainer.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    recipesContainer.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
  }
}

(window as any).fetchRecipes = fetchRecipes;
