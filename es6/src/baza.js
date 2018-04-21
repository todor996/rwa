import {URL} from "./konstante";

export class Baza{
static get()
{
    return fetch(URL)
    .then(resp=>resp.json())
}

static post(hs)
{
    
}
}