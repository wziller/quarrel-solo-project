'use strict';
const fakeQuestions = [
  {question_name:"Which makes a better pet? Cats or dogs?",
  user1_id:22,
  user2_id:30,
  question:"Cats are independent and cuddly, dogs are man's best friend, which is a better pet?",
  user1_response:" Cats are better because they are smart, have more personaility, and are very independent",
  user2_response:"Dogs are better because the adore people, are easy to train and show unconditional love. Also, no litter boxes.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:5,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Would you rather be really big or really small?",
  user1_id:12,
  user2_id:43,
  question:"People come in all different sizes. Being really big or really small both have their advantages and disadvantages, but which is really better?",
  user1_response:"Being big is better. You can reach things on tall shelves and are stronger ",
  user2_response:null,
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:16,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Summer is better than winter. Agree or disagree?",
  user1_id:4,
  user2_id:33,
  question:"One is cold, one is hot but which is better, summer or winter?",
  user1_response:"Summer is better. You can swim, play outside and go into the air conditioning when it gets too hot. Plus winter makes you depressed.",
  user2_response:"Winter is better. You can always put on more clothes if it is too cold, with heat there is nothing you can do.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:14,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Playing video games is bad for health. Agree or disagree?",
  user1_id:18,
  user2_id:20,
  question:"Video games are the most popular form of entertainment, but are they bad for your health?",
  user1_response:"Video games rot you brain and your mind. They make real dumb.",
  user2_response:"Video games eoncourage socialization, problem-solving and creativity.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:10,
  deadline: new Date(),
  complete: true,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Smart phones??? make us stupid. Agree or disagree?",
  user1_id:11,
  user2_id:47,
  question:"They are in everyones pockets and people look at them all day, but are they making us stupid?",
  user1_response:"The government is listening to us and trying to make us stupider!!",
  user2_response:"No they provide information to the masses.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:12,
  deadline: new Date(),
  complete: true,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Are Clowns Scary?",
  user1_id:13,
  user2_id:29,
  question:"",
  user1_response:"",
  user2_response:"",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:16,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Are smartphones making us stupid?",
  user1_id:19,
  user2_id:12,
  question:"",
  user1_response:"No they help kids study and wikipedia lets everyone know about things.",
  user2_response:"Yes have you ever seen a Tik Tok. Garbage!",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:1,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Is a burrito a sandwich?",
  user1_id:14,
  user2_id:15,
  question:"A tex-mex favorite, but is it a sandwich?",
  user1_response:"Nope, they don't have bread or cold cuts.",
  user2_response:null,
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:1,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Can dogs look up?",
  user1_id:8,
  user2_id:12,
  question:"While standing, does a dog's neck allow them to look up?",
  user1_response:"Sure of course they can look up. They have necks!",
  user2_response:"No, the dog has to either sit or jump to look up.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:5,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Is cheerleading a sport?",
  user1_id:10,
  user2_id:23,
  question:"Alot of people start this sport in high school, but is it actually a sport??",
  user1_response:"No ,it is not a sport. It is only for celebrating other real athletes.",
  user2_response:"Of course it is a sport. It takes atheltic prowess and has large competitions.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:4,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Is thirteen an unlucky number?",
  user1_id:10,
  user2_id:1,
  question:"Between Friday the 13th and buildings missing 13th floors, a lot of people think 13 is unlucky, what about you?",
  user1_response:"Yes it is, I would never schedule any important day on the 13th day of the month.",
  user2_response:"",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:8,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Can we even know if God exists?",
  user1_id:1,
  user2_id:23,
  question:"Can science ever truly prove if God exists and if so how?",
  user1_response:"No it is ourely based on faith",
  user2_response:"",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:6,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Does the Universe have a beginning and an end?",
  user1_id:10,
  user2_id:1,
  question:"How did the universe start? Will it ever end? Do you agree with the big bang theory?",
  user1_response:"No there is no why that something can come from nothing",
  user2_response:"",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:7,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Should it be illegal for a man to wear skinny jeans?",
  user1_id:1,
  user2_id:6,
  question:"Skinny jeans are falling out of fashion, should men be allowed to wear them?",
  user1_response:"No, it is freedom of speech. Even if it is ugly.",
  user2_response:"Yes. Gross.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:13,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},

{question_name:"Is cereal a type of soup?",
  user1_id:1,
  user2_id:6,
  question:"Kids eat it every morning, but is cereal actually soup?",
  user1_response:"No, cereal is not intended to be savory and soup is.",
  user2_response:"Yes, it is basically soup",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:15,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Playstation or Xbox?",
  user1_id:6,
  user2_id:1,
  question:"WHich is better the Sony Playstation or the Microsoft XBOX?",
  user1_response:"XBOX is best",
  user2_response:"",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:15,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Is e-gaming a real sport?",
  user1_id:6,
  user2_id:1,
  question:"It's not in the olympics, but maybe it should be? Is e-gaming a real sport?",
  user1_response:"Yes it requires physical and mental ability?",
  user2_response:"No it is for nerds.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:10,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{question_name:"Is Harry Potter better than The Lord of the Rings?",
  user1_id:6,
  user2_id:1,
  question:"Regarding only the books, which is better Harry Potter or The Lord of the Rings?",
  user1_response:"LOTR FTW Tolkien is a God!",
  user2_response:"Harry Potter id the best it is so  much more relatable.",
  user1_upvotes:0,
  user2_upvotes:0,
  category_id:9,
  deadline: new Date(),
  complete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},

]
module.exports = {
  fakeQuestions,
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', fakeQuestions, {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
}
};
