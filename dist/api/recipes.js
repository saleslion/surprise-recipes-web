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
        var _a, _b;
        try {
            const recipes = [];
            for (let i = 0; i < 4; i++) {
                const response = yield fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = yield response.json();
                const meal = (_a = data.meals) === null || _a === void 0 ? void 0 : _a[0];
                if (meal) {
                    recipes.push({
                        title: meal.strMeal,
                        description: ((_b = meal.strInstructions) === null || _b === void 0 ? void 0 : _b.slice(0, 150)) + '...',
                        url: meal.strSource || `https://themealdb.com/meal/${meal.idMeal}`,
                    });
                }
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ recipes }));
        }
        catch (error) {
            console.error('Error fetching recipes:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to fetch recipes.' }));
        }
    });
}
