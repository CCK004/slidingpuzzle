function toggleTheme() { 
    // Obtains an array of all <link> 
    // elements. 
    // Select your element using indexing. 
    var theme = document.getElementsByTagName('link')[0]; 

    // Change the value of href attribute  
    // to change the css sheet. 
    if (theme.getAttribute('href') == 'light.css') { 
        theme.setAttribute('href', 'dark.css'); 
    } else { 
        theme.setAttribute('href', 'light.css'); 
    } 
} 