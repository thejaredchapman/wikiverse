import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import "../../style.css"


// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { Page } from "./Page";

export const App = () => {

	const [pages, setPages] = useState([]);
	const [isAddingItem, setIsAddingItem] = useState(false);
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [content, setContent] = useState("");
	const [tags,setTags] = useState("");
	const [dateCreated, setDateCreated] = useState("");

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oopsy Daisy, you messed up!", err)
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
		<div className="home">
			<div className="just my face">
				<div className="container">
					<img
						src="https://s2.r29static.com/bin/entry/fe8/0,46,460,460/1200x1200,80/1256096/image.jpg"
						href="https://www.wikipedia.org/"
						alt = "Looking lost in the encyclopedia"></img>	
     					<h2 className="display-2">Wikiverse Project</h2>
						<p className="lead">
						Welcome to the Multiverse WikiVerse Project
						</p>
				</div>
			</div>
		</div>
		<div className="home">
			<h1>WikiVerse Project</h1>
			<h2>An interesting 📚</h2>
			<PagesList pages={pages} setPages={setPages} />
			{isAddingItem ? (
          <div>
            <form onSubmit={handleSubmit}>
              <h4>Add an Item</h4>
              <p><input
                type="text"
                placeholder="Item Title"
                aria-label="item title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              /></p>
			  <p><input
                type="name"
                placeholder="name"
                aria-label="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              /></p>
              <p><input
                type="text"
                placeholder="Author"
                aria-label="Author"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              /></p>
              <p><input
                type="text"
                placeholder="Content"
                aria-label="Content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              /></p>
              <p><input
                type="text"
                placeholder="tags"
                aria-label="tags"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              /></p>
              <p><input
                type="text"
                placeholder="Date Created"
                aria-label="Date Created"
                onChange={(e) => setdateCreated(e.target.value)}
                value={dateCreated}
              /></p>
             	 <button type="submit">Submit Page</button>
				 <button onClick={() => { goback(); }} > Back to Wiki List </button>
			  </form>
			</div>
			) : (
				<PagesList pages = {pages} setPages = {setPages}/>
			)}

			<button className="button1" onClick={() => setIsAddingItem(!isAddingItem)}>
				{" "}
				Create Article </button>

			</div>
		</main>
	);
};
