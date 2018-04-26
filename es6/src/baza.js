import {URL} from "./konstante";

export class Baza{
static get()
{
    return fetch(URL)
    .then(resp=>resp.json())
}

static addScore(User){
    return fetch( URL, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(User)
    })
    .then(res=>res.json())
}  
}