export async function getRecipeImage(recipeName: string) {
  const result = await fetch(
    `${process.env.PEXELS_API_URL!}/search?query=${recipeName}&per_page=5`,
    {
      method: 'GET',
      headers: {
        Authorization: `${process.env.PEXELS_API_KEY}`,
      },
    },
  );

  const data = await result.json();

  const randomIndex = Math.floor(Math.random() * data['photos'].length);

  return data['photos'][randomIndex].src['original'];
}
