"use client"
import { useState } from "react";
export default function MainPage() {
  const[title,setTitle]=useState('');
  const[authorName,setauthorName]=useState('');
  const[blogDate,setdate]=useState('');
  const[content,setContent]=useState('');
  const[Categories,setCategories]=useState('');
  return (
    <div className="flex">
      <form className="">
        Title:<input type="text" value={title} id="title" />
        Author name:<input type="text" value={authorName} id="auhtor" />
        Date:<input type="Date" value={blogDate} id="date" />
        Content:<input type="text" value={content} id="content" />
        Categories:<select id="Blog">
          <option value="romantic">Romantic</option>
          <option value="thriller">Thriller</option>
          <option value="comedy">Comedy</option>
          <option value="inspiring">Inspiring</option>
        </select>
      </form>
    </div>
  )
}