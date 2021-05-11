const axios = require('axios').default;

let artist = 'coldplay';
let song = 'yellow';

const searchApiOptions = {
    method: 'GET',
    url: 'https://theaudiodb.p.rapidapi.com/searchtrack.php',
    params: {s: artist, t: song},
    headers: {
      'x-rapidapi-key': '606527bb61mshb43d6e2df6cfd20p1ed2c5jsn485726eb6846',
      'x-rapidapi-host': 'theaudiodb.p.rapidapi.com'
    }
}

axios.request(searchApiOptions).then((res) => {
console.log(res);    
})