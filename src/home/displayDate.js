import React, { useState } from 'react';
import styles from './home.module.scss';

const DisplayDate = () => {
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    let [ day, month, date, year ] = dateString.split(' ');
    date = Number(date);

    return (
        <section className={`${styles.display_date} ${styles.component}`} >
            <div className={styles.top}>
                <div className={styles.ring_holes} >
                    <div className={styles.ring_binders} >

                    </div>
                </div>
                <div className={styles.ring_holes} >
                    <div className={styles.ring_binders} >

                    </div>
                </div>
            </div>
            <h2>{day}</h2>
            <h3>{date} {month}</h3>
        </section>
    );
}

export default DisplayDate;