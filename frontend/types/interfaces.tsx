export interface User {
  userid: number;
  username: string;
  profile_url: string | null;
  email: string;
  password: string;
  roleid: number;
  // token: string;
}

export interface Post {
  postid: number;
  post_id: number;
  title: string;
  userid: number;
  description: string;
  images: string[];
  locationid: number;
  updated_time: Date;
  created_time: Date;
  place_name: string;
  cat_id: number;
}
export interface Category {
  cat_id: number;
  cat_name: string;
}
export interface PostByCat {
  postid: number;
  post_id: number;
  title: string;
  userid: number;
  description: string;
  images: string[];

  locationid: number;
  cat_id: number;
}
export interface Conversation {
  convo_id: number;
  members: number[];
  created_time: Date;
}

export interface Message {
  message_id: number | undefined;
  convo_id: number | undefined;
  sender: number;
  text: string;
  created_at: Date;
  receiver: number 
}

export interface sendMsg {
  convo_id: number;
  sender: number;
  text: string;
}

//ren

export interface Login {
  username: string;
  password: string;
  newpassword: string;
}

export interface Place {
  place_image: string;
  placeid: number;
  place_name: string;
  cat_name: string;
  description: string;
  rating: number;
}
