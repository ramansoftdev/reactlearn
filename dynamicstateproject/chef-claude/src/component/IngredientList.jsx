export default function IngredientList(props) {
  const ingredientList = props.ingredients.map((item) => {
    return <li key={item}> {item}</li>;
  });

  return (
    <>
      {ingredientList.length > 0 && (
        <section>
          <h2> Ingredients on hand:</h2>
          <ul className="ingredients-list">{ingredientList}</ul>
          {ingredientList.length >= 4 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients</p>
              </div>
              <button onClick={props.getRecipie}>Get a recipe</button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
