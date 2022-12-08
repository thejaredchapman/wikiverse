import React, {useState} from 'react';
import apiURL from '../api';
// Functionality of page and how click's respond. 
export const Page = ({page, setPages}) => {
  const [isShown, setIsShown] = useState(false);
  const [onePost, setOnePost] = useState([]);


	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

  const handleClick = async (target) => {

	const res = await fetch(`${apiURL}/wiki/${target}`);
  	const data = await res.json();

	setOnePost([data]);
	setIsShown(!isShown);

  }


   const handleDelete = async (target) => {
		const response = await fetch(`${apiURL}/wiki/${target}`, {
  			method: "DELETE"
		});
		const data = await response.json();
   		
		fetchPages();
   }
//Shows data from Page List mapped out

  return (<> 
    <h3 onClick = {() => handleClick(page.slug)}>{page.title}</h3>
	{isShown && (
	<>
		<p><b>Author:</b> {onePost[0].author.name}</p>
		<p><b>Published:</b> {onePost[0].createdAt}</p>
		<p>{onePost[0].content}</p>
		<p><b>Tag:</b></p>
		{onePost[0].tags.map((tag) => <p>{tag.name}</p>)}
		<button onClick={() =>handleDelete(page.slug)}>DELETE</button>
		<button onClick = {() => handleClick(page.slug)}>Back to Wiki List</button>
	</>	
	)}

  </>)
} 
