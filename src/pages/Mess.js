import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { useTheme } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const Menu = {
  LDH: {
    Sunday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Aloo Paratha',
        'Pudina chutney',
        'curd',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Dal Fry/ Dal tadka',
        'Aloo Methi/ Aloo jeera',
        'Rigidguard tomato curry/ Rigid guard channa curry',
        'Kadamba Sambar',
      ],
      Snacks: ['Black Tea', 'Coffee', 'Milk'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Dal Makani',
        'Raw banana fry',
        'Kadai Veg',
        'Lemon rasam',
      ],
    },
    Monday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Kancheepuram Idly/Idly',
        'Groundnut Chutney',
        'Sambar',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Rigidguard dal',
        'Avial without Yam',
        'Mix vegetable dry/ Veg jalfrezi',
        'Dal Rasam',
      ],
      Snacks: ['Milk', 'Ginger tea', 'Coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Channa dal fry',
        'Bhendi peanut fry',
        'Corn palak Masala',
        'Pepper rasam',
        'Sambar Rice and Rasam will be served during Lunch',
      ],
    },
    Tuesday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Poori',
        'Aloo subzi/ Chole subzi',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Gongura Pappu',
        'Carrot beans poriyal/Dondakaya with coconut',
        'Dosakaya tomato curry',
        'Mix veg sambar',
      ],
      Snacks: ['Milk', 'Tea', 'Coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Thotakura pappu',
        'Dondakaya fry',
        'Aloo palak/ Dum aloo banarasi',
        'Tomato dal',
        'Tamarind Rice/Coconut Rice',
      ],
    },
    Wednesday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'PlainUttapam/ Onion Uttapam',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Dal panchmahel',
        'Aloo Brinjal dry/ Aloo capsicum',
        'Mutter do pyaza/ Mutter masala',
        'Aravai Sambar',
      ],
      Snacks: ['Milk', 'Masala tea', 'Coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Mix dal',
        'Bitterguard dry',
        'Dhai baingan/ Gutti vankaya curry',
        'Ginger rasam',
        'Methi chapathi(sub for phulka)',
      ],
    },
    Thursday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Pongal',
        'Vada(2 Pieces)',
        'Coconut chutney',
        'Sambar',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Cucumber dal',
        'Bhendi dry',
        'Veg chatpata/ Kadai veg',
        'Sambar with radish',
      ],
      Snacks: ['Milk', 'Tea', 'coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Methi dal',
        'Aloo deepfry/Aloo 65',
        'Drumstick curry/ Drumstick',
        'brinjal curry',
        'Pineapple rasam',
        'Pudina chapathi(sub for phulka)',
      ],
    },
    Friday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Upma',
        'Uggani/Poha',
        'Coconut Chutney',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Rajma',
        'Cabbage poriyal/ Cabbage beans carrot poriyal',
        'Capsicum masala',
        'Kerala sambar',
      ],
      Snacks: ['Milk', 'Elachi tea', 'Coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Masoor dal',
        'Cluster beans dry',
        'Kadi pakodi/ Potodi masala',
        'Garlic rasam',
        'pudina / Zeera rice',
      ],
    },
    Saturday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Masala dosa/ Onion dosa',
        'Peanut chutney',
        'Sambar',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Tomato dal',
        'Beetroot poriyal',
        'Malai kofta/ Hariyali kofta',
        'Corn Sambar',
      ],
      Snacks: ['Milk', 'Tea', 'coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Palak Dal',
        'chole masala',
        'Snakeguard curry',
        'Bhatura(Substitute for phulka)',
      ],
    },
  },
  UDH: {
    Sunday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Aloo Paratha',
        'Pudina chutney',
        'curd',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Dal Fry/ Dal tadka',
        'Aloo Methi/ Aloo jeera',
        'Rigidguard tomato curry/ Rigid guard channa curry',
        'Kadamba Sambar',
      ],
      Snacks: ['Black Tea', 'Coffee', 'Milk'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Dal Makani',
        'Raw banana fry',
        'Kadai Veg',
        'Lemon rasam',
      ],
    },
    Monday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Kancheepuram Idly/Idly',
        'Groundnut Chutney',
        'Sambar',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Rigidguard dal',
        'Avial without Yam',
        'Mix vegetable dry/ Veg jalfrezi',
        'Dal Rasam',
      ],
      Snacks: ['Milk', 'Ginger tea', 'Coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Channa dal fry',
        'Bhendi peanut fry',
        'Corn palak Masala',
        'Pepper rasam',
        'Sambar Rice and Rasam will be served during Lunch',
      ],
    },
    Tuesday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Poori',
        'Aloo subzi/ Chole subzi',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Gongura Pappu',
        'Carrot beans poriyal/Dondakaya with coconut',
        'Dosakaya tomato curry',
        'Mix veg sambar',
      ],
      Snacks: ['Milk', 'Tea', 'Coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Thotakura pappu',
        'Dondakaya fry',
        'Aloo palak/ Dum aloo banarasi',
        'Tomato dal',
        'Tamarind Rice/Coconut Rice',
      ],
    },
    Wednesday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'PlainUttapam/ Onion Uttapam',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Dal panchmahel',
        'Aloo Brinjal dry/ Aloo capsicum',
        'Mutter do pyaza/ Mutter masala',
        'Aravai Sambar',
      ],
      Snacks: ['Milk', 'Masala tea', 'Coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Mix dal',
        'Bitterguard dry',
        'Dhai baingan/ Gutti vankaya curry',
        'Ginger rasam',
        'Methi chapathi(sub for phulka)',
      ],
    },
    Thursday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Pongal',
        'Vada(2 Pieces)',
        'Coconut chutney',
        'Sambar',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Cucumber dal',
        'Bhendi dry',
        'Veg chatpata/ Kadai veg',
        'Sambar with radish',
      ],
      Snacks: ['Milk', 'Tea', 'coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Methi dal',
        'Aloo deepfry/Aloo 65',
        'Drumstick curry/ Drumstick',
        'brinjal curry',
        'Pineapple rasam',
        'Pudina chapathi(sub for phulka)',
      ],
    },
    Friday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Upma',
        'Uggani/Poha',
        'Coconut Chutney',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Rajma',
        'Cabbage poriyal/ Cabbage beans carrot poriyal',
        'Capsicum masala',
        'Kerala sambar',
      ],
      Snacks: ['Milk', 'Elachi tea', 'Coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Masoor dal',
        'Cluster beans dry',
        'Kadi pakodi/ Potodi masala',
        'Garlic rasam',
        'pudina / Zeera rice',
      ],
    },
    Saturday: {
      Breakfast: [
        'Milk(untoned)',
        'toasted (white & wheat) bread',
        'Jam',
        ' Butter',
        'tea',
        'coffee',
        'Masala dosa/ Onion dosa',
        'Peanut chutney',
        'Sambar',
      ],
      Lunch: [
        'Salad',
        'roti',
        'rice',
        'sambar',
        'Curd (100ml)',
        'Papad',
        'Chutney',
        'vegetable salad',
        'Tomato dal',
        'Beetroot poriyal',
        'Malai kofta/ Hariyali kofta',
        'Corn Sambar',
      ],
      Snacks: ['Milk', 'Tea', 'coffee'],
      Dinner: [
        'Salad',
        'Phulka(with and without ghee)',
        'rice',
        'rasam',
        'curd(100ml)',
        'Fryums',
        'Pickle',
        'Palak Dal',
        'chole masala',
        'Snakeguard curry',
        'Bhatura(Substitute for phulka)',
      ],
    },
  },
  'LDH Additional': {
    Sunday: {
      Breakfast: ['Boiled Egg(Rs7/-)', 'cornflakes(Rs8/-)', 'Bananas(Rs4/-)'],
      Lunch: [
        'Egg Masala(Rs20/-)',
        'Babycorn Manchuria(Rs30/-)',
        'Kadai Chicken(Rs40/-)',
      ],
      Snacks: ['Pav Bhaji(2 pieces)(Rs10/-)', 'Vada pav (Each)(Rs10/-)'],
      Dinner: ['Paneer pulao(Rs60/-)', 'Chicken biryani(Rs60/-)'],
    },
    Monday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg Burji(Rs20/-)',
        'Vegetable Biryani(Rs45/-)',
        'Fish curry(Rs45/-)',
      ],
      Snacks: ['Bread Pakoda(1 piece)(Rs15/-)', 'Aloo bonda (2 pic)(Rs15/-)'],
      Dinner: [
        'Egg masala(Rs20/-)',
        'Paneer Hariyali Masala(Rs40/-)',
        'Kadai Chicken(Rs40/-)',
        'Jalebi(Rs10/-)',
      ],
    },
    Tuesday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg Masala(Rs20/-)',
        'Palak paneer(Rs30/-) ',
        'Chicken65(Rs 45/-)',
      ],
      Snacks: ['Samosa(100 gm)(Rs10/-)', 'Bhel Puri(each),10/-)'],
      Dinner: [
        'Egg burji(Rs20/-)',
        'Crispy Corn(Rs30/-)',
        'Chicken Tikka Masal(Rs45/-) ',
        'Carrot Halwa(Rs10/-)',
      ],
    },
    Wednesday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg burji(Rs20/-)',
        'Chilli Paneer(Rs40/-) ',
        'Chicken curry 35/-)',
      ],
      Snacks: ['Onion Pakoda(50 gm)(Rs10/-)', ' Masala wada (2Pic)(Rs10/-)'],
      Dinner: [
        'Veg Dum Biryani(Rs60/-)',
        'Chicken biryani(Rs60/-)',
        'Ras Malai(Rs10/-)',
      ],
    },
    Thursday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg masala(Rs20/-)',
        ' Kashmiri Pulao(Rs55/-)',
        ' Pepper Chicken(Rs40/-)',
      ],
      Snacks: ['Corn (200 grams)(Rs15/-)', 'Dhai Wada (1pic)(Rs15/-)'],
      Dinner: [
        'Egg burji(Rs20/-)',
        'Paneer Butter Masala(Rs30/-) ',
        'Chicken Chettinad(Rs40/-)',
        'Fish fry(Rs45/-)',
        'Gulab Jamun(Rs10/-)',
      ],
    },
    Friday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg burji(Rs20/-)',
        'Kadai Paneer 30/-)',
        'Crispy Corn(Rs30/-)',
        'Butter Chicken(Rs40/-)',
      ],
      Snacks: [
        'Mirchi Bhaji(2 pieces)(Rs10/-)',
        ' Aloo bhaji (2 Pieces)(Rs10/-)',
      ],
      Dinner: [
        'Egg masala(Rs20/-)',
        'Palak paneer(Rs30/-)',
        'Babycorn Manchuria(Rs30/-)',
        'Hariyali Chicken(Rs40/-)',
      ],
    },
    Saturday: {
      Breakfast: ['Boiled Egg(Rs7/-)', 'cornflakes(Rs8/-)', 'Bananas(Rs4/-)'],
      Lunch: [
        'Egg burji(Rs20/-)',
        'Mushroom biryani(Rs50/-)',
        'Chicken Kohlapuri(Rs40/-)',
      ],
      Snacks: ['Punugulu (8pic)(Rs15/-)'],
      Dinner: [
        'Cheetinad  Paneer(Rs 30/-)',
        ' Chicken curry(Rs35/-)',
        'Double ka Meetha(Rs10/-)',
      ],
    },
  },
  'UDH Additional': {
    Sunday: {
      Breakfast: ['Boiled Egg(Rs7/-)', 'cornflakes(Rs8/-)', 'Bananas(Rs4/-)'],
      Lunch: [
        'Egg Masala(Rs20/-)',
        'Babycorn Manchuria(Rs30/-)',
        'Kadai Chicken(Rs40/-)',
      ],
      Snacks: ['Pav Bhaji(2 pieces)(Rs10/-)', 'Vada pav (Each)(Rs10/-)'],
      Dinner: ['Paneer pulao(Rs60/-)', 'Chicken biryani(Rs60/-)'],
    },
    Monday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg Burji(Rs20/-)',
        'Vegetable Biryani(Rs45/-)',
        'Fish curry(Rs45/-)',
      ],
      Snacks: ['Bread Pakoda(1 piece)(Rs15/-)', 'Aloo bonda (2 pic)(Rs15/-)'],
      Dinner: [
        'Egg masala(Rs20/-)',
        'Paneer Hariyali Masala(Rs40/-)',
        'Kadai Chicken(Rs40/-)',
        'Jalebi(Rs10/-)',
      ],
    },
    Tuesday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg Masala(Rs20/-)',
        'Palak paneer(Rs30/-) ',
        'Chicken65(Rs 45/-)',
      ],
      Snacks: ['Samosa(100 gm)(Rs10/-)', 'Bhel Puri(each),10/-)'],
      Dinner: [
        'Egg burji(Rs20/-)',
        'Crispy Corn(Rs30/-)',
        'Chicken Tikka Masal(Rs45/-) ',
        'Carrot Halwa(Rs10/-)',
      ],
    },
    Wednesday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg burji(Rs20/-)',
        'Chilli Paneer(Rs40/-) ',
        'Chicken curry 35/-)',
      ],
      Snacks: ['Onion Pakoda(50 gm)(Rs10/-)', ' Masala wada (2Pic)(Rs10/-)'],
      Dinner: [
        'Veg Dum Biryani(Rs60/-)',
        'Chicken biryani(Rs60/-)',
        'Ras Malai(Rs10/-)',
      ],
    },
    Thursday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg masala(Rs20/-)',
        ' Kashmiri Pulao(Rs55/-)',
        ' Pepper Chicken(Rs40/-)',
      ],
      Snacks: ['Corn (200 grams)(Rs15/-)', 'Dhai Wada (1pic)(Rs15/-)'],
      Dinner: [
        'Egg burji(Rs20/-)',
        'Paneer Butter Masala(Rs30/-) ',
        'Chicken Chettinad(Rs40/-)',
        'Fish fry(Rs45/-)',
        'Gulab Jamun(Rs10/-)',
      ],
    },
    Friday: {
      Breakfast: [
        'Omelet(Rs15/-)',
        'Boiled Egg(Rs7/-)',
        'cornflakes(Rs8/-)',
        'Bananas(Rs4/-)',
      ],
      Lunch: [
        'Egg burji(Rs20/-)',
        'Kadai Paneer 30/-)',
        'Crispy Corn(Rs30/-)',
        'Butter Chicken(Rs40/-)',
      ],
      Snacks: [
        'Mirchi Bhaji(2 pieces)(Rs10/-)',
        ' Aloo bhaji (2 Pieces)(Rs10/-)',
      ],
      Dinner: [
        'Egg masala(Rs20/-)',
        'Palak paneer(Rs30/-)',
        'Babycorn Manchuria(Rs30/-)',
        'Hariyali Chicken(Rs40/-)',
      ],
    },
    Saturday: {
      Breakfast: ['Boiled Egg(Rs7/-)', 'cornflakes(Rs8/-)', 'Bananas(Rs4/-)'],
      Lunch: [
        'Egg burji(Rs20/-)',
        'Mushroom biryani(Rs50/-)',
        'Chicken Kohlapuri(Rs40/-)',
      ],
      Snacks: ['Punugulu (8pic)(Rs15/-)'],
      Dinner: [
        'Cheetinad  Paneer(Rs 30/-)',
        ' Chicken curry(Rs35/-)',
        'Double ka Meetha(Rs10/-)',
      ],
    },
  },
};

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function LensIcon({ color }) {
  return (
    <svg width={25} height={25}>
      <path
        fill={color}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      />
    </svg>
  );
}

