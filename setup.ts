import Database from 'better-sqlite3';

const db = new Database('./data.db', {
  verbose: console.log
});
type Museum = {
  id: number;
  name: string;
  city: string;
};

type Work = {
  id: number;
  name: string;
  picture: string;
  museumId: number;
};
const museums: Omit<Museum, 'id'>[] = [
  { name: 'British Museum', city: 'London' },
  { name: 'Smithsonian Institution', city: 'Washington' },
  { name: 'Louvre Museum', city: 'Paris' },
  { name: 'State Hermitage Museum', city: 'Saint Petersburg' }
];

const works: Omit<Work, 'id'>[] = [
  {
    name: 'Rosetta Stone',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/560px-Rosetta_Stone.JPG',
    museumId: 1
  },
  {
    name: 'Albion Rose',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/William_Blake_-_Albion_Rose_-_from_A_Large_Book_of_Designs_1793-6.jpg/440px-William_Blake_-_Albion_Rose_-_from_A_Large_Book_of_Designs_1793-6.jpg',
    museumId: 1
  },
  {
    name: 'Aurora Borealis',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Frederic_Edwin_Church_-_Aurora_Borealis_-_Google_Art_Project.jpg/1920px-Frederic_Edwin_Church_-_Aurora_Borealis_-_Google_Art_Project.jpg',
    museumId: 2
  },
  {
    name: 'Ajax',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/John_Steuart_Curry_-_Ajax_-_Smithsonian.jpg/1920px-John_Steuart_Curry_-_Ajax_-_Smithsonian.jpg',
    museumId: 2
  },
  {
    name: 'Mona Lisa',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/540px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    museumId: 3
  },
  {
    name: 'Liberty Leading the People',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/540px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
    museumId: 3
  },
  {
    name: 'Peacock Clock',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Die_vergoldete_Pfauenuhr_von_James_Cox.jpg/440px-Die_vergoldete_Pfauenuhr_von_James_Cox.jpg',
    museumId: 4
  },
  {
    name: 'Dance',
    picture:
      'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Matissedance.jpg/600px-Matissedance.jpg',
    museumId: 4
  }
];

const dropMuseums = db.prepare(`DROP TABLE IF EXISTS museums;`);
const dropWorks = db.prepare(`DROP TABLE IF EXISTS works;`);
dropMuseums.run();
dropWorks.run();

const createMuseumsTable = db.prepare(`
CREATE TABLE museums (
  id     INTEGER,
  name   TEXT NOT NULL,
  city  TEXT NOT NULL,
  PRIMARY KEY(id)
);
`);

const createWorksTable = db.prepare(`
CREATE TABLE works (
  id    	INTEGER,
  name  	TEXT NOT NULL,
  picture 	TEXT NOT NULL,
  museumId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(museumId) REFERENCES museums(id)
);`);

createMuseumsTable.run();
createWorksTable.run();

const createMuseum = db.prepare(`
INSERT INTO museums (name, city) VALUES (?, ?);
`);

const createWork = db.prepare(`
INSERT INTO works (name, picture, museumId) VALUES (?, ?, ?);
`);

for (const museum of museums) {
  createMuseum.run(museum.name, museum.city);
}

for (const work of works) {
  createWork.run(work.name, work.picture, work.museumId);
}
