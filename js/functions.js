// const { name } = require("browser-sync");

const stringChecker = (testString, maxLength) => {
  return testString.length <= maxLength
};

console.log(stringChecker('проверяемая строка', 15));

function checkingPalindrome(baseString) {
  let normalizedString = baseString.replaceAll(' ','').toLowerCase();
  let newString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    let char = normalizedString[i];
    newString += char;
  }
  return (normalizedString === newString) ? 'Палиндром' : 'Не палиндром';
}

console.log(checkingPalindrome('Довод'));


const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Валя',
  'Коля',
  'Галя',
  'Света',
  'Саша',
  'Паша',
  'Наташа',
  'Маня',
  'Ваня',
  'Соня',
  'Сергей',
  'Матвей',
  'Борис',
];

const DESCRIPTIONS = [
  'Самбрэрро',
  'На виле',
  'Крутота',
  'Великий Новгород',
  'Шел по шоссе',
  'Берлин',
  'Выходка столетия',
  '17 мгновений весны',
  'Баня',
  'Очень забавное фото',
  'Очень крсиво',
  'Грустное фото',
  'Фото в стиле "Хаки"',
  'Гудзонский ястреб',
  'Балдышок',
  'Восстание машин',
  'Слоник в четырех стенах',
  'Посудная лавка',
  'Спорт - это жизнь',
  'Моя прелесть',
  'Миф о сизифе',
  'Рефакторинг кода',
  'Вфыпускной',
  'Солнце мертвых',
  'Городской полицай',
];

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

let getCommentId = createRandomIdFromRangeGenerator(1, 1000);

const createMessage = () => {
  if (getRandomInteger(0, 1)) {
    return getRandomArrayElement(MESSAGES);
  }
  return getRandomArrayElement(MESSAGES) + ' ' + getRandomArrayElement(MESSAGES);
};

const posts = [];

for (let i = 1; i <= 25; i++) {
  const post = {
    id: i,
    url: 'photos/' + i + '.jpg',
    description: DESCRIPTIONS[i - 1],
    likes: getRandomInteger(15, 200),
    comments: []
  };
  for (let j = 1; j <= getRandomInteger(0, 30); j++) {
    const comment = {
      id: getCommentId(),
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg.',
      message: createMessage(),
      name: getRandomArrayElement(NAMES),
    };
    post.comments.push(comment);
  }
  posts.push(post);
}

console.log(posts);
