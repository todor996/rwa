export interface Exercise{
    exerciseId:string;
    name:string;
    duration:number;
    calories:number;
    likes:number;
    date?:Date;
    loading:boolean;
    id:string;
    state?:'completed' | 'canceled' | null;
}