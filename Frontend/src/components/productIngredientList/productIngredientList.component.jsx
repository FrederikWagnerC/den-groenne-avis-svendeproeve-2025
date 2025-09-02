


export const ProductIngredientList = ({ ingredients }) => {
    return (
        <ul>
            {ingredients && ingredients.map((ingredient, index) => (
                <li key={index}>
                    {ingredient.amount} {ingredient.units?.name || ingredient.units} {ingredient.ingredients?.name || ingredient.ingredients}
                </li>
            ))}
        </ul>
    );
};