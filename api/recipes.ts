export default async function handler(req: any, res: any) {
  try {
    const recipes = [];

    for (let i = 0; i < 4; i++) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      const meal = data.meals?.[0];

      if (meal) {
        recipes.push({
          title: meal.strMeal,
          description: meal.strInstructions?.slice(0, 150) + '...',
          url: meal.strSource || `https://themealdb.com/meal/${meal.idMeal}`,
        });
      }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ recipes }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to fetch recipes.' }));
  }
}
