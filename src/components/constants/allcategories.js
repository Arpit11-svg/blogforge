import technology from '../../assets/technology.jpg'
import programming from '../../assets/programming.jpg'
import AI from '../../assets/artificial-intelligence.jpg'
import business from '../../assets/business-finance.jpg'
import education from '../../assets/education.jpg'
import health from '../../assets/health-fitness.jpg'
import lifestyle from '../../assets/lifestyle.jpg'
import science from '../../assets/science.jpg'
import entertainment from '../../assets/entertainment.jpg'
import sports from '../../assets/sports.jpg'


export const categories = [
  {
    value: "technology",
    label: "Technology",
    image: technology,
  },
  {
    value: "programming",
    label: "Programming",
    image: programming,
  },
  {
    value: "artificial-intelligence",
    label: "Artificial Intelligence",
    image: AI,
  },
  {
    value: "business-finance",
    label: "Business & Finance",
    image: business,
  },
  {
    value: "education",
    label: "Education",
    image: education,
  },
  {
    value: "health-fitness",
    label: "Health & Fitness",
    image: health,
  },
  {
    value: "lifestyle",
    label: "Lifestyle",
    image: lifestyle,
  },
  {
    value: "science",
    label: "Science",
    image: science,
  },
  {
    value: "entertainment",
    label: "Entertainment",
    image: entertainment,
  },
  {
    value: "sports",
    label: "Sports",
    image: sports,
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((category) => [
    category.value,
    category.label,
  ])
);