const CATEGORIES = [6, 13, 16];

export const getRandomWords = async () => {
  const res: string[] = [];
  for (const category of CATEGORIES) {
    const response = await fetch(`https://trouve-mot.fr/api/categorie/${category}/1`);
    if (!response.ok) {
      throw new Error('Failed to fetch random words');
    }
    const data = await response.json();
    const words = data.map((word: { name: string }) => word.name);
    res.push(...words);
  }

  return res;
};
