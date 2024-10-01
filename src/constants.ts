import type { RecipeListItem } from './types';

export const FOOD_CATEGORIES = [
  {
    name: 'Breakfast',
    image: '/images/category_breakfast.svg',
    link: '/breakfast',
  },
  {
    name: 'Soups',
    image: '/images/category_soup.svg',
    link: '/soups',
  },
  {
    name: 'Salads',
    image: '/images/category_salad.svg',
    link: '/salads',
  },
  {
    name: 'Pasta',
    image: '/images/category_pasta.svg',
    link: '/pasta',
  },
  {
    name: 'Pizza',
    image: '/images/category_pizza.svg',
    link: '/pizza',
  },
  {
    name: 'Meats',
    image: '/images/category_meat.svg',
    link: '/meats',
  },
  {
    name: 'Seafood',
    image: '/images/category_seafood.svg',
    link: '/seafood',
  },
  {
    name: 'Chicken',
    image: '/images/category_chicken.svg',
    link: '/chicken',
  },
  {
    name: 'Vegeterian',
    image: '/images/category_vegetarian.svg',
    link: '/vegeterian',
  },
  {
    name: 'Desserts',
    image: '/images/category_dessert.svg',
    link: '/desserts',
  },
];

export const RECIPES_LIST: RecipeListItem[] = [
  {
    name: 'Pasta Carbonara',
    image: '/images/recipes/recipe_pasta_carbonara.jpg',
    slug: '/recipes/pasta-carbonara',
    category: ['Pasta', 'Dinner'],
  },
  {
    name: 'Crispy Chicken Caesar Wrap',
    image: '/images/recipes/recipe_chicken_caesar_wrap.jpg',
    slug: '/recipes/chicken-caesar-wrap',
    category: ['Chicken', 'Dinner'],
  },
  {
    name: 'Pumpkin Pie French Toast',
    image: '/images/recipes/recipe_pumpkin_pie_french_toast.jpg',
    slug: '/recipes/pumpkin-pie-french-toast',
    category: ['Breakfast'],
  },
  {
    name: 'Croissant Egg Boats',
    image: '/images/recipes/recipe_croissant_egg_boats.jpg',
    slug: '/recipes/croissant-egg-boats',
    category: ['Breakfast'],
  },
];
