// api/recipes.ts
import fetch from 'node-fetch';

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
          url: meal.strSource || `https://themealdb.com/meal/${meal.idMeal}`
        });
      }
    }

    res.status(200).json({ recipes });
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
}
