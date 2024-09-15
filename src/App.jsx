import { useState } from "react";
import cities from "./cities"





// تابع محاسبه فاصله املایی  
function levenshtein(a, b) {  
    const matrix = [];  
    for (let i = 0; i <= b.length; i++) {  
        matrix[i] = [i];  
    }  

    for (let j = 0; j <= a.length; j++) {  
        matrix[0][j] = j;  
    }  

    for (let i = 1; i <= b.length; i++) {  
        for (let j = 1; j <= a.length; j++) {  
            if (b.charAt(i - 1) === a.charAt(j - 1)) {  
                matrix[i][j] = matrix[i - 1][j - 1];  
            } else {  
                matrix[i][j] = Math.min(  
                    matrix[i - 1][j - 1] + 1,  
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)  
                );  
            }  
        }  
    }  

    return matrix[b.length][a.length];  
}  


function App() {  
    const [input, setInput] = useState('');  
    const [suggestion, setSuggestion] = useState('');  

    const handleChange = (e) => {  
        const userInput = e.target.value;  
        setInput(userInput);  

        if (userInput) {  
            const distances = cities.map(city => ({  
                city: city,  
                distance: levenshtein(userInput, city)  
            }));  

            const closestCity = distances.sort((a, b) => a.distance - b.distance)[0]?.city || '';  
            if (closestCity !== userInput) {  
                setSuggestion(closestCity);  
            } else {  
                setSuggestion('');  
            }  
        } else {  
            setSuggestion('');  
        }  
    };  

    return (  
        <div>  
            <h1>ehsan</h1>  
            <h1>جستجوی اسم شهر</h1>  
            <div style={{ position: 'relative', display: 'inline-block' }}>  
                <input  
                    type="text"  
                    value={input}  
                    onChange={handleChange}  
                    style={{ width: '300px', position: 'relative' }}  
                />  
                {suggestion && input && (  
                    <span   
                        style={{  
                            position: 'absolute',  
                            left: `${input.length * 10}px`, // Adjust according to input character width  
                            top: '50%',  
                            transform: 'translateY(-50%)',  
                            color: 'gray', 
                            padding:"2px" ,
                            pointerEvents: 'none',  
                        }}  
                    >  
                        {suggestion.slice(input.length)}  
                    </span>  
                )}  
            </div>  
        </div>  
    );  
}  

export default App;