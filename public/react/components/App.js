import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import "../../style.css"

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [title, setTitle] = useState([]);
	const [author, setAuthor] = useState([]);
	const [content, setContent] = useState([]);
	const [tags,setTags] = useState([]);
	const [dateCreated, setDateCreated] = useState([]);

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	const handleSubmit = async () => {
		const response = await fetch(`${apiURL}/items`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			title: title,
			author: author,
			content: content,
			tags: tags,
			dateCreated: dateCreated,
		  }),
		});
			await response.json();
	  };


	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<main>	
      <h1>WikiVerse Project</h1>
			<h2>An interesting 📚</h2>
			<PagesList pages={pages} setPages={setPages} />
			
		
		
		
		</main>
	)
}