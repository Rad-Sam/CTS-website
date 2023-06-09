let Directus = require('@directus/sdk');
const fs = require('fs');

let directus = new Directus.Directus('https://api.changer2u.com');
async function zacl() {
  Directus.s;
  let d = await fs.readFileSync('./re.json');
  const jsonDataa = JSON.parse(d);
  const jsonData = jsonDataa[0].data;

  for (let index = 0; index < jsonData.length; index++) {
    const element = jsonData[index];
    console.log(element);
    if (element.status != 'active') {
      continue;
    }
    if (!element.author) {
      continue;
    }
    if (!element.rating) {
      continue;
    }
    if (!element.review) {
      continue;
    }
    try {
      let d = new Date(element.added);
      await directus.items('reviews').createOne({
        name: element.author,
        rate: parseInt(element.rating),
        text: element.review,
        status: 'accepted',
        email: element.review_id,
        date_created: d.toISOString(),
      });
    } catch (er) {
      console.log(er);
    }
  }

  /* let directus = new Directus.Directus('http://localhost:8055');
  let d = await directus.items('reviews').createOne({});
  console.log(d); */
}
zacl();
