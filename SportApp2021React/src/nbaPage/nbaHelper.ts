
import axios from 'axios';

const NBAurl:string="http://127.0.0.1:5000/nba";

async function getLatestResult()
{
    const api= await axios.get(NBAurl);
    return api.data;
    
}
function refresh()
{

}
const nbaHelper={getLatestResult,refresh};
export  default nbaHelper;