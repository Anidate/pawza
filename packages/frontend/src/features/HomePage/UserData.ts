import ManWithDog2 from '@src/assets/a-man-holding-a-dog.jpg';
import GuyWithDog from '@src/assets/guy_with_dog.webp';
import Man3 from '@src/assets/man3.jpg';
import WomanWithDog from '@src/assets/woman_with_dog.jpg';
import Woman2 from '@src/assets/woman2.jpg';

interface User {
  name: string;
  age: number;
  description: string;
  image: string;
}

const userData: User[] = [
  {
    name: 'John',
    age: 29,
    description: 'Dog lover and outdoor enthusiast.',
    image: GuyWithDog,
  },
  {
    name: 'Emily',
    age: 42,
    description: 'Animal rescuer with a passion for hiking.',
    image: WomanWithDog,
  },
  {
    name: 'Michael',
    age: 35,
    description: 'Tech enthusiast and avid traveler.',
    image: ManWithDog2,
  },
  {
    name: 'Yarden',
    age: 24,
    description: 'Nature lover and photography enthusiast.',
    image: Woman2,
  },
  {
    name: 'Meni',
    age: 45,
    description: "I'm a software engineer who loves dogs.",
    image: Man3,
  },
];

export default userData;
