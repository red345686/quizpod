import React from 'react';


export default function Home() {
    const [place, setPlace] = React.useState(''); // state to store the place
    console.log (place);
    return (
    <form action="input">
        <label for="place">Enter a place:</label>
        <input type="text" id="place" name="place" value={place} onChange={(e) => setPlace(e.target.value)} />
        
        <input type="submit" value="Submit" />                                                                                              
    </form> 
    );
}                      


