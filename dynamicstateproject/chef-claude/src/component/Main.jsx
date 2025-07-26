import React from "react";
import IngredientList from "./IngredientList";
import Recipie from "./Recipie";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "mustard seeds",
    "oil",
    "jeera",
    "onion",
    "tomato",
    "spices",
    "potato",
    "tofu",
    "seeds",
  ]);

  const [recipie, setRecipie] = React.useState("");

  const sumbitIngredient = (formData) => {
    const newIngredient = formData.get("ingredient");
    // console.log(ingredients)
    setRecipie("");
    setIngredients((prevIngredients) => {
      return [...prevIngredients, newIngredient];
    });
  };

  const getRecipie = () => {
    setRecipie("temp");
    //not adding ai code for commit

    // const recipiefinal = getRecipieFromClaude();
    // setRectipie(recipiefinal);
  };

  return (
    <main>
      <form className="add-ingredient-form" action={sumbitIngredient}>
        <input
          type="text"
          placeholder="e.g. mustard seeds"
          aria-label="add ingredient"
          name="ingredient"
        ></input>
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientList ingredients={ingredients} getRecipie={getRecipie} />
      )}
      {recipie && <Recipie recipie={recipie} />}
    </main>
  );
}
