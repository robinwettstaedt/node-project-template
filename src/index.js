import dotenv from 'dotenv';
import { prod, dev, test } from './app';

dotenv.config();

if (process.env.NODE_ENV === 'production') {
    console.log(prod());
} else if (process.env.NODE_ENV === 'testing') {
    console.log(test());
} else if (process.env.NODE_ENV === 'development') {
    console.log(dev());
}
