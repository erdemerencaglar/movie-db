import '../design/NotFound.css';
import Home from './Home';

export default function NotFound() {

    return(
        <div className='notFound-wrapper'>
            <span class="material-symbols-outlined">
                warning
            </span>
            <h1>Error! 404 Page Not Found</h1>
            <div>
                <a href='/'>
                    <input type="submit" value="Home Page" className='home-button'/>
                </a>
            </div>
        </div>
    )
}