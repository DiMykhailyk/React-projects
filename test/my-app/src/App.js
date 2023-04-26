import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './modules/SignIn';
import SignUp from './modules/SignUp';

function App() {

    const films = [
        {
            name: 'Titanic',
            rating: 9
        },
        {
            name: 'Die hard 5',
            rating: 5
        },
        {
            name: 'Matrix',
            rating: 8
        },
        {
            name: 'Some bad film',
            rating: 4
        }
    ];

    function showGoodFilms(arr) {
         arr.filter(item => {
            for(let array in item) {
                if(item.rating > 5) {
                    console.log(item.name)
                    return item.name
                }
            }
        })
    }
    showGoodFilms(films);

    // function showListOfFilms(arr) {

    // }
    //
    // function setFilmsIds(arr) {
    //
    // }
    //
    // const tranformedArray = setFilmsIds(films);
    //
    // function checkFilms(arr) {
    //
    // }

  return (
    <div className="App">
      <div className="log__content">
    <BrowserRouter>
      <Switch>
       <Route exact path="/" component = {SignUp}>
       </Route>
       <Route path="/SignIn" component = {SignIn}>
       </Route>
    </Switch>
    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
