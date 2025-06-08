var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const recipes = [];
            for (let i = 0; i < 4; i++) {
                const r = yield fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = yield r.json();
                const meal = (_a = data.meals) === null || _a === void 0 ? void 0 : _a[0];
                if (meal) {
                    recipes.push({
                        title: meal.strMeal,
                        description: meal.strInstructions.slice(0, 150) + '...',
                        url: meal.strSource || `https://themealdb.com/meal/${meal.idMeal}`,
                    });
                }
            }
            res.status(200).json({ recipes });
        }
        catch (err) {
            console.error('Recipe API error:', err);
            res.status(500).json({ error: 'Failed to fetch recipes.' });
        }
    });
}
