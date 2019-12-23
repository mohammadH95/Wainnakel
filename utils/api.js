const api = "https://wainnakel.com/api/v1/GenerateFS.php?uid="

export const getSeggestion = (lat, lon) => 
     fetch(`${api}${lat},${lon}&get_param=value`)
      .then(res => res.json())
     
        
