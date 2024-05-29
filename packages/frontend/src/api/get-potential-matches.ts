// TODO: Response interface
/*
export function getPotentialMatches(): Promise<{ data: PotentialMatch[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const potentialMatches: PotentialMatch[] = [];
      for (let i = 0; i < 10; i++) {
        potentialMatches.push({
          id: `id_${i.toString().padStart(2, '0')}`,
          firstName: generateRandomName(10),
          age: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
          gender: Math.random() < 0.5 ? 'Male' : 'Female',
          photo: getRandomDogOwnerImage(), // Function to fetch random dog owner image
        });
      }
      resolve({ data: potentialMatches });
    }, 500);
  });
}

interface PotentialMatch {
  id: string;
  firstName: string;
  age: number;
  gender: string;
  photo: string;
}

function generateRandomName(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to fetch a random dog owner image (using Pixabay API for free images)
async function getRandomDogOwnerImage(): Promise<string> {
  const apiKey = 'YOUR_PIXABAY_API_KEY'; // Replace with your Pixabay API key
  const url = 'https://dog.ceo/api/breeds/image/random';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      const randomImage = data.hits[Math.floor(Math.random() * data.hits.length)];
      return randomImage.webformatURL;
    }
    console.warn('Pixabay API did not return any results. Using placeholder image.');
    return 'https://www.pexels.com/photo/woman-girl-animal-dog-4056535/'; // Replace with placeholder image URL
  } catch (error) {
    console.error('Error fetching image from Pixabay:', error);
    return 'https://www.pexels.com/photo/woman-girl-animal-dog-4056535/'; // Replace with placeholder image URL
  }
} 
*/

export function getPotentialMatches(): any {
  return new Promise((resolve) => {
    setTimeout(() => {
      const potentialMatches: potentialMatch[] = [];
      for (let i = 0; i < 5; i++) {
        potentialMatches.push({
          id: `the id is : ${i}`,
          firstName: `zona number ${i}`,
          age: i,
          gender: 'shemale',
          photo: db[i].image,
        });
      }
      resolve({ data: potentialMatches });
    }, 500);
  });
}

const db = [
  {
    image:
      'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/bernese-mountain-dog.jpg?crop=1.00xw:0.668xh;0,0.252xh&resize=640:*',
  },
  {
    image:
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    image: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    image: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    image: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

interface potentialMatch {
  id: string;
  firstName: string;
  age: number;
  gender: string;
  photo: string;
}
