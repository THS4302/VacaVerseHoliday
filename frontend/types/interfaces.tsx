export interface User {
  userid: number;
  username: string;
  profile_url: string | null;
}

export interface Post {
  postid:number;
  post_id: number;
  title: string;
  userid: number;
  description: string;
  images: string[];
  locationid:number;
  updated_time:Date;
  created_time:Date;
  place_name:string;
  cat_id:number;
}
export interface Category {
  cat_id: number;
  cat_name: string;

}
export interface PostByCat {
  postid:number;
  post_id: number;
  title: string;
  userid: number;
  description: string;
  images: string[];
  locationid:number;
  cat_id:number;
}

//ren

export interface Login {
  username: string;
  password: string;
  newpassword: string;

}