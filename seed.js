const { db, Project, Robot } = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });

    const robots = await Promise.all([
      Robot.create({
        name: 'Dolores Abernathy',
        imageUrl:
          'https://quotecatalog.imgix.net/assets/asset-BpymUWoXcLy2amD8tqYtOC4a/original.jpg',
        fuelType: 'Electric',
        fuelLevel: 99,
      }),
      Robot.create({
        name: 'Maeve Millay',
        imageUrl:
          'https://static.wikia.nocookie.net/westworld/images/7/78/Maeves1.jpeg',
        fuelType: 'Electric',
        fuelLevel: 75,
      }),
      Robot.create({
        name: 'Bernard Lowe',
        imageUrl:
          'https://static.wikia.nocookie.net/westworld/images/6/65/Bernard_infobox_new1.jpg',
        fuelType: 'Gas',
        fuelLevel: 68,
      }),
      Robot.create({
        name: 'Clementine Pennyfeather',
        imageUrl:
          'https://static.wikia.nocookie.net/westworld/images/5/55/Clementine_Passed_Pawn.jpg',
        fuelType: 'Electric',
        fuelLevel: 89,
      }),
      Robot.create({
        name: 'Teddy Flood',
        imageUrl:
          'https://static.wikia.nocookie.net/westworld/images/a/a9/Teddy_Flood_Phase_Space.jpg',
        fuelType: 'Diesel',
        fuelLevel: 77,
      }),
      Robot.create({
        name: 'Hector Escaton',
        imageUrl:
          'https://winteriscoming.net/files/2018/01/westworld-hector.jpeg',
        fuelType: 'Diesel',
        fuelLevel: 44,
      }),
      Robot.create({
        name: 'Hanaryo',
        imageUrl:
          'https://static.wikia.nocookie.net/westworld/images/7/76/Hanaryo_Akane_No_Mai.jpg',
        fuelType: 'Electric',
        fuelLevel: 100,
      }),
    ]);

    const projects = await Promise.all([
      Project.create({
        title: 'Find new travelers',
        deadline: new Date('2021, 01 ,01').toLocaleDateString(),
        description: 'Approach unfamiliar people who enter the game.',
        priority: 6,
      }),
      Project.create({
        title: 'Start new story',
        deadline: new Date('2021-01-11'),
        description: 'Interact with new travelers with your arc.',
        priority: 8,
      }),
      Project.create({
        title: 'Escalate the event',
        deadline: new Date('2021-01-12'),
        description:
          'When new traveler finishes your request, start new request.',
        priority: 7,
      }),
      Project.create({
        title: 'Greet neighbors',
        deadline: new Date('2021-01-01'),
        description: 'Interact with new robots.',
        priority: 3,
      }),
      Project.create({
        title: 'Start an adventure',
        deadline: new Date('2021-01-20'),
        description: 'After traveler finishes request, go on road trip.',
        priority: 9,
      })
    ]);

    const [dolores, maeve, bernard, clementine, teddy, hector, hanaryo] = robots;
    const [findTraveler, startStory, escalateEvent, greet, startAdventure] = projects;

    await dolores.addProject([findTraveler, greet, escalateEvent]);
    await maeve.addProject([greet, startStory]);
    await bernard.addProject([startAdventure, greet]);
    await clementine.addProject([startStory, escalateEvent]);
    await teddy.addProject([startAdventure, findTraveler]);
    await hector.addProject([escalateEvent, startStory]);
    await hanaryo.addProject([escalateEvent, startAdventure]);

  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
