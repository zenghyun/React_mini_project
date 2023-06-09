# Food Order App

<br>

## Firebase 이용하기 

```javascript
 useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('내가이용할 firebase 주소/폴더.json');
      const responseData = await response.json();

      const loadedMeals = [];

      for(const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals();
  },[]);
```