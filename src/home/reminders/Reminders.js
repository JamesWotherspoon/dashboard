import React, { useState, useEffect, useMemo } from 'react'
import home from '../home.module.scss';
import styles from './Reminders.module.scss';
import { IoClose } from 'react-icons/io5';
import ReminderAddEdit from './RemindersAddEdit';
import ReminderDisplay from './ReminderDisplay';
import { CSSTransition } from 'react-transition-group';


const useOrderReminders = (reminderList) => {

    if(!reminderList) return [];

    const reminders = [...reminderList];

    reminders.sort((a, b) => {
        const dateA = Date.parse(a.date) + parseInt(a.startTime);
        const dateB = Date.parse(b.date) + parseInt(b.startTime);

        if ( dateA < dateB ){
            return -1;
        }
        if ( dateA > dateB ){
            return 1;
        }
        return 0
    })

    localStorage.setItem('reminders', JSON.stringify( reminders ));
    
    return reminders
}

const Reminders = () => {
    const [reminderList, setReminderList] = useState()
    const [toggleForm, setToggleForm] = useState(false);
    const [keyOfEdit, setKeyOfEdit] = useState();
    const orderedReminders = useOrderReminders(reminderList);

    // if tasks State is empty, retrieve tasks from localStorage
    useEffect(() => {
        const localStorageReminders = JSON.parse( localStorage.getItem('reminders') );
        if(localStorageReminders) setReminderList(localStorageReminders);
    }, [])

    // handle adding tasks to tasks state 
    const addReminder = (reminderToAdd) => {
        callToggleForm(false);
        if(!reminderList) setReminderList([reminderToAdd])
        setReminderList(prev => [...prev, reminderToAdd])
    }

    const editReminder = (key) => {
        setKeyOfEdit(key);
        callToggleForm();
    }

    // deleting selected task from tasks state and localStorage
    const deleteReminder = (key) => {
        
        callToggleForm(false);
        setReminderList(prev => {
            let listToUpdate = [...prev];
            listToUpdate = listToUpdate.filter(reminder => reminder.key !== key)
            return listToUpdate
        })
    }

    const callToggleForm = (openForm) => {
        // reset keyOfEdit when form closes
        if(toggleForm) setKeyOfEdit(null)

        if(typeof openForm === 'boolean'){
            setToggleForm(openForm);
            return
        }
        setToggleForm(prev => !prev)
    }

    return (
        <section className={`${home.reminders} ${styles.reminders}`}>
            <div className={styles.component_title_container}>
                <h3 className={styles.component_title} >Reminders</h3>  
            </div>
                <CSSTransition 
                    in={!toggleForm} 
                    timeout={600} 
                    classNames={{
                        enter: styles.reminderDisplayEnter,
                        enterActive: styles.reminderDisplayEnterActive,
                        enterDone: styles.reminderDisplayEnterDone,
                        exitActive: styles.reminderDisplayExitActive,
                        exitDone: styles.reminderDisplayExitDone
                    }}
                    mountOnEnter
                    unmountOnExit
                >    
                    <ReminderDisplay 
                        remindersList={orderedReminders} 
                        editReminder={editReminder} 
                        deleteReminder={deleteReminder}
                        callToggleForm={callToggleForm}
                    /> 
                </CSSTransition>
                
                <CSSTransition 
                    in={toggleForm} 
                    timeout={500} 
                    classNames={{
                        enter: styles.reminderFormEnter,
                        enterActive: styles.reminderFormEnterActive,
                        enterDone: styles.reminderFormEnterDone,
                        exit: styles.reminderFormExit,
                        exitActive: styles.reminderFormExitActive,
                        exitDone: styles.reminderFormExitDone
                    }}
                    mountOnEnter
                    unmountOnExit
                >                       
                    <ReminderAddEdit 
                        remindersList={orderedReminders} 
                        keyOfEdit={keyOfEdit} 
                        deleteReminder={deleteReminder} 
                        addReminder={addReminder}
                        callToggleForm={callToggleForm}
                    />
                </CSSTransition>
        </section>
    )
}

export default Reminders;