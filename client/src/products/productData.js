import { v4 as uuidv4 } from 'uuid';
import watch from "/public/images/watch.webp";

export const productData = [
    {
        id: uuidv4(),
        src: watch,
        title: "watch",
        price: 1000,
    },
    {
        id: uuidv4(),
        src: watch,
        title: "watch2",
        price: 2000,
    },
    {
        id: uuidv4(),
        src: watch,
        title: "watch3",
        price: 3000,
    }
]
