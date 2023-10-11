import { Link, NavLink } from "react-router-dom"
import Logo from "./Logo"
import styles from './PageNav.module.css'
export default function PageNav(){
    return(
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li>
                    {/* navlink will add class="active" when it is selected */}
                    <NavLink to='/product'>Product</NavLink>
                </li>
                <li>
                    <Link to='/pricing'>Pricing</Link>
                </li>
                <li>
                    <Link to='/login' className={styles.ctaLink}>Login</Link>
                </li>
            </ul>
        </nav>
    )
}