import React  from 'react'
import { useSearchParams } from 'react-router-dom'
import Login from './Login';
import styles from "./home.module.css"



export default function Entry() {
    const [params] = useSearchParams();
    let userAuthType=params.get("userAuthType")


    return (
        <> 
            <div className={styles.btns}>
                 <Login userAuthType={userAuthType}></Login>
            </div>           
            <div className={styles.homeScreen} >
                <div className={styles.logo}>
                Shop Easy
                </div>
            </div>

        </>
    )
}
