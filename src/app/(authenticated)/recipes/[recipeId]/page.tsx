export default async function RecipeDetailPage({
  params,
}: {
  params: { recipeId: string };
}) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${params.recipeId}`
  );
  let recipe = await data.json();
  return (
    <div>
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </div>
  );
}