LensIcon.propTypes = {
  color: PropTypes.string,
};

LensIcon.defaultProps = {
  color: 'red',
};

const StepIcon = ({
  day,
  activeStep,
  activeColor,
  defaultColor,
  textColor,
}) => {
  let color = defaultColor;
  if (day === days[activeStep]) {
    color = activeColor;
  }
  return (
    <div style={{ position: 'relative' }}>
      <LensIcon color={color} />
      <div
        style={{
          color: textColor,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          textAlign: 'center',
          lineHeight: '24px',
        }}
      >
        {day[0]}
      </div>
    </div>
  );
};

StepIcon.propTypes = {
  day: PropTypes.string,
  activeStep: PropTypes.number,
  activeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  textColor: PropTypes.string,
};
StepIcon.defaultProps = {
  day: 'Sunday',
  activeStep: 0,
  activeColor: 'red',
  defaultColor: 'red',
  textColor: 'black',
};

function Mess() {
  const date = new Date();
  const [activeStep, setActiveStep] = useState(date.getDay());
  const theme = useTheme();
  const [hall, setHall] = useState('LDH');

  const getBreakfast = () => {
    const listItems = Menu[hall][days[activeStep]].Breakfast;
    return (
      <ul>
        {listItems.map((item) => <li>{item}</li>)}
      </ul>
    );
  };

  const getLunch = () => {
    const listItems = Menu[hall][days[activeStep]].Lunch;
    return (
      <ul>
        {listItems.map((item) => <li>{item}</li>)}
      </ul>
    );
  };

  const getSnacks = () => {
    const listItems = Menu[hall][days[activeStep]].Snacks;
    return (
      <ul>
        {listItems.map((item) => <li>{item}</li>)}
      </ul>
    );
  };

  const getDinner = () => {
    const listItems = Menu[hall][days[activeStep]].Dinner;
    return (
      <ul>
        {listItems.map((item) => <li>{item}</li>)}
      </ul>
    );
  };

  return (
    <div>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {days.map((day, index) => (
          <Step key={day}>
            <StepButton
              icon={(
                <StepIcon
                  day={day}
                  activeStep={activeStep}
                  activeColor={theme.palette.primary.main}
                  defaultColor={theme.palette.primary.contrastText}
                  textColor="black"
                />
              )}
              onClick={() => setActiveStep(index)}
            />
          </Step>
        ))}
      </Stepper>
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button onClick={() => setHall('LDH')}>LDH</Button>
        <Button onClick={() => setHall('UDH')}>UDH</Button>
      </ButtonGroup>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Breakfast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{getBreakfast()}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Lunch</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{getLunch()}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Snacks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{getSnacks()}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Dinner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{getDinner()}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Mess;
