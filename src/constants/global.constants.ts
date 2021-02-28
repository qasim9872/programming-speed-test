import { FULL_URL, NAME } from '../config/app.config';

const MyGlobalConfig = {
  title: NAME,
  author: {
    name: 'Muhammad Qasim',
    location: 'London',
    link: 'https://github.com/qasim9872',
  },
  show: {
    navbar: true,
    footer: true,
  },
  url: FULL_URL,
};

export default MyGlobalConfig;
